import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { SplashScreen } from '../screens/SplashScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { PlantDetailScreen } from '../screens/PlantDetailScreen';
import { PlantEditScreen } from '../screens/PlantEditScreen';
import { HydrateScreen } from '../screens/HydrateScreen';
import { CreatePlantScreen } from '../screens/CreatePlantScreen';
import { OrganSelectScreen } from '../screens/OrganSelectScreen';
import { CameraCaptureScreen } from '../screens/CameraCaptureScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.backgroundPrimary },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PlantDetail" component={PlantDetailScreen} />
        <Stack.Screen name="PlantEdit" component={PlantEditScreen} />
        <Stack.Screen name="Hydrate" component={HydrateScreen} />
        <Stack.Screen name="CreatePlant" component={CreatePlantScreen} />
        <Stack.Screen name="OrganSelect" component={OrganSelectScreen} />
        <Stack.Screen name="CameraCapture" component={CameraCaptureScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
