import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { usePlants } from '../context/PlantsProvider';
import { PlantCareInfo } from '../components/PlantCareInfo';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { formatDate } from '../utils/date';

type Props = NativeStackScreenProps<RootStackParamList, 'PlantDetail'>;

export function PlantDetailScreen({ navigation, route }: Props) {
  const { getPlantById } = usePlants();
  const plant = getPlantById(route.params.plantId);

  if (!plant) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.error}>Planta não encontrada</Text>
      </SafeAreaView>
    );
  }

  const hasPhotos = plant.photos.length > 0;
  const heroImage = hasPhotos
    ? { uri: plant.photos[0].uri }
    : require('../../assets/images/plant-pot.png');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color={colors.white} />
          </Pressable>
          <Pressable
            style={styles.editButton}
            onPress={() => navigation.navigate('PlantEdit', { plantId: plant.id })}
          >
            <Ionicons name="create-outline" size={20} color={colors.white} />
          </Pressable>
          <Image
            source={heroImage}
            style={styles.plantImage}
            resizeMode={hasPhotos ? 'cover' : 'contain'}
          />
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.name}>{plant.name}</Text>
          <Text style={styles.scientificName}>{plant.scientificName}</Text>
        </View>

        <View style={styles.careRow}>
          <PlantCareInfo
            waterAmount={plant.waterAmount}
            waterFrequency={plant.waterFrequency}
            sunlight={plant.sunlight}
            size="md"
          />
        </View>

        <View style={styles.photosSection}>
          <Text style={styles.sectionTitle}>Fotos:</Text>
          {hasPhotos ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {plant.photos.map((photo) => (
                <Image key={photo.id} source={{ uri: photo.uri }} style={styles.photo} />
              ))}
            </ScrollView>
          ) : (
            <View style={styles.emptyPhotos}>
              <Ionicons name="camera-outline" size={34} color={colors.secondary} />
              <Text style={styles.emptyPhotosText}>
                Ainda não há fotos para admirar
              </Text>
            </View>
          )}
        </View>

        {plant.analysisSummary ? (
          <View style={styles.analysisSection}>
            <Text style={styles.sectionTitle}>IA simulada:</Text>
            <Text style={styles.analysisText}>{plant.analysisSummary}</Text>
          </View>
        ) : null}

        <View style={styles.hydrationSection}>
          <View style={styles.hydrationRow}>
            <Text style={styles.hydrationLabel}>Última hidratação:</Text>
            <Text style={styles.hydrationValue}>{formatDate(plant.lastHydrationAt)}</Text>
          </View>
          <View style={styles.hydrationRow}>
            <Text style={styles.hydrationLabel}>Próxima hidratação:</Text>
            <Text style={styles.hydrationValue}>{formatDate(plant.nextHydrationAt)}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  content: {
    paddingBottom: 32,
  },
  hero: {
    height: 335,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  backButton: {
    position: 'absolute',
    top: 21,
    left: 21,
    zIndex: 2,
  },
  editButton: {
    position: 'absolute',
    top: 18,
    right: 18,
    zIndex: 2,
  },
  plantImage: {
    width: 92,
    height: 142,
    marginTop: 20,
    borderRadius: 18,
  },
  infoBlock: {
    alignItems: 'center',
    marginTop: -40,
    marginBottom: 16,
  },
  name: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: colors.textTitle,
  },
  scientificName: {
    ...typography.scientificName,
    fontSize: 16,
    marginTop: 4,
  },
  careRow: {
    paddingHorizontal: 40,
    marginBottom: 24,
  },
  photosSection: {
    paddingHorizontal: 40,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: colors.textTitle,
    marginBottom: 12,
  },
  emptyPhotos: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
  },
  emptyPhotosText: {
    ...typography.caption,
    textAlign: 'center',
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: colors.backgroundSecondary,
  },
  analysisSection: {
    paddingHorizontal: 40,
    marginBottom: 24,
  },
  analysisText: {
    ...typography.caption,
    lineHeight: 22,
  },
  hydrationSection: {
    paddingHorizontal: 35,
    gap: 16,
  },
  hydrationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hydrationLabel: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: colors.textTitle,
  },
  hydrationValue: {
    ...typography.caption,
    fontSize: 16,
  },
  error: {
    ...typography.body,
    textAlign: 'center',
    marginTop: 40,
  },
});
