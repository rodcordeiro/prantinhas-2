import { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { PageDots } from '../components/PageDots';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

type Slide = {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const slides: Slide[] = [
  {
    id: '1',
    title: 'Leve suas plantas na palma da mão',
    description: 'Todas as informações sobre suas plantas ao seu alcance',
    icon: 'flower-outline',
  },
  {
    id: '2',
    title: 'Conheça mais sobre suas plantas',
    description:
      'Ao cadastrar uma planta, ela é analisada por uma inteligência artificial.',
    icon: 'leaf-outline',
  },
  {
    id: '3',
    title: 'E aprenda a cuidar melhor delas!',
    description:
      'Após a análise, sugestões e dicas de como cuidar serão apresentadas e enviadas esporádicamente!',
    icon: 'sunny-outline',
  },
];

export function OnboardingScreen({ navigation }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList<Slide>>(null);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems[0]?.index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
  ).current;

  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      listRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
      return;
    }

    navigation.replace('Login');
  };

  const actionLabel = activeIndex === slides.length - 1 ? 'Login' : 'Next';

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={styles.textBlock}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <View style={styles.illustration}>
              <Ionicons name={item.icon} size={120} color={colors.secondary} />
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <PageDots total={slides.length} activeIndex={activeIndex} />
        <Pressable onPress={handleNext} style={styles.nextButton}>
          <Text style={styles.nextText}>{actionLabel}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  slide: {
    width,
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 61,
  },
  textBlock: {
    gap: 12,
    marginBottom: 40,
  },
  title: {
    ...typography.onboardingTitle,
  },
  description: {
    ...typography.onboardingBody,
  },
  illustration: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 120,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: colors.backgroundSecondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  nextButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  nextText: {
    ...typography.body,
    color: colors.primary,
    fontFamily: 'Inter_700Bold',
  },
});
