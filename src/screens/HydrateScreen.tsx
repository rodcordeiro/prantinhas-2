import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { usePlants } from '../context/PlantsProvider';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'Hydrate'>;

export function HydrateScreen({ navigation }: Props) {
  const { plants, hydratePlant } = usePlants();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color={colors.white} />
        </Pressable>
        <Text style={styles.headerTitle}>Hidratar plantas</Text>
        <View style={styles.headerSpacer} />
      </View>

      <FlatList
        data={plants}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.plantInfo}>
              <Text style={styles.plantName}>{item.name}</Text>
              <Text style={styles.plantScientific}>{item.scientificName}</Text>
            </View>
            <View style={styles.amountBox}>
              <Text style={styles.amount}>{item.waterAmount}</Text>
            </View>
            <Pressable
              style={styles.checkButton}
              onPress={() => {
                void hydratePlant(item.id);
              }}
            >
              <Ionicons name="checkmark" size={22} color={colors.white} />
            </Pressable>
          </View>
        )}
      />
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
  list: {
    padding: 21,
    gap: 16,
  },
  row: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  plantInfo: {
    flex: 1,
  },
  plantName: {
    ...typography.title,
    fontSize: 18,
  },
  plantScientific: {
    ...typography.scientificName,
    marginTop: 4,
  },
  amountBox: {
    backgroundColor: colors.backgroundPrimary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 12,
  },
  amount: {
    ...typography.body,
    color: colors.primary,
  },
  checkButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
