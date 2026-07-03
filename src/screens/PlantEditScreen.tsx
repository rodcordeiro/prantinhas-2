import { useState } from 'react';
import {
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
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { parseFrequencyDays } from '../utils/date';

type Props = NativeStackScreenProps<RootStackParamList, 'PlantEdit'>;

export function PlantEditScreen({ navigation, route }: Props) {
  const { getPlantById, updatePlant } = usePlants();
  const plant = getPlantById(route.params.plantId);
  const [name, setName] = useState(plant?.name ?? '');
  const [scientificName, setScientificName] = useState(plant?.scientificName ?? '');
  const [waterAmount, setWaterAmount] = useState(plant?.waterAmount ?? '');
  const [waterFrequency, setWaterFrequency] = useState(
    plant ? String(plant.wateringIntervalDays) : '',
  );
  const [sunlight, setSunlight] = useState(plant?.sunlight ?? '');

  if (!plant) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.error}>Planta não encontrada</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color={colors.white} />
        </Pressable>
        <Text style={styles.headerTitle}>Editar planta</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Input label="Nome:" placeholder="Nome da planta" value={name} onChangeText={setName} />
        <Input
          label="Nome científico:"
          placeholder="Nome científico"
          value={scientificName}
          onChangeText={setScientificName}
          style={styles.fieldSpacing}
        />
        <Input
          label="Água:"
          placeholder="250ml"
          value={waterAmount}
          onChangeText={setWaterAmount}
          style={styles.fieldSpacing}
        />
        <Input
          label="Frequência (dias):"
          placeholder="14"
          value={waterFrequency}
          onChangeText={setWaterFrequency}
          style={styles.fieldSpacing}
        />
        <Input
          label="Luz solar:"
          placeholder="none"
          value={sunlight}
          onChangeText={setSunlight}
          style={styles.fieldSpacing}
        />

        <Button
          label="Salvar alterações"
          onPress={async () => {
            const wateringIntervalDays = parseFrequencyDays(waterFrequency);
            await updatePlant(plant.id, {
              name,
              scientificName,
              waterAmount,
              waterFrequency: `${wateringIntervalDays}d`,
              wateringIntervalDays,
              sunlight,
            });
            navigation.goBack();
          }}
          style={styles.saveButton}
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
    height: 79,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 21,
  },
  headerTitle: {
    ...typography.titleLight,
    fontSize: 18,
  },
  headerSpacer: {
    width: 20,
  },
  content: {
    padding: 21,
    gap: 4,
  },
  fieldSpacing: {
    marginTop: 16,
  },
  saveButton: {
    marginTop: 32,
  },
  error: {
    ...typography.body,
    textAlign: 'center',
    marginTop: 40,
  },
});
