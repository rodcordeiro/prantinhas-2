import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { seedPlants } from '../data/mockPlants';
import { analyzePlantPhotoMock } from '../services/ai/analyzePlantPhotoMock';
import {
  cancelHydrationReminder,
  configureNotifications,
  scheduleHydrationReminder,
} from '../services/notifications/notificationService';
import {
  persistCapturedPhoto,
  readStoredPlants,
  writeStoredPlants,
} from '../services/storage/plantStorage';
import {
  Plant,
  PlantAnalysis,
  PlantDraft,
  PlantPhoto,
  PlantPhotoCategory,
} from '../types';
import { colors } from '../theme/colors';
import { calculateNextHydrationAt } from '../utils/date';

type PlantUpdateInput = {
  name: string;
  scientificName: string;
  waterAmount: string;
  waterFrequency: string;
  wateringIntervalDays: number;
  sunlight: string;
};

type PlantsContextValue = {
  plants: Plant[];
  draft: PlantDraft;
  isAnalyzingDraft: boolean;
  resetDraft: () => void;
  updateDraft: (patch: Partial<PlantDraft>) => void;
  captureDraftPhoto: (
    category: PlantPhotoCategory,
    photoUri: string,
  ) => Promise<void>;
  createPlantFromDraft: () => Promise<Plant>;
  updatePlant: (plantId: string, updates: PlantUpdateInput) => Promise<void>;
  hydratePlant: (plantId: string) => Promise<void>;
  getPlantById: (plantId: string) => Plant | undefined;
};

const PlantsContext = createContext<PlantsContextValue | null>(null);

function createEmptyDraft(): PlantDraft {
  return {
    name: '',
    organ: '',
    photos: [],
    analysisStatus: 'idle',
  };
}

export function PlantsProvider({ children }: PropsWithChildren) {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [draft, setDraft] = useState<PlantDraft>(createEmptyDraft());
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [isAnalyzingDraft, setIsAnalyzingDraft] = useState(false);

  useEffect(() => {
    async function bootstrap(): Promise<void> {
      await configureNotifications();

      const storedPlants = await readStoredPlants();
      if (storedPlants?.length) {
        setPlants(storedPlants);
      } else {
        setPlants(seedPlants);
        await writeStoredPlants(seedPlants);
      }

      setIsBootstrapping(false);
    }

    void bootstrap();
  }, []);

  const persistPlants = useCallback(async (nextPlants: Plant[]) => {
    setPlants(nextPlants);
    await writeStoredPlants(nextPlants);
  }, []);

  const resetDraft = useCallback(() => {
    setDraft(createEmptyDraft());
  }, []);

  const updateDraft = useCallback((patch: Partial<PlantDraft>) => {
    setDraft((current) => ({ ...current, ...patch }));
  }, []);

  const captureDraftPhoto = useCallback(
    async (category: PlantPhotoCategory, photoUri: string) => {
      setIsAnalyzingDraft(true);

      const persistedPhoto = await persistCapturedPhoto(photoUri, category);
      const nextPhotos = draft.photos.filter((photo) => photo.category !== category);
      const photos = [...nextPhotos, persistedPhoto];

      setDraft((current) => ({
        ...current,
        photos,
        analysisStatus: 'pending',
      }));

      try {
        const analysis = await analyzePlantPhotoMock(category);
        setDraft((current) => ({
          ...current,
          photos,
          analysis,
          analysisStatus: 'completed',
        }));
      } catch {
        setDraft((current) => ({
          ...current,
          photos,
          analysisStatus: 'failed',
        }));
      } finally {
        setIsAnalyzingDraft(false);
      }
    },
    [draft.photos],
  );

  const createPlantFromDraft = useCallback(async () => {
    const now = new Date();
    now.setHours(9, 0, 0, 0);

    const suggestedCare = draft.analysis?.suggestedCare ?? {
      waterAmount: '250ml',
      waterFrequency: '14d',
      wateringIntervalDays: 14,
      sunlight: 'none',
    };

    const createdPlant: Plant = {
      id: `${Date.now()}`,
      name: draft.name.trim() || 'Nova planta',
      organ: draft.organ.trim() || 'leaf',
      scientificName:
        draft.analysis?.suggestedScientificName ?? 'no_scientific_name',
      waterAmount: suggestedCare.waterAmount,
      waterFrequency: suggestedCare.waterFrequency,
      wateringIntervalDays: suggestedCare.wateringIntervalDays,
      sunlight: suggestedCare.sunlight,
      lastHydrationAt: now.toISOString(),
      nextHydrationAt: calculateNextHydrationAt(
        now.toISOString(),
        suggestedCare.wateringIntervalDays,
        9,
      ),
      reminderHour: 9,
      remindersEnabled: true,
      photos: draft.photos,
      analysisStatus: draft.analysisStatus,
      analysisSummary: draft.analysis?.summary,
      suggestedScientificName: draft.analysis?.suggestedScientificName,
      suggestedCare,
    };

    const scheduledNotificationId = await scheduleHydrationReminder(createdPlant);
    const plantWithReminder = { ...createdPlant, scheduledNotificationId };
    const nextPlants = [plantWithReminder, ...plants];

    await persistPlants(nextPlants);
    resetDraft();

    return plantWithReminder;
  }, [draft, persistPlants, plants, resetDraft]);

  const updatePlant = useCallback(
    async (plantId: string, updates: PlantUpdateInput) => {
      const existingPlant = plants.find((plant) => plant.id === plantId);
      if (!existingPlant) {
        return;
      }

      const updatedPlant: Plant = {
        ...existingPlant,
        ...updates,
        nextHydrationAt: calculateNextHydrationAt(
          existingPlant.lastHydrationAt,
          updates.wateringIntervalDays,
          existingPlant.reminderHour,
        ),
      };

      await cancelHydrationReminder(existingPlant.scheduledNotificationId);
      updatedPlant.scheduledNotificationId = await scheduleHydrationReminder(updatedPlant);

      const nextPlants = plants.map((plant) =>
        plant.id === plantId ? updatedPlant : plant,
      );

      await persistPlants(nextPlants);
    },
    [persistPlants, plants],
  );

  const hydratePlant = useCallback(
    async (plantId: string) => {
      const existingPlant = plants.find((plant) => plant.id === plantId);
      if (!existingPlant) {
        return;
      }

      const hydratedAt = new Date();
      hydratedAt.setHours(existingPlant.reminderHour, 0, 0, 0);

      const updatedPlant: Plant = {
        ...existingPlant,
        lastHydrationAt: hydratedAt.toISOString(),
        nextHydrationAt: calculateNextHydrationAt(
          hydratedAt.toISOString(),
          existingPlant.wateringIntervalDays,
          existingPlant.reminderHour,
        ),
      };

      await cancelHydrationReminder(existingPlant.scheduledNotificationId);
      updatedPlant.scheduledNotificationId = await scheduleHydrationReminder(updatedPlant);

      const nextPlants = plants.map((plant) =>
        plant.id === plantId ? updatedPlant : plant,
      );

      await persistPlants(nextPlants);
    },
    [persistPlants, plants],
  );

  const getPlantById = useCallback(
    (plantId: string) => plants.find((plant) => plant.id === plantId),
    [plants],
  );

  const value = useMemo<PlantsContextValue>(
    () => ({
      plants,
      draft,
      isAnalyzingDraft,
      resetDraft,
      updateDraft,
      captureDraftPhoto,
      createPlantFromDraft,
      updatePlant,
      hydratePlant,
      getPlantById,
    }),
    [
      plants,
      draft,
      isAnalyzingDraft,
      resetDraft,
      updateDraft,
      captureDraftPhoto,
      createPlantFromDraft,
      updatePlant,
      hydratePlant,
      getPlantById,
    ],
  );

  if (isBootstrapping) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return <PlantsContext.Provider value={value}>{children}</PlantsContext.Provider>;
}

export function usePlants(): PlantsContextValue {
  const context = useContext(PlantsContext);

  if (!context) {
    throw new Error('usePlants deve ser usado dentro de PlantsProvider');
  }

  return context;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundPrimary,
  },
});
