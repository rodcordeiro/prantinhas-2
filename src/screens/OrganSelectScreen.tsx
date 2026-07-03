import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { usePlants } from '../context/PlantsProvider';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'OrganSelect'>;

export function OrganSelectScreen({ navigation }: Props) {
  const [isSaving, setIsSaving] = useState(false);
  const { draft, updateDraft, createPlantFromDraft } = usePlants();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color={colors.textTitle} />
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Select the organ:</Text>
        <Text style={styles.subtitle}>
          Wich part of the plant is this from?
        </Text>

        <Input
          label="Organ:"
          placeholder="Leaf, flower, stem..."
          value={draft.organ}
          onChangeText={(organ) => updateDraft({ organ })}
          style={styles.input}
        />

        <Button
          label="Finalizar cadastro"
          loading={isSaving}
          disabled={draft.photos.length === 0}
          onPress={async () => {
            setIsSaving(true);
            const createdPlant = await createPlantFromDraft();
            setIsSaving(false);
            navigation.replace('PlantDetail', { plantId: createdPlant.id });
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  header: {
    paddingHorizontal: 21,
    paddingVertical: 12,
  },
  content: {
    paddingHorizontal: 40,
    paddingTop: 8,
  },
  title: {
    ...typography.title,
    marginBottom: 8,
  },
  subtitle: {
    ...typography.subtitle,
    marginBottom: 24,
    lineHeight: 24,
  },
  input: {
    marginBottom: 32,
  },
});
