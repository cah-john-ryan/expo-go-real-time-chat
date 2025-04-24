# Real-time chat with Expo Go and React Native
## Session 6b - Skip the landing page (if you already entered a user name)

If you are testing this on your phone you will have noticed at this point that every time you make a change in code, the app will take you back to the landing page.  

If you have already entered a user name this can be annoying.

To address this, perform the following actions.

1. Open the `/app/index.tsx` for the landing screen.  Make these changes:
```tsx
import { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Constants from "@/app/constants";
import useFirebaseUserData from "@/app/hooks/useFirebaseUserData";
import { Href, useFocusEffect, useRouter } from "expo-router";
// Add this import
import useLocalStorage from "@/app/hooks/useLocalStorage";

export default function Index() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');
  const {findByUserName, storeNewUserData} = useFirebaseUserData(null);
  // Add this useLocalStorage to store the userKey that has already been identified.
  const [userKeyInLocalStorage, setUserKeyInLocalStorage] = useLocalStorage('userKey');

  // Add this block of code below.
  // When this screen gains focus check if a userKey has already been identified.
  // If so, then redirect to the chat screen with that userKey.
  useFocusEffect(
    useCallback(() => {
        if (userKeyInLocalStorage) {
            console.log(`Index.useFocusEffect: userKey found in local storage.  Redirecting to the chat screen.  (userKey: ${userKeyInLocalStorage})`);
            const homeRoute = `/${userKeyInLocalStorage}/chat` as Href;
            router.replace(homeRoute);
        }
    }, [userKeyInLocalStorage])
  );
```

That should take care of that annoyance.  Go ahead and reopen the app on your phone and you should see that the chat screen comes right up without needing to re-enter your user name.

2. In Visual Studio Code, open a new command prompt window which should automatically be displayed in the bottom of your screen.
3. Copy the below commands and paste them into the command prompt window:
```
git add .
git commit -m "session-6b-skip-landing-page done"
```

### SESSION COMPLETE