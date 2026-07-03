import { TextStyle } from 'react-native';

export const typography = {
  title: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#1E1E1E',
  } satisfies TextStyle,
  titleLight: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#F0F0F0',
  } satisfies TextStyle,
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#6E6E6E',
  } satisfies TextStyle,
  body: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#1E1E1E',
  } satisfies TextStyle,
  caption: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6E6E6E',
  } satisfies TextStyle,
  small: {
    fontSize: 12,
    fontFamily: 'Inter_300Light',
    color: '#6E6E6E',
  } satisfies TextStyle,
  onboardingTitle: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#1E1E1E',
    lineHeight: 29,
  } satisfies TextStyle,
  onboardingBody: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#6E6E6E',
    lineHeight: 19,
  } satisfies TextStyle,
  button: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#FFFFFF',
  } satisfies TextStyle,
  scientificName: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#A0D468',
  } satisfies TextStyle,
} as const;
