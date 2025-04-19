# Real-time chat with Expo Go and React Native
## Session 14 - View photo

Now that we are able to post messages with photos we need to update our chat application to properly display them.

To do this, we will need to copy both of the below components we already have into new files.

1. Make a copy of the `app/components/MessageFromSelf.tsx` file.  Call the new file `app/components/ImageFromSelf.tsx`.

2. Make a copy of the `app/components/MessageFromSomeoneElse.tsx` file.  Call the new file `app/components/ImageFromSomeoneElse.tsx`.

3. Open the file `app/components/ImageFromSelf.tsx`.
```tsx
// Add Image to this import
import { Image, StyleSheet, View } from "react-native";

// Remove this as we won't need it here
import Autolink from 'react-native-autolink';
```

Replace this:
```tsx
<View style={styles.messageContainer}>
    <View style={styles.messageTextContainer}>
        <Autolink 
            style={styles.messageText}
            text={message.messageText}
            email
            url
            phone="sms"
        />
    </View>
</View>
```

With this:
```tsx
<View style={styles.messageContainer}>
    <Image source={{uri: message.messageText}} style={[styles.messageTextContainer, styles.imageContainer]}/>
</View>
```

And lastly add this to the `styles` section at the bottom:
```tsx
imageContainer: {
    height: 200,
}
```

4. Open the file `app/components/ImageFromSomeoneElse.tsx`.
```tsx
// Add Image to this import
import { Image, StyleSheet, View } from "react-native";

// Remove this as we won't need it here
import Autolink from 'react-native-autolink';
```

Replace this:
```tsx
<View style={styles.messageContainer}>
    <Text>{userDataForMessage?.userName}</Text>
    <View style={styles.messageTextContainer}>
        <Autolink 
            text={message.messageText}
            email
            url
            phone="sms"
        />
    </View>
</View>
```

With this:
```tsx
<View style={styles.messageContainer}>
    <Text>{userDataForMessage?.userName}</Text>
    <Image source={{uri: message.messageText}} style={[styles.messageTextContainer, styles.imageContainer]}/>
</View>
```

And lastly add this to the `styles` section at the bottom:
```tsx
imageContainer: {
    height: 200,
}
```

That should do it for the new image components.
Now we need to update the generic `<Message/>` component to render the right type of message in the right circumstance.

5. Edit the `app/components/Message.tsx` file.
```tsx
// Add these imports
import MessageType from "@/app/objects/MessageType";
import ImageFromSelf from "@/app/components/ImageFromSelf";
import ImageFromSomeoneElse from "@/app/components/ImageFromSomeoneElse";
```

And then update the whole `Message()` function:
```tsx
export default function Message({userDataForSelf, message, userDataForMessage}: Readonly<MessageHandlerProps>) {
    if (message.who === userDataForSelf.key && message.messageType === MessageType.Text) {
        return (
            <MessageFromSelf message={message} />
        );
    } 
    if (message.who === userDataForSelf.key && message.messageType === MessageType.Image) {
        return (
            <ImageFromSelf message={message} />
        );
    }
    if (message.who !== userDataForSelf.key && message.messageType === MessageType.Text) {
        return (
            <MessageFromSomeoneElse
                message={message}
                userDataForMessage={userDataForMessage}
            />
        );
    } 
    if (message.who !== userDataForSelf.key && message.messageType === MessageType.Image) {
        return (
            <ImageFromSomeoneElse
                message={message}
                userDataForMessage={userDataForMessage}
            />
        );
    } 
}
```