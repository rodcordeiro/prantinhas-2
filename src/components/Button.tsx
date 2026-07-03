import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'filled' | 'outline';
  showGoogleIcon?: boolean;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
};

export function Button({
  label,
  onPress,
  variant = 'filled',
  showGoogleIcon = false,
  loading = false,
  disabled = false,
  style,
}: ButtonProps) {
  const isFilled = variant === 'filled';
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        isFilled ? styles.filled : styles.outline,
        (pressed || isDisabled) && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isFilled ? colors.white : colors.primary} />
      ) : (
        <View style={styles.content}>
          {showGoogleIcon && (
            <Image
              source={require('../../assets/images/google-icon.png')}
              style={styles.googleIcon}
            />
          )}
          <Text
            style={[
              typography.button,
              !isFilled && { color: colors.primary },
            ]}
          >
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  filled: {
    backgroundColor: colors.primary,
  },
  outline: {
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  pressed: {
    opacity: 0.85,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  googleIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});
