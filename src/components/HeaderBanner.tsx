import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type HeaderBannerProps = {
  title: string;
  showMenu?: boolean;
  onMenuPress?: () => void;
};

export function HeaderBanner({ title, showMenu = false, onMenuPress }: HeaderBannerProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/header-leaves.png')}
        style={styles.background}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>{title}</Text>
        {showMenu && (
          <Pressable style={styles.menu} onPress={onMenuPress}>
            <View style={styles.menuLineLong} />
            <View style={styles.menuLineShort} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 196,
    width: '100%',
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  title: {
    ...typography.titleLight,
  },
  menu: {
    position: 'absolute',
    right: 17,
    top: 27,
    gap: 6,
  },
  menuLineLong: {
    width: 30,
    height: 3,
    backgroundColor: colors.white,
    borderRadius: 2,
  },
  menuLineShort: {
    width: 20,
    height: 3,
    backgroundColor: colors.white,
    borderRadius: 2,
    alignSelf: 'flex-end',
  },
});
