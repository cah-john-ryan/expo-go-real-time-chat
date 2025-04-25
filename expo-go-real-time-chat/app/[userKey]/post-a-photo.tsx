import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, Platform, StyleSheet, View } from 'react-native';
import Constants from "@/app/constants";
import IconButton from '@/app/components/generic/IconButton';
import { useLocalSearchParams, useRouter } from 'expo-router';
import useFirebaseMessages from '@/app/hooks/useFirebaseMessages';
import useFirebaseUserData from '@/app/hooks/useFirebaseUserData';
import MessageType from '@/app/objects/MessageType';
import * as FileSystem from 'expo-file-system';
import Text from '@/app/components/generic/Text';

export default function PostAPhoto() {
  const ref = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const { userKey } = useLocalSearchParams();
  const { userDataForSelf } = useFirebaseUserData(userKey);
  const { storeMessage } = useFirebaseMessages();
  const router = useRouter();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    if (photo?.uri && userDataForSelf) {
        if (Platform.OS === 'web') {
            storeMessage(userDataForSelf.key, photo.uri, MessageType.Image);
        } else {
            const base64Img = await FileSystem.readAsStringAsync(photo.uri, { encoding: FileSystem.EncodingType?.Base64 });
            storeMessage(userDataForSelf.key, "data:image/png;base64,"+base64Img, MessageType.Image);
        }
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={ref}>
        <View style={styles.buttonContainer}>
            <IconButton 
                style={styles.button}
                name="refresh"
                onPress={toggleCameraFacing}
            />
            <IconButton 
                style={styles.button}
                name="camera"
                onPress={takePicture}
            />
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
    gap: Constants.layout.padding
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});