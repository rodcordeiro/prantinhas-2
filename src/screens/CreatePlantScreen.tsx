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
import { Button } from '../components/Button';
import { usePlants } from '../context/PlantsProvider';
import { RootStackParamList, PlantPhotoCategory } from '../types';
import { Input } from '../components/Input';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'CreatePlant'>;

type PhotoCategory = {
  id: PlantPhotoCategory;
  label: string;
};

const photoCategories: PhotoCategory[] = [
  { id: 'leaf', label: 'Leafs' },
  { id: 'flower', label: 'Flowers' },
];

export function CreatePlantScreen({ navigation }: Props) {
  const { draft, isAnalyzingDraft, updateDraft } = usePlants();
  const nextMissingCategory =
    photoCategories.find(
      (category) =>
        !draft.photos.some((photo) => photo.category === category.id),
    )?.id ?? 'leaf';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color={colors.textTitle} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('CameraCapture', { category: nextMissingCategory })}>
          <Ionicons name="camera-outline" size={22} color={colors.textTitle} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Registration:</Text>

        <Input
          label="Name:"
          placeholder="Plant name"
          value={draft.name}
          onChangeText={(name) => updateDraft({ name })}
          style={styles.nameInput}
        />

        <View style={styles.photosHeader}>
          <Text style={styles.photosTitle}>Photos:</Text>
          <Text style={styles.step}>2/3</Text>
        </View>

        {photoCategories.map((category) => {
          const selectedPhoto = draft.photos.find(
            (photo) => photo.category === category.id,
          );

          return (
            <View key={category.id} style={styles.photoCard}>
              {selectedPhoto ? (
              <Image
                source={{
                  uri: selectedPhoto.uri,
                }}
                style={styles.photoThumb}
              />
            ) : (
              <View style={styles.photoThumb} />
            )}
            <Text style={styles.photoLabel}>{category.label}</Text>
            <Pressable
              style={styles.addPhotoButton}
              onPress={() => navigation.navigate('CameraCapture', { category: category.id })}
            >
              <Ionicons name="add" size={24} color={colors.primary} />
            </Pressable>
            </View>
          );
        })}

        <View style={styles.analysisCard}>
          <Text style={styles.analysisTitle}>IA simulada</Text>
          {isAnalyzingDraft ? (
            <Text style={styles.analysisText}>Analisando a foto capturada...</Text>
          ) : draft.analysisStatus === 'completed' && draft.analysis ? (
            <>
              <Text style={styles.analysisText}>{draft.analysis.summary}</Text>
              <Text style={styles.analysisSuggestion}>
                Espécie sugerida: {draft.analysis.suggestedScientificName}
              </Text>
            </>
          ) : draft.analysisStatus === 'failed' ? (
            <Text style={styles.analysisText}>
              Não foi possível analisar a imagem. Você ainda pode continuar.
            </Text>
          ) : (
            <Text style={styles.analysisText}>
              Capture uma foto para gerar sugestões automáticas de espécie e cuidados.
            </Text>
          )}
        </View>

        <Button
          label="Continuar"
          onPress={() => navigation.navigate('OrganSelect')}
          disabled={isAnalyzingDraft || draft.photos.length === 0}
          style={styles.continueButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 21,
    paddingVertical: 12,
  },
  content: {
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  title: {
    ...typography.title,
    marginBottom: 16,
  },
  nameInput: {
    marginBottom: 24,
  },
  photosHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  photosTitle: {
    ...typography.title,
    fontSize: 20,
  },
  step: {
    ...typography.title,
    fontSize: 20,
    color: colors.textSubtitle,
  },
  photoCard: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  photoThumb: {
    width: 53,
    height: 53,
    borderRadius: 8,
    backgroundColor: colors.backgroundPrimary,
    marginRight: 12,
  },
  photoLabel: {
    ...typography.title,
    fontSize: 20,
    flex: 1,
  },
  addPhotoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  analysisCard: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  analysisTitle: {
    ...typography.title,
    fontSize: 18,
    marginBottom: 8,
  },
  analysisText: {
    ...typography.caption,
    lineHeight: 22,
  },
  analysisSuggestion: {
    ...typography.caption,
    color: colors.primary,
    marginTop: 8,
  },
  continueButton: {
    marginTop: 24,
  },
});
