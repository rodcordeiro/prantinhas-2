import { PlantAnalysis, PlantPhotoCategory } from '../../types';

const analysisByCategory: Record<PlantPhotoCategory, PlantAnalysis> = {
  leaf: {
    summary:
      'A foto sugere uma planta de folhagem aromática saudável, com necessidade moderada de água e luz indireta.',
    suggestedScientificName: 'Mentha spicata',
    suggestedCare: {
      waterAmount: '250ml',
      waterFrequency: '2w',
      wateringIntervalDays: 14,
      sunlight: 'none',
    },
  },
  flower: {
    summary:
      'A imagem indica uma flor delicada, com rega mais frequente e preferência por ambiente bem iluminado.',
    suggestedScientificName: 'Begonia semperflorens',
    suggestedCare: {
      waterAmount: '180ml',
      waterFrequency: '7d',
      wateringIntervalDays: 7,
      sunlight: 'partial',
    },
  },
};

export async function analyzePlantPhotoMock(
  category: PlantPhotoCategory,
): Promise<PlantAnalysis> {
  await new Promise((resolve) => setTimeout(resolve, 1400));
  return analysisByCategory[category];
}
