import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type InputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  style?: ViewStyle;
};

export function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  style,
}: InputProps) {
  const [hidden, setHidden] = useState(secureTextEntry);

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.field}>
        <Ionicons
          name="pricetag-outline"
          size={20}
          color={colors.secondary}
          style={styles.leadingIcon}
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSubtitle}
          secureTextEntry={hidden}
          style={styles.input}
          autoCapitalize="none"
        />
        {secureTextEntry && (
          <Pressable onPress={() => setHidden((current) => !current)}>
            <Ionicons
              name={hidden ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.secondary}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    ...typography.subtitle,
    marginBottom: 8,
    marginLeft: 4,
  },
  field: {
    height: 40,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  leadingIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.textTitle,
    paddingVertical: 0,
  },
});
