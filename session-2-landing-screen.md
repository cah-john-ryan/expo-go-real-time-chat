# Real-time chat with Expo Go and React Native
## Session 2 - Creating a landing screen

In this session we are going to create a screen that will greet the person using this application and then asking them to enter a user name that they would like to use.

Before we get started with this,
1. Click on the Command Prompt running at the bottom of your screen to make it active.
2. Press the keys `Control` + `C` at the same time to stop running the application.
3. Type the below command to get a fresh/empty app directory
```
npm run reset-project
```
4. For the prompt "Do you want to move existing files to /app-example instead of deleting them?", type `n`.
5. Type the command below to run the application.
```
npx expo start
```
6. Press the `w` key to run the application in your Google Chrome browser.  Once pressed, the browser should automatically appear with the application up and running.

#### The application that is running now should be much more basic in presentation.

---

> [!NOTE] 
> The Core Components for React Native can be found via the link below:
>
> https://reactnative.dev/docs/components-and-apis#basic-components
>
> We will be using the `<View/>`,`<Text/>`,`<TextInput/>`, and `<Pressable/>` components in this session.

7. In Visual Studio Code, find the component `/app/index.tsx` file.

#### (Take a moment to explain what is present there from the top to the bottom of the file.)

8. Update the `<Text/>` element
```tsx
<Text>Edit app/index.tsx to edit this screen.</Text>
```
to
```tsx
<Text>Welcome! Please enter a user name to proceed.</Text>
```

9. Add the below text below line 3:
```tsx
const [userName, setUserName] = useState<string>('');
```
> [!IMPORTANT]  
> useState is a React Hook that lets you add a state variable to your component.  This will help this component keep track of the current value for the `userName` variable.
> https://react.dev/reference/react/useState

10. Add below the `<Text/>` element add the below two elements that will permit users to enter a username and click continue button:
```tsx
<TextInput
    value={userName}
    onChangeText={(text) => {
        setUserName(text);
    }}
    placeholder={"Enter your desired user name here"}
    placeholderTextColor={"grey"}
/>

<Pressable 
    onPress={() => {
        alert(`Continue pressed. Current userName: ${userName}`)
    }}
>
    <Text>Continue</Text>
</Pressable>
```

11. You should see a red squiggly line below "useState", "TextInput", and "Pressable" as Visual Studio Code does not know what this element is.  Hover your mouse over `useState` and press `Control` + `.`.  This should update the `import` statement at the top of the file to tell Visual Studio Code where this element comes from.  Repeat this for each item in this file that has these red squiggly lines.  

Once done, the top of the file should change from this:
```tsx
import { Text, View } from "react-native";
```
Should update to this:
```tsx
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
```

12. Lastly, the header for this screen says "Index" which is not very helpful.  Find the file `/app/_layout.tsx` and open it.

Change what you find there from this:
```tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
```
To this:
```tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title: 'Setup User Account'}}/>
    </Stack>
  );
}
```
You will notice that change updated the header for the landing screen to now say "Setup User Account" instead of "Index".  Future sessions will explain what is going on with the `_layout.tsx` file.  For now this change will get the header setup for this screen with the text we want to have shown.

The application running in your browser should be functional, but not very pretty.
Try entering a user name value and clicking on the Continue button.

What your `/app/index.tsx` file should look like at this point:
```tsx
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function Index() {
  const [userName, setUserName] = useState<string>('');
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome! Please enter a user name to proceed.</Text>

      <TextInput
          value={userName}
          onChangeText={(text) => {
            setUserName(text);
          }}
          placeholder={"Enter your desired user name here"}
          placeholderTextColor={"grey"}
      />

      <Pressable 
          onPress={() => {
            alert(`Continue pressed. Current userName: ${userName}`)
          }}
      >
          <Text>Continue</Text>
      </Pressable>
    </View>
  );
}
```

You now have a screen where someone can enter a user name that they desire.  It is not very pretty but it is functional.

### SESSION COMPLETE

Up next -> [Session 3 - Styling the landing screen](session-3-styling-the-landing-screen.md)
