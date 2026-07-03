import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../types';
import { Logo } from '../components/Logo';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { LeafFooter } from '../components/LeafFooter';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Logo size={150} style={styles.logo} />

          <View style={styles.form}>
            <Input
              label="Email:"
              placeholder="Your email"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              label="Password:"
              placeholder="Your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.inputSpacing}
            />

            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text style={styles.linkText}>
                Ainda não tem uma conta?{' '}
                <Text style={styles.linkHighlight}>Cadastre-se</Text>
              </Text>
            </Pressable>

            <Button
              label="Login"
              onPress={() => navigation.replace('Home')}
              style={styles.primaryButton}
            />

            <Text style={styles.socialLabel}>Ou acesse com uma conta social</Text>
            <Button
              label="Acessar com google"
              onPress={() => navigation.replace('Home')}
              showGoogleIcon
            />
          </View>
        </ScrollView>
        <LeafFooter />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 36,
    paddingBottom: 220,
  },
  logo: {
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 30,
  },
  form: {
    gap: 8,
  },
  inputSpacing: {
    marginTop: 12,
  },
  linkText: {
    ...typography.small,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  linkHighlight: {
    color: colors.primary,
    fontFamily: 'Inter_400Regular',
  },
  primaryButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  socialLabel: {
    ...typography.small,
    textAlign: 'center',
    marginBottom: 12,
  },
});
