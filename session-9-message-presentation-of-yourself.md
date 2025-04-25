# Real-time chat with Expo Go and React Native
## Session 9 - Message Presentation of your own messages

In most chat applications, your own messages are presented in a manner that is different than messages from other people.  In this session we will create another component called `MessageFromSelf.tsx` to make your own messages stand apart from how the more generic `Messages.tsx` component.

1. Create a new `/app/components/message` folder.

2. From the `/app/components` folder, rename the file "Message.tsx" to "MessageFromSomeoneElse.tsx".

3. From the `/app/components` folder, create a new file called "MessageFromSelf.tsx".

4. Move the "MessageFromSomeoneElse.tsx" & "MessageFromSelf.tsx" to the `/app/components/message` folder.

3. Paste this into the new `/app/components/message/MessageFromSelf.tsx` file.
```tsx
import { StyleSheet, Text, View } from "react-native";
import MessageObject from "@/app/objects/MessageObject";
import Constants from "@/app/constants";

type Props = {
    message: MessageObject;
};
export default function MessageFromSelf({message}: Readonly<Props>) {
    return (
        <View style={styles.container}>
            <View style={styles.messageContainer}>
                <Text style={styles.messageTextContainer}>
                    {message.messageText}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row-reverse", // This will make messages from self appear on the right
    },
    messageContainer: {
        flexBasis: "90%"
    },
    messageTextContainer: {
        borderRadius: Constants.layout.borderRadius,
        padding: Constants.layout.padding,

        // Have messages from self stand out using the primary color of our app.
        backgroundColor: Constants.colors.primaryColor, 
        color: Constants.colors.primaryColorText
    },
});
```

3. From the `/app/components` folder, create a new file called "Message.tsx".

4. Paste this into the new `/app/components/Message.tsx` file.
```tsx
import MessageFromSomeoneElse from "@/app/components/message/MessageFromSomeoneElse";
import MessageFromSelf from "@/app/components/message/MessageFromSelf";
import UserData from "@/app/objects/UserData";
import MessageObject from "@/app/objects/MessageObject";

type MessageHandlerProps = {
    userDataForSelf: UserData;
    message: MessageObject;
    userDataForMessage: UserData | undefined;
}
export default function Message({userDataForSelf, message, userDataForMessage}: Readonly<MessageHandlerProps>) {
    if (message.who === userDataForSelf?.key) {
        return (
            <MessageFromSelf message={message} />
        );
    } else {
        return (
            <MessageFromSomeoneElse
                message={message}
                userDataForMessage={userDataForMessage}
            />
        );
    }
}
```

4. Open the `/app/[userKey]/chat.tsx` file.

5. Update the below content as described:
```tsx
// Make sure that this is still imported at the top
import Message from "@/app/components/Message";

// *Adjust* this line which is found just below the Chat() function declaration
// You will be adding userDataForSelf here.
const { userDataForSelf, userDataListing } = useFirebaseUserData(userKey);

// And add this as well to handle rendering the data we are dependant on is not yet defined
if (!messages || !userDataForSelf) {
    return (
        <View>
            <Text>Data loading...</Text>
        </View>
    );
}

...

<Message 
    userDataForSelf={userDataForSelf} // Add this parameter
    message={message}
    userDataForMessage={userDataListing.get(message.who)}
/>
```

You should now see messages for yourself and messages for other people displayed clearly and differently from one another.

> [!NOTE] 
> You can compare your changes here against the below file for reference if you are running into any challenges in completing this session.
>
> [Message.ts file for session 9](https://github.com/cah-john-ryan/expo-go-real-time-chat/blob/session-9-message-presentation-of-yourself/expo-go-real-time-chat/app/components/Message.tsx)
>
> [MessageFromSelf.tsx file for session 9](https://github.com/cah-john-ryan/expo-go-real-time-chat/blob/session-9-message-presentation-of-yourself/expo-go-real-time-chat/app/components/MessageFromSelf.tsx)
>
> [MessageFromSomeoneElse.tsx file for session 9](https://github.com/cah-john-ryan/expo-go-real-time-chat/blob/session-9-message-presentation-of-yourself/expo-go-real-time-chat/app/components/MessageFromSomeoneElse.tsx)
>
> [chat.tsx file for session 9](https://github.com/cah-john-ryan/expo-go-real-time-chat/blob/session-9-message-presentation-of-yourself/expo-go-real-time-chat/app/%5BuserKey%5D/chat.tsx)


6. In Visual Studio Code, open a new command prompt window which should automatically be displayed in the bottom of your screen.
7. Copy the below commands and paste them into the command prompt window:
```
git add .
git commit -m "session-9-message-presentation-of-yourself done"
```

8. Submit a message in the chat stating that you have completed this session.  No need to add your name any longer, everyone should be able to tell automatically with the completion of this session.

### SESSION COMPLETE

Up next -> [Session 10 - Presentation adjustments with the help of React Native](session-10-presentation-adjustments.md)
