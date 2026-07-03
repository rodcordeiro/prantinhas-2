import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Plant } from '../types';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { PlantCareInfo } from './PlantCareInfo';

type PlantCardProps = {
  plant: Plant;
  onPress: () => void;
};

export function PlantCard({ plant, onPress }: PlantCardProps) {
  const previewPhoto = plant.photos[0];

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <Image
        source={
          previewPhoto
            ? { uri: previewPhoto.uri }
            : require('../../assets/images/plant-pot.png')
        }
        style={styles.image}
        resizeMode={previewPhoto ? 'cover' : 'contain'}
      />
      <View style={styles.content}>
        <Text style={styles.name}>{plant.name}</Text>
        <Text style={styles.scientificName}>{plant.scientificName}</Text>
        <PlantCareInfo
          waterAmount={plant.waterAmount}
          waterFrequency={plant.waterFrequency}
          sunlight={plant.sunlight}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 21,
    minHeight: 117,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    width: 52,
    height: 80,
    marginRight: 16,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  name: {
    ...typography.title,
    fontSize: 24,
  },
  scientificName: {
    ...typography.scientificName,
    marginBottom: 8,
  },
});
