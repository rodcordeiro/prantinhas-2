import { Directory, File, Paths } from 'expo-file-system';
import { Plant, PlantPhoto, PlantPhotoCategory } from '../../types';

const appDirectory = new Directory(Paths.document, 'prantinhas');
const photosDirectory = new Directory(appDirectory, 'photos');
const plantsFile = new File(appDirectory, 'plants.json');

function ensureStorage(): void {
  appDirectory.create({ idempotent: true, intermediates: true });
  photosDirectory.create({ idempotent: true, intermediates: true });
}

export async function readStoredPlants(): Promise<Plant[] | null> {
  ensureStorage();

  if (!plantsFile.exists) {
    return null;
  }

  const contents = await plantsFile.text();
  if (!contents.trim()) {
    return null;
  }

  try {
    return JSON.parse(contents) as Plant[];
  } catch {
    return null;
  }
}

export async function writeStoredPlants(plants: Plant[]): Promise<void> {
  ensureStorage();

  if (!plantsFile.exists) {
    plantsFile.create({ intermediates: true });
  }

  plantsFile.write(JSON.stringify(plants, null, 2), { encoding: 'utf8' });
}

export async function persistCapturedPhoto(
  photoUri: string,
  category: PlantPhotoCategory,
): Promise<PlantPhoto> {
  ensureStorage();

  const sourceFile = new File(photoUri);
  const extension = photoUri.split('.').pop()?.split('?')[0] ?? 'jpg';
  const fileName = `${category}-${Date.now()}.${extension}`;
  const destinationFile = new File(photosDirectory, fileName);

  sourceFile.copy(destinationFile);

  return {
    id: `${category}-${Date.now()}`,
    category,
    uri: destinationFile.uri,
    capturedAt: new Date().toISOString(),
  };
}
