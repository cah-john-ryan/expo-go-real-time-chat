# Real-time chat with Expo Go and React Native
## Session 3 - Styling the landing screen

Now let's apply some improvements to the presentation of this screen we have just built.  
We will accomplish this by applying some styling to the screen.  React provides a `StyleSheet` import we can use to help define how we want the content on this screen to present itself.

Reference: https://reactnative.dev/docs/stylesheet

1. Open the component `/app/index.tsx` file.
2. Update the imports for "react-native" from this:
```tsx
import { Pressable, Text, TextInput, View } from "react-native";
```
to this:
```tsx
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
```

3. At the bottom of the file, add the below code:
```tsx
const styles = StyleSheet.create({});
```

4. Let's start with migrating the existing styling that Expo Go generated for the `<View>` element.
Copy the contents of the `style` attribute here
```tsx
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
```
to here:
```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
```
And then update the `<View>` element to:
```tsx
    <View style={styles.container}>
``` 
The styling for the `<View>` element is now being managed in the `styles` constant at the bottom of this component.
> [!NOTE] 
> The styling here is using a common layout called flexbox.  More information can be found below.
>
> For our app that uses React Native: https://reactnative.dev/docs/flexbox
> 
> A more general document on using flexbox with websites: https://css-tricks.com/snippets/css/a-guide-to-flexbox/

5. Now let's change the container styling so that the content of this screen will not be centered.
```tsx
const styles = StyleSheet.create({
  container: {
    // Makes this element fill the whole screen vertically.
    flex: 1,
    // Places padding within this element so that anything contained won't be running to the edges.
    padding: 10,
    // Places a gap between the <Text>, <TextInput>, and <Pressable> elements.
    gap: 25
  }
});
```
Notice how the screen changed once this was applied.
Now let's update the styling for the elements themselves.

6. Add this to the `styles` constant for the welcome text.
```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 25
  },
  welcomeText: {
    // Places a margin/gap above this element to push it down from the header.
    marginTop: 25
  }
});
```
And update the `<Text>` element to use this style
From this:
```tsx
<Text>Welcome! Please enter a user name to proceed.</Text>
```
To this:
```tsx
<Text style={styles.welcomeText}>Welcome! Please enter a user name to proceed.</Text>
```
You should now see the welcome text a bit lower on the screen from where it was earlier.

7. Add this to the `styles` constant for the userName input
```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 25
  },
  welcomeText: {
    marginTop: 25
  },
  userNameInput: {
    // Makes the input fill the entire horizontal width of the parent container.
    width: "100%",
    // Presents a thin border around this element.
    borderWidth: 1,
    // Gives rounded edges to the border around this element.
    borderRadius: 10,
    // Places a padding inside the element so that whatever is entered does not touch the borders.
    padding: 10,
  }
});
```
And update the `<TextInput>` element to use this style
From this:
```tsx
<TextInput
    value={userName}
    onChangeText={(text) => {
        setUserName(text);
    }}
    placeholder={"Enter your desired user name here"}
    placeholderTextColor={"grey"}
/>
```
To this:
```tsx
<TextInput
    style={styles.userNameInput}
    value={userName}
    onChangeText={(text) => {
        setUserName(text);
    }}
    placeholder={"Enter your desired user name here"}
    placeholderTextColor={"grey"}
/>
```

8. Add this to the `styles` constant for the Continue button
```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 25
  },
  welcomeText: {
    marginTop: 25
  },
  userNameInput: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  continueButton: {
    // Makes the input fill the entire horizontal width of the parent container.
    width: "100%",
    // Gives rounded edges to the border around this element.
    borderRadius: 10,
    // Places a padding inside the element so that whatever is entered does not touch the borders.
    padding: 10,
    // Aligns the content in the button to be shown in the horizontal center of the screen.
    alignItems: "center",
    // Assigns a prominent color to the background to indicate this is an interactive button.
    backgroundColor: "blue",
  },
  continueButtonText: {
      color: "white"
  }
});
```
And update the `<TextInput>` element to use this style
From this:
```tsx
<Pressable
  onPress={() => {
    alert(`Continue pressed. Current userName: ${userName}`)
  }}
>
  <Text>Continue</Text>
</Pressable>
```
To this:
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
Now this screen has some basic styling applied.

> [!NOTE] 
> You can compare your changes here against the below file for reference if you are running into any challenges in completing this session.
>
> [index.tsx file for session 3](https://github.com/cah-john-ryan/expo-go-real-time-chat/blob/session-3-styling-the-landing-screen/expo-go-real-time-chat/app/index.tsx)
> 

Let's save the state of your work now that this session is done.

9. In Visual Studio Code, open a new command prompt window which should automatically be displayed in the bottom of your screen.
10. Copy the below commands and paste them into the command prompt window:
```
git add .
git commit -m "session-3-styling-the-landing-screen done"
```

### SESSION COMPLETE

Up next -> [Session 4 - Global Constants and Colors](session-4-global-constants.md)
