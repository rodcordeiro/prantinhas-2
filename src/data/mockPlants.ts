import { Plant } from '../types';
import { addDays } from '../utils/date';

function createSeedPlant(
  id: string,
  name: string,
  scientificName: string,
  hydratedDaysAgo: number,
): Plant {
  const reminderHour = 9;
  const wateringIntervalDays = 14;
  const lastHydrationDate = new Date();
  lastHydrationDate.setDate(lastHydrationDate.getDate() - hydratedDaysAgo);
  lastHydrationDate.setHours(reminderHour, 0, 0, 0);

  return {
    id,
    name,
    organ: 'leaf',
    scientificName,
    waterAmount: '250ml',
    waterFrequency: '2w',
    wateringIntervalDays,
    sunlight: 'none',
    lastHydrationAt: lastHydrationDate.toISOString(),
    nextHydrationAt: addDays(lastHydrationDate, wateringIntervalDays, reminderHour).toISOString(),
    reminderHour,
    remindersEnabled: true,
    photos: [],
    analysisStatus: 'completed',
    analysisSummary: 'Análise inicial fictícia disponível para demonstração.',
    suggestedScientificName: scientificName,
    suggestedCare: {
      waterAmount: '250ml',
      waterFrequency: '2w',
      wateringIntervalDays,
      sunlight: 'none',
    },
  };
}

export const seedPlants: Plant[] = [
  createSeedPlant('1', 'Hortelã', 'Mentha spicata', 4),
  createSeedPlant('2', 'Jimmy', 'no_scientific_name', 7),
  createSeedPlant('3', 'Boldao', 'no_scientific_name', 9),
  createSeedPlant('4', 'Arrudinha', 'no_scientific_name', 12),
];
