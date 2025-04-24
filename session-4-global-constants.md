# Real-time chat with Expo Go and React Native
## Session 4 - Global Constants and Colors

We are about to step into creating additional screens in this application.  Before doing this, there are some styling preferences that are present in the `styles` constant of the `/app/index.tsx` file which we will want to use elsewhere in this application.

Values like these:
```tsx
padding: 10,
borderRadius: 10,
backgroundColor: "blue",
```

Let's extract them out into a `/app/constants.ts` file for general use./

1. Create a new file, `/app/constants.ts`.

2. In that file, paste this content:
```ts
export default {
  layout: {
    padding: 10,
    borderRadius: 10,
  },
  colors: {
    // I like the color green.  I am a big fan of Link from the Legend of Zelda.
    // Choose a color of your own preference here:
    // https://coolors.co/
    primaryColor: '#38B000', // #38B000
    primaryColorText: '#F8F9FA', // #F8F9FA
  }
};
```

> [!IMPORTANT]  
> Please take a moment to update the `/app/constants.ts` file with settings/colors of your own preference.

3. Open the `/app/index.tsx` file.

4. Add this to the top of the file with the other imports statements.
```tsx
import Constants from "@/app/constants";
```

5. Update the `styles` variable at the bottom of the file to the below content:
```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Constants.layout.padding,
    gap: 25
  },
  welcomeText: {
    marginTop: 25
  },
  userNameInput: {
    width: "100%",
    borderWidth: 1,
    borderRadius: Constants.layout.borderRadius,
    padding: Constants.layout.padding,
  },
  continueButton: {
    width: "100%",
    borderRadius: Constants.layout.borderRadius,
    padding: Constants.layout.padding,
    alignItems: "center",
    backgroundColor: Constants.colors.primaryColor,
  },
  continueButtonText: {
      color: Constants.colors.primaryColorText
  }
});
```

6. Open the `/app/_layout.tsx` file.

7. Update the content of this file to what is shown below:
```tsx
import { Stack } from "expo-router";
import Constants from "@/app/constants";

export default function RootLayout() {
  return (
    <Stack 
      screenOptions={{
      headerStyle: {
          backgroundColor: Constants.colors.primaryColor,
      },
      headerShadowVisible: false,
      headerTintColor: Constants.colors.primaryColorText
  }}
    >
      <Stack.Screen name="index" options={{title: 'Setup User Account'}}/>
    </Stack>
  );
}
```
This will update the presentation of the header for the screen.
The landing screen should now present itself using the settings and colors you have set in the `/app/constants.ts` file.

> [!NOTE] 
> You can compare your changes here against the below file for reference if you are running into any challenges in completing this session.
>
> [constants.ts file for session 4](https://github.com/cah-john-ryan/expo-go-real-time-chat/blob/session-4-global-constants/expo-go-real-time-chat/app/constants.ts)
>
> [index.tsx file for session 4](https://github.com/cah-john-ryan/expo-go-real-time-chat/blob/session-4-global-constants/expo-go-real-time-chat/app/index.tsx)

Let's save the state of your work now that this session is done.

8. In Visual Studio Code, open a new command prompt window which should automatically be displayed in the bottom of your screen.
9. Copy the below commands and paste them into the command prompt window:
```
git add .
git commit -m "session-4-global-constants done"
```


### SESSION COMPLETE

Up next -> [Session 5 - Imports](session-5-imports.md)
