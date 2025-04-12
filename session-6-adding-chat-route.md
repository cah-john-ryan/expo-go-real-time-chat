# Real-time chat with Expo Go and React Native
## Session 6 - Adding a chat route

Now that the landing page is up and running, let's update out routing that is managed in `/app/_layout.tsx` so that we can navigate from the landing page to a new chat screen.

Open the `/app/_layout.tsx` file now.  The `<Stack/>` component that you see there is a central to Expo Go in how it manages what screens that are available within your application and how users navigate between these screens.

We are going to add a new `<Stack.Screen/>` here for the chat screen.  Not only that, but we will be passing the Firebase userKey as a parameter so that the chat screen knows who you are now that the landing screen has identified that information.

1. Add a new `<Stack.Screen/>` to the `/app/_layout.tsx` file.
```tsx
<Stack.Screen name="[userKey]/chat" options={{title: 'Technology Camp Chat'}}/>
```

2. Create a new folder named "[userKey]" to where it will be found under the `/app` folder.  

3. Under the `/app/[userKey]` folder, create a file named `chat.tsx`.

Your application folder structure should look like this now:

![alt text](documentation-assets/[userKey]-folder-location.jpg)

4. Open the `/app/index.tsx` for the landing screen.  We will be making this screen navigate to the `chat` screen and provide the `userKey` it has identified.

5. Import the `Href` and the `useRouter` hook at the top of this file.
```tsx
import { Href, useRouter } from "expo-router";
```

6. Add the Expo Go router to this component by adding the below line:
```tsx
const router = useRouter();
```

7. Lastly, replace the below lines:
```tsx
alert(`Continue pressed. Current userKey in firebase is: ${userData.key}`);
// In the next session we will have the application change to a new chat screen with this user information.
```
With this:
```tsx
const homeRoute = `/${userData.key}/chat` as Href;
router.replace(homeRoute);
```

That should be it for the landing screen.  Let's define the `/app/[userKey]/chat.tsx` component for the application.

8. Open the `/app/[userKey]/chat.tsx` file.

9. Paste the below content into this file.
```tsx
import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Chat() {
    const { userKey } = useLocalSearchParams();

    return (
        <View>
            <Text>Welcome to the chat screen!</Text>
            <Text>userKey: {userKey}</Text>
        </View>
    );
}
```
Notice the `useLocalSearchParams` from "expo-router".  With this, we can retreive the `userKey` passed from the landing screen we worked on earlier.

Now when you enter a user name on the landing screen and click on the Continue button, you should be taken to this new chat screen and your Firebase userKey should be identified.

### SESSION COMPLETE