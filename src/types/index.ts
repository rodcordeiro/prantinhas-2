export type PlantPhotoCategory = 'leaf' | 'flower';

export type PlantPhoto = {
  id: string;
  category: PlantPhotoCategory;
  uri: string;
  capturedAt: string;
};

export type PlantAnalysisStatus = 'idle' | 'pending' | 'completed' | 'failed';

export type PlantSuggestedCare = {
  waterAmount: string;
  waterFrequency: string;
  wateringIntervalDays: number;
  sunlight: string;
};

export type PlantAnalysis = {
  summary: string;
  suggestedScientificName: string;
  suggestedCare: PlantSuggestedCare;
};

export type Plant = {
  id: string;
  name: string;
  organ: string;
  scientificName: string;
  waterAmount: string;
  waterFrequency: string;
  wateringIntervalDays: number;
  sunlight: string;
  lastHydrationAt: string;
  nextHydrationAt: string;
  reminderHour: number;
  remindersEnabled: boolean;
  scheduledNotificationId?: string;
  photos: PlantPhoto[];
  analysisStatus: PlantAnalysisStatus;
  analysisSummary?: string;
  suggestedScientificName?: string;
  suggestedCare?: PlantSuggestedCare;
};

export type PlantDraft = {
  name: string;
  organ: string;
  photos: PlantPhoto[];
  analysisStatus: PlantAnalysisStatus;
  analysis?: PlantAnalysis;
};

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  PlantDetail: { plantId: string };
  PlantEdit: { plantId: string };
  Hydrate: undefined;
  CreatePlant: undefined;
  OrganSelect: undefined;
  CameraCapture: { category: PlantPhotoCategory };
};
