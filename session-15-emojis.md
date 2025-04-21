# Real-time chat with Expo Go and React Native
## Session 15 - Emojis

If you posted a message with just an emoji of a thumbs up it will appear in a message bubble at the same size of other messages.

In this session, we are going to have the application change the presentation of messages that are only containing emojis.  We will remove the message bubble, and we will increase the size of the emojis so that they are more visible.

1. Create a file called `app/components/message/EmojiFromSelf.tsx`.

2. Apply these changes to the file:
```tsx
import { StyleSheet, Text, View } from "react-native";
import MessageObject from "@/app/objects/MessageObject";

type Props = {
    message: MessageObject;
};
export default function MessageFromSelf({message}: Readonly<Props>) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.messageText}>{message.messageText}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row-reverse",
    },
    messageText: {
        fontSize: 36,
    }
});
```

1. Create a file called `app/components/message/EmojiFromSomeoneElse.tsx`.

2. Apply these changes to the file:
```tsx
import { StyleSheet, Text, View } from "react-native";
import UserData from "@/app/objects/UserData";
import MessageObject from "@/app/objects/MessageObject";

type Props = {
    message: MessageObject;
    userDataForMessage: UserData | undefined;
};
export default function Message({message, userDataForMessage}: Readonly<Props>) {
    return (
        <View style={styles.container}>
            <View style={styles.messageContainer}>
                <Text>{userDataForMessage?.userName}</Text>
                <Text style={styles.messageText}>{message.messageText}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
    },
    messageContainer: {
        flexBasis: "90%"
    },
    messageText: {
        fontSize: 36,
    }
});
```

3. Edit the `app/components/Message.tsx` file.
```tsx
import MessageFromSomeoneElse from "@/app/components/message/MessageFromSomeoneElse";
import MessageFromSelf from "@/app/components/message/MessageFromSelf";
import UserData from "@/app/objects/UserData";
import MessageObject from "@/app/objects/MessageObject";
import MessageType from "@/app/objects/MessageType";
import ImageFromSelf from "@/app/components/message/ImageFromSelf";
import ImageFromSomeoneElse from "@/app/components/message/ImageFromSomeoneElse";

// Add these new imports
import EmojiFromSelf from "@/app/components/message/EmojiFromSelf";
import EmojiFromSomeoneElse from "@/app/components/message/EmojiFromSomeoneElse";

// Add this new function to identify message only containing emojis
function containsOnlyEmojis(str: string) {
    return /^(\p{Extended_Pictographic})+$/u.test(str);
}

type MessageHandlerProps = {
    userDataForSelf: UserData;
    message: MessageObject;
    userDataForMessage: UserData | undefined;
}
export default function Message({userDataForSelf, message, userDataForMessage}: Readonly<MessageHandlerProps>) {
    // Add this new conditional block that will inject `<EmojiFromSelf/> when appropriate
    if (message.who === userDataForSelf.key && message.messageType === MessageType.Text && containsOnlyEmojis(message.messageText)) {
        return (
            <EmojiFromSelf message={message} />
        );
    } 
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
    // Add this new conditional block that will inject `<EmojiFromSomeoneElse/> when appropriate
    if (message.who !== userDataForSelf.key && message.messageType === MessageType.Text && containsOnlyEmojis(message.messageText)) {
        return (
            <EmojiFromSomeoneElse
                message={message}
                userDataForMessage={userDataForMessage}
            />
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

> [!NOTE] 
> You can compare your changes here against the below file for reference if you are running into any challenges in completing this session.
>
> [EmojiFromSelf.tsx file for session 15](https://github.com/cah-john-ryan/expo-go-real-time-chat/blob/session-15-emojis/expo-go-real-time-chat/app/components/message/EmojiFromSelf.tsx)
>
> [EmojiFromSomeoneElse.tsx file for session 15](https://github.com/cah-john-ryan/expo-go-real-time-chat/blob/session-15-emojis/expo-go-real-time-chat/app/components/message/EmojiFromSomeoneElse.tsx)
>
> [Message.tsx file for session 14](https://github.com/cah-john-ryan/expo-go-real-time-chat/blob/session-15-emojis/expo-go-real-time-chat/app/components/Message.tsx)

### SESSION COMPLETE