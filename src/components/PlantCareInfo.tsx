import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type PlantCareInfoProps = {
  waterAmount: string;
  waterFrequency: string;
  sunlight: string;
  size?: 'sm' | 'md';
};

export function PlantCareInfo({
  waterAmount,
  waterFrequency,
  sunlight,
  size = 'sm',
}: PlantCareInfoProps) {
  const iconSize = size === 'md' ? 22 : 16;
  const textStyle = size === 'md' ? styles.textMd : styles.textSm;

  return (
    <View style={styles.row}>
      <View style={styles.item}>
        <Ionicons name="water-outline" size={iconSize} color={colors.secondary} />
        <Text style={textStyle}>{waterAmount}</Text>
      </View>
      <View style={styles.item}>
        <Ionicons name="calendar-outline" size={iconSize} color={colors.secondary} />
        <Text style={textStyle}>{waterFrequency}</Text>
      </View>
      <View style={styles.item}>
        <Ionicons name="sunny-outline" size={iconSize} color={colors.secondary} />
        <Text style={textStyle}>{sunlight}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  textSm: {
    ...typography.caption,
  },
  textMd: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: colors.textSubtitle,
  },
});
