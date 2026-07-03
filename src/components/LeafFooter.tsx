import { Image, StyleSheet, View } from 'react-native';

export function LeafFooter() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/footer-leaves.png')}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 203,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
