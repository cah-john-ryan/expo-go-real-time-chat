# Real-time chat with Expo Go and React Native
## Session 14 - View photos

Now that we are able to post messages with photos we need to update our chat application to properly display them.

To do this, we will need to copy both of the below components we already have into new files.

1. Make a copy of the `app/components/message/MessageFromSelf.tsx` file.  Call the new file `app/components/message/ImageFromSelf.tsx`.

2. Make a copy of the `app/components/message/MessageFromSomeoneElse.tsx` file.  Call the new file `app/components/message/ImageFromSomeoneElse.tsx`.

3. Open the file `app/components/ImageFromSelf.tsx`.
```tsx
// Add Image to this import
import { Image, StyleSheet, View } from "react-native";

// Remove this as we won't need it here
import Autolink from 'react-native-autolink';
```

Replace the "messageContainer" `<View/>` element with this:
```tsx
<View style={styles.messageContainer}>
    <Image source={{uri: message.messageText}} style={[styles.messageTextContainer, styles.imageContainer]}/>
</View>
```

And lastly add this to the `styles` section at the bottom:
```tsx
imageContainer: {
    height: 200,
},
```

4. Open the file `app/components/ImageFromSomeoneElse.tsx`.
```tsx
// Add Image to this import
import { Image, StyleSheet, Text, View } from "react-native";

// Remove this as we won't need it here
import Autolink from 'react-native-autolink';
```

Replace the "messageContainer" `<View/>` element with this:
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
},
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

Now, when you look at the chat screen you should be able to see the photos that everyone posted.

#### 🎉 Congratulations! 🎉
Completing these last two sessions is quite and accomplishment.  I am impressed!

> [!NOTE] 
> You can compare your changes here against the below file for reference if you are running into any challenges in completing this session.
>
> [ImageFromSelf.tsx file for session 14](https://github.com/cah-john-ryan/expo-go-real-time-chat/blob/session-14-view-photos/expo-go-real-time-chat/app/components/message/ImageFromSelf.tsx)
>
> [ImageFromSomeoneElse.tsx file for session 14](https://github.com/cah-john-ryan/expo-go-real-time-chat/blob/session-14-view-photos/expo-go-real-time-chat/app/components/message/ImageFromSomeoneElse.tsx)
>
> [Message.tsx file for session 14](https://github.com/cah-john-ryan/expo-go-real-time-chat/blob/session-14-view-photos/expo-go-real-time-chat/app/components/Message.tsx)

### SESSION COMPLETE

Up next -> [Session 15 - Emojis](session-15-emojis.md)
