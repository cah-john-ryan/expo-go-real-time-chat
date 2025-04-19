# Real-time chat with Expo Go and React Native
## Session 13 - Post a photo

#### Note: This is a longer session than most.  It would be a good idea to take a break before starting this material.

In this session we will be adding a feature to post photos in our chat application.  This will involve adding a new button the the chat screen, adding a new route and screen to take a picture from the camera on your phone, and then displaying images as a new type of message on the chat screen.

1. Open the `/app/[userKey]/chat.tsx` file.

2. Add the below changes to this file.
```tsx
// Add `Href` and `useRouter` to the import here.
import { Href, useLocalSearchParams, useRouter } from "expo-router";

// Add this to the top section of the PostAPhoto() component.
const router = useRouter();

// Add this just below the submitNewMessage() function declaration.
// This will have the user navigate to a new "post-a-photo" route when this function is triggered.
const navigateToPostAPhotoRoute = () => {
    const postAPhotoRoute = `/${userKey}/post-a-photo` as Href;
    router.navigate(postAPhotoRoute);
};

// Now add this new `<IconButton/>` at the beginning of the footer before the `<TextInput/>` component.
<IconButton 
    name="camera"
    onPress={navigateToPostAPhotoRoute}
/>
```

3. You should now see a new IconButton on the chat screen with a camera icon displayed.  Let's create the route for where clicking this button should take you.

4. Open the `/app/_layout.tsx` file.

5. Update the content of this file to what is shown below:
```tsx
// Add this as a new screen to the `<Stack/>` component
<Stack.Screen name="[userKey]/post-a-photo" options={{title: 'Post A Photo'}}/>
```

6. Create a new `/app/[userKey]/post-a-photo.tsx` file.

7. Add the below changes to this file.
```tsx
import { Text } from 'react-native';

export default function PostAPhoto() {
    return (
        <Text>
            Take a photo!
        </Text>
    );
}
```

Now, open the app to the chat screen and click on the camera IconButton.  You should be taken to the new screen where we will be adding the feature to take and post a photo from the camera on your phone.

We are going to replace the content of what is in the `/app/[userKey]/post-a-photo.tsx` file with the example code from the below website.

https://docs.expo.dev/versions/latest/sdk/camera/

Before we do that though, we need to install the `expo-camera` library to help us work with the camera on your phone.

8. In Visual Studio Code, open a new command prompt window which should automatically be displayed in the bottom of your screen.

9. From the command prompt window, enter the below command to run this application in it's initial state:
```
npx expo install expo-camera
```

10. Now let's replace the content of what is in the `/app/[userKey]/post-a-photo.tsx` file with the example code from https://docs.expo.dev/versions/latest/sdk/camera/.
```tsx
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PostAPhoto() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

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

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
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
```

Now when you click the camera IconButton from the chat screen, you should be taken to a new screen that will prompt you for permission to use the camera on your device.  Once you give the application permission, you will then see a live image on the screen for what the camera is seeing.

Let's have this screen actually capture a photo.

11. Add the below code to the component:
```tsx
// Add `useRef` to the import here.
import { useRef, useState } from 'react';

// Add this to the top section of the PostAPhoto() component.
const ref = useRef<CameraView>(null);

// Add this after the toggleCameraFacing() function
const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    if (photo?.uri) {
        alert("Photo data obtained!  Now we need to do something with this data.");
        console.log("Photo data obtained!", photo.uri);
    }
};

// Update this section
return (
    <View style={styles.container}>
        {/* Adding the ref here */}
        <CameraView style={styles.camera} facing={facing} ref={ref}>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>

            {/* Adding a new button here to take a photo */}
            <TouchableOpacity style={styles.button} onPress={takePicture}>
                <Text style={styles.text}>Take Photo</Text>
            </TouchableOpacity>
        </View>
        </CameraView>
    </View>
);
```

This should now allow the Post A Photo screen to actually capture an image from your camera.

Let's refactor this a bit to use our common `<IconButton/>` component instead of those `<TouchableOpacity/>` components.

12. Add the import to the top of the file.
```tsx
import Constants from "@/app/constants";
import IconButton from '@/app/components/IconButton';
```

13. Update the bottom of this component from this:
```tsx
return (
    <View style={styles.container}>
        <CameraView style={styles.camera} facing={facing} ref={ref}>
        <View style={styles.buttonContainer}>
            {/* Getting rid of these */}
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
                <Text style={styles.text}>Take Photo</Text>
            </TouchableOpacity>
        </View>
        </CameraView>
    </View>
);
```

To this:
```tsx
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
```

And update this:
```tsx
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
```

To this:
```tsx
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
    gap: Constants.layout.padding
  },
```

Now the buttons at the bottom should be using our common component.

Lastly, let's update the `takePicture()` function so that it actually saves the image as a new message for our chat.

14. Update this file again with these new imports
```tsx
// Add Platform here to this import.
import { Button, Platform, StyleSheet, Text, View } from 'react-native';

// Add these entirely new imports.
import { useLocalSearchParams, useRouter } from 'expo-router';
import useFirebaseMessages from '@/app/hooks/useFirebaseMessages';
import useFirebaseUserData from '@/app/hooks/useFirebaseUserData';
import MessageType from '@/app/objects/MessageType';
import * as FileSystem from 'expo-file-system';

// Add this to the top section of the PostAPhoto() component.
const { userKey } = useLocalSearchParams();
const { userDataForSelf } = useFirebaseUserData(userKey);
const { storeMessage } = useFirebaseMessages();
const router = useRouter();
```

And lastly, update the `takeAPicture()` function with this logic:
```tsx
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
```
This will take the photo, send it to Firebase using the `storeMessage()` method, and then redirect you back to the chat screen.

Give it a try and see if this works.

Once done, you should see a new message from yourself that has a LOT of text inside it.
THIS IS ACTUALLY GOOD.  That big block of text is actually image data that the chat does not know how to interpret yet.

> [!NOTE] 
> You can compare your changes here against the below file for reference if you are running into any challenges in completing this session.
>
> [chat.tsx file for session 13](https://github.com/cah-john-ryan/expo-go-real-time-chat/blob/session-13-post-a-photo/expo-go-real-time-chat/app/%5BuserKey%5D/chat.tsx)
>
> [post-a-photo.tsx file for session 13](https://github.com/cah-john-ryan/expo-go-real-time-chat/blob/session-13-post-a-photo/expo-go-real-time-chat/app/%5BuserKey%5D/post-a-photo.tsx)

### SESSION COMPLETE

Up next -> [Session 14 - View photos](session-14-view-photos.md)
