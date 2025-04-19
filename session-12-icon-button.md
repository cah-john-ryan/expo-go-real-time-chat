# Real-time chat with Expo Go and React Native
## Session 12 - Using icons in Expo Go and creating a common IconButton component

In this session we are going to leverage the vector icons that are provided by Expo Go.  Every application I have worked on has had the need to icons to be used.  Expo Go has made it very easy to do that with their built-in "@expo/vector-icons" library. 

https://docs.expo.dev/guides/icons/

The Expo Go `<FontAwesome/>` component available from this library uses icons found at:
https://icons.expo.fyi/Index (FILTER ON "FontAwesome")

In this session, we are going to build a common "IconButton" component and use it to replace our Submit button at the bottom of the chat screen.

1. Create a file called `app/components/IconButton.tsx`.

2. In that file paste the below content:
```tsx
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Constants from "@/app/constants";

type Props = {
    // We are going to focus on using just the FontAwesome icons in this component
    name: keyof typeof FontAwesome.glyphMap;  
    onPress: () => void;
    style?: ViewStyle;
};
export default function IconButton({ name, onPress, style }: Readonly<Props>) {
    return (
        <Pressable
            // This manner of setting the style lets both our styles.container styling
            // be applied and then also an external styling that might be desired.
            style={[styles.container, style]}
            onPress={onPress}
        >
            <FontAwesome name={name} size={18} color={Constants.colors.primaryColorText}/>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 35,
        height: 35,
        borderRadius: 17,
        backgroundColor: Constants.colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
});
```

3. Now to see how it looks.  Open the `/app/[userKey]/chat.tsx` file.

4. Replace this `<Pressable/>` submit button:
```tsx
<Pressable
    style={styles.submitNewMessageButton}
    onPress={submitNewMessage}
>
    <Text style={styles.submitNewMessageButtonText}>
        Submit
    </Text>
</Pressable>
```

With this:
```tsx
<IconButton 
    name="arrow-up"
    onPress={submitNewMessage}
/>
```

And remove section from the `styles` section as it is no longer needed:
```tsx
submitNewMessageButton: {
    borderRadius: Constants.layout.borderRadius,
    padding: Constants.layout.padding,
    alignItems: "center",
    backgroundColor: Constants.colors.primaryColor
},
submitNewMessageButtonText: {
    color: Constants.colors.primaryColorText
}
```

Check out the chat screen now.  You should now see a round button with an up arrow for an icon instead of the submit button from before.

Let's go a bit further.

5. Update the `<IconButton/>` used here from this:
```tsx
<IconButton 
    name="arrow-up"
    onPress={submitNewMessage}
/>
```

To this:
```tsx
{newMessage && (
    <IconButton 
        name="arrow-up"
        onPress={submitNewMessage}
    />
)}
```

This should make the submit IconButton appear only when there is a new message being entered.

> [!NOTE] 
> You can compare your changes here against the below file for reference if you are running into any challenges in completing this session.
>
> [chat.tsx file for session 12](https://github.com/cah-john-ryan/expo-go-real-time-chat/blob/session-12-icon-button/expo-go-real-time-chat/app/%5BuserKey%5D/chat.tsx)

### SESSION COMPLETE

Up next -> [Session 13 - Post a photo](session-13-post-a-photo.md)
