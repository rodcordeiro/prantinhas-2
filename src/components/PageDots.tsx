import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';

type PageDotsProps = {
  total: number;
  activeIndex: number;
};

export function PageDots({ total, activeIndex }: PageDotsProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === activeIndex ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    height: 10,
    borderRadius: 5,
  },
  activeDot: {
    width: 18,
    backgroundColor: colors.primary,
  },
  inactiveDot: {
    width: 10,
    backgroundColor: colors.textSubtitle,
    opacity: 0.4,
  },
});
