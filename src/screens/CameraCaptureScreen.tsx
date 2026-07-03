import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { usePlants } from '../context/PlantsProvider';
import { RootStackParamList } from '../types';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'CameraCapture'>;

export function CameraCaptureScreen({ navigation, route }: Props) {
  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const { captureDraftPhoto } = usePlants();

  const categoryLabel = route.params.category === 'leaf' ? 'folha' : 'flor';

  if (!permission) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <Text style={styles.permissionTitle}>Precisamos da câmera</Text>
        <Text style={styles.permissionText}>
          Autorize o acesso para fotografar a {categoryLabel} da planta.
        </Text>
        <Pressable style={styles.permissionButton} onPress={() => void requestPermission()}>
          <Text style={styles.permissionButtonText}>Conceder acesso</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        facing={facing}
        onCameraReady={() => setIsCameraReady(true)}
      />

      <SafeAreaView style={styles.overlay}>
        <View style={styles.topBar}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={28} color={colors.white} />
          </Pressable>
          <Text style={styles.title}>Fotografe a {categoryLabel}</Text>
          <Pressable
            onPress={() =>
              setFacing((current) => (current === 'back' ? 'front' : 'back'))
            }
          >
            <Ionicons name="camera-reverse-outline" size={28} color={colors.white} />
          </Pressable>
        </View>

        <View style={styles.bottomBar}>
          <Text style={styles.helpText}>
            Centralize a {categoryLabel} e toque para capturar.
          </Text>

          <Pressable
            disabled={!isCameraReady || isCapturing}
            style={({ pressed }) => [
              styles.captureButton,
              (pressed || isCapturing) && styles.captureButtonPressed,
            ]}
            onPress={async () => {
              if (!cameraRef.current || !isCameraReady) {
                return;
              }

              setIsCapturing(true);

              try {
                const picture = await cameraRef.current.takePictureAsync({
                  quality: 0.7,
                });

                await captureDraftPhoto(route.params.category, picture.uri);
                navigation.goBack();
              } finally {
                setIsCapturing(false);
              }
            }}
          >
            {isCapturing ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <View style={styles.captureButtonInner} />
            )}
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundPrimary,
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  permissionTitle: {
    ...typography.title,
    textAlign: 'center',
    marginBottom: 12,
  },
  permissionText: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  permissionButtonText: {
    ...typography.button,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...typography.body,
    color: colors.white,
    fontFamily: 'Inter_700Bold',
  },
  bottomBar: {
    alignItems: 'center',
    gap: 16,
  },
  helpText: {
    ...typography.caption,
    color: colors.white,
    textAlign: 'center',
  },
  captureButton: {
    width: 78,
    height: 78,
    borderRadius: 39,
    borderWidth: 4,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  captureButtonPressed: {
    opacity: 0.8,
  },
  captureButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.white,
  },
});
