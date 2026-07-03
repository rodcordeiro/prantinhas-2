import { Image, StyleSheet, View, ViewStyle } from 'react-native';

type LogoProps = {
  size?: number;
  style?: ViewStyle;
};

export function Logo({ size = 150, style }: LogoProps) {
  return (
    <View style={[styles.container, { width: size * 0.65, height: size }, style]}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
