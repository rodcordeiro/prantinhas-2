import { useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../types';
import { usePlants } from '../context/PlantsProvider';
import { HeaderBanner } from '../components/HeaderBanner';
import { PlantCard } from '../components/PlantCard';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const [menuVisible, setMenuVisible] = useState(false);
  const { plants, resetDraft } = usePlants();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <HeaderBanner
          title="My plants"
          showMenu
          onMenuPress={() => setMenuVisible(true)}
        />

        <FlatList
          data={plants}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <PlantCard
              plant={item}
              onPress={() => navigation.navigate('PlantDetail', { plantId: item.id })}
            />
          )}
        />
      </View>

      <Modal transparent visible={menuVisible} animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.menuPanel}>
            <Pressable
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                resetDraft();
                navigation.navigate('CreatePlant');
              }}
            >
              <Text style={styles.menuText}>Adicionar planta</Text>
            </Pressable>
            <Pressable
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('Hydrate');
              }}
            >
              <Text style={styles.menuText}>Hidratar plantas</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 25,
    paddingTop: 16,
    paddingBottom: 32,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 80,
    paddingRight: 16,
  },
  menuPanel: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    minWidth: 180,
    overflow: 'hidden',
  },
  menuItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.backgroundPrimary,
  },
  menuText: {
    ...typography.body,
    color: colors.primary,
  },
});
