# Real-time chat with Expo Go and React Native
## Session 5 - Import pre-built hooks (Primarily for working with Firebase)

In this session I am going to ask you to simply import some pre-built files I have already written that should allow you to interact with Firebase.  The material here is a bit more that I am ready to dive into you with this during this course.

This is less creative that the last sessions to where I am asking you to basically run some installation commands and then copy and paste some files.  I will explain a bit about this as we go along.

Information on Firebase:
- https://firebase.google.com/

1. In Visual Studio Code, open the command prompt window which should be found at the bottom of your screen.

2. From the command prompt window, enter the below commands to install the needed libraries to work with Firebase:
```
cd expo-go-real-time-chat
npx expo install firebase
npx expo customize metro.config.js
```
Reference on this installation: https://docs.expo.dev/guides/using-firebase/

3. From the command prompt window, enter the below command to install the needed libraries to work with React Native's asynchronous storage as well as an uuid generation library:
```
npm install @react-native-async-storage/async-storage
npm install react-native-uuid
```
Reference on these installations:
- https://docs.expo.dev/develop/user-interface/store-data/
- https://react-native-async-storage.github.io/async-storage/docs/usage/
- https://github.com/eugenehp/react-native-uuid#readme

4. Create a new `/firebaseConfig.js` file and copy the contents of what you are seeing in the link from #4 to this file.
```tsx
import { initializeApp } from 'firebase/app';
import firebaseConfigSecrets from './firebaseConfigSecrets';

console.debug('Setting up Firebase database');
const app = initializeApp(firebaseConfigSecrets);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export default app;
```
5. You will find a file named "firebaseConfigSecrets.js" in the Documents folder of your computer.  Copy this file into this project to where it will be alongside the existing `/firebaseConfig.js` file.
(This file contains the secrets that you need in order to connect to a Firebase instance I have setup beforehand.)

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

6. Open the below link in your browser.
https://github.com/cah-john-ryan/expo-go-real-time-chat/blob/session-5-imports/expo-go-real-time-chat/app/imports.zip

7. Download this .zip file.

8. Unzip the downloaded imports.zip file.

9. Copy and paste the contents of the unzipped file to your `/app` folder in this project.

10. You should now have a new `hooks` and `objects` folder in `/app`.

11. Open the `/app/.gitignore` file.  Add the below line to the file.
```
firebaseConfigSecrets.js
```


13. Open the `/app/index.tsx` file.

14. Add the below import:
```tsx
import useFirebaseUserData from "@/app/hooks/useFirebaseUserData";
```

15. Add the below in a new line below the `Index()` function declaration:

Replace this:
```tsx
const [userName, setUserName] = useState<string>('');
```
With this:
```tsx
const [userName, setUserName] = useState<string>('');
const {findByUserName, storeNewUserData} = useFirebaseUserData(null);

const storeUserName = async () => {
    if (!userName) {
        return;
    }
    const existingUserData = findByUserName(userName);
    let userData;
    if (existingUserData) {
        console.log(`The user name ${userName} already exists.  Assuming identity of that user. (userKey: ${existingUserData.key})`);
        userData = existingUserData;
    } else {
        userData = await storeNewUserData(userName);
    }
    alert(`Continue pressed. Current userKey in Firebase is: ${userData.key}`);
    // In the next session we will have the application change to a new chat screen with this user information.
};

```

16. Update the `<Pressable>` button so that it calls this new `storeUserName()` function from step #13.

Replace this:
```tsx
<Pressable
    style={styles.continueButton}
    onPress={() => {
    alert(`Continue pressed. Current userName: ${userName}`)
    }}
>
    <Text style={styles.continueButtonText}>Continue</Text>
</Pressable>
```
With this:
```tsx
<Pressable
    style={styles.continueButton}
    onPress={storeUserName}
>
    <Text style={styles.continueButtonText}>Continue</Text>
</Pressable>
```

Your application is now wired up to work with a Firebase instance to create and retrieve user information.

> [!NOTE] 
> Given the time we have, I am not going to cover adding an actual authentication process to secure the data we are keeping in Firebase during this class.
> 
> I am going to run this class on a honor system in trusting that you will not abuse this access.  Please be mindful of the user name you are creating next as well as any messages you create as they will be visible to everyone else in the class.
>
> This Firebase instance will only exist for the duration of the class today.  If you continue working with this project after today you will need to explore setting up a Firebase instance for yourself.
>
> You can compare your changes here against the below file for reference if you are running into any challenges in completing this session.
>
> [index.tsx file for session 5](https://github.com/cah-john-ryan/expo-go-real-time-chat/blob/session-5-imports/expo-go-real-time-chat/app/index.tsx)

18. In Visual Studio Code, open the command prompt window which should be found at the bottom of your screen.
19. Copy the below commands and paste them into the command prompt window:
```
git add .
git commit -m "session-5-imports done"
```


### SESSION COMPLETE

Up next -> [Session 6 - Adding a chat route](session-6-adding-chat-route.md)

