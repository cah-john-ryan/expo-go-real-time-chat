# Real-time chat with Expo Go and React Native
## Session 8 - Message Presentation

Right now it is very difficult to differentiate in who is sending each of the messages shown in the chat.  

Let's update this so that this is displayed with each message. However, there is enough complexity with this that it is worth keeping it in its own file.

1. Open the `/app/constants.ts` file.

2. Remove the `messageListingBackgroundColor` property from the `colors` section.

3. Add a `messageBackgroundColor` property to the `colors` section:
```ts
messageBackgroundColor: '#CED4DA', // #CED4DA
```

4. From the `/app` folder, create a new folder named "components".

5. From the `/app/components` folder, create a new file called "Message.tsx".

6. Paste this into the new `/app/components/Message.tsx` file.
```tsx
import { StyleSheet, Text, View } from "react-native";
import UserData from "@/app/objects/UserData";
import MessageObject from "@/app/objects/MessageObject";
import Constants from "@/app/constants";

type Props = {
    message: MessageObject;
    userDataForMessage: UserData | undefined;
};
export default function Message({message, userDataForMessage}: Readonly<Props>) {
    return (
        <View style={styles.container}>
            <View style={styles.messageContainer}>
                <Text>{userDataForMessage?.userName}</Text>
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
        flexDirection: "row",
    },
    messageContainer: {
        flexBasis: "90%"
    },
    messageTextContainer: {
        borderRadius: Constants.layout.borderRadius,
        padding: Constants.layout.padding,
        backgroundColor: Constants.colors.messageBackgroundColor,
    },
});
```
Having this in its own file should help us manage some of this complexity without it mixing in with what we have written for the chat screen.

7. Open the `/app/[userKey]/chat.tsx` file.

8. Update the below content from this:
```tsx
// Add this to the imports section at the top of the file.
import useFirebaseUserData from "@/app/hooks/useFirebaseUserData";
import Message from "@/app/components/Message";

// Add this just below the Chat() function declaration
const { userDataListing } = useFirebaseUserData(userKey);

// Now modify the messages being rendered to use the new component.
{messages.toReversed().map(message => (
    <View key={message.key}>
        <Message
            message={message}
            userDataForMessage={userDataListing.get(message.who)}
        />
    </View>
))}

// Lastly, the styling adjustments.
messageListing: {
    flex: 1,
    paddingHorizontal: Constants.layout.padding,

    // Delete this line as it is no longer needed.
    backgroundColor: Constants.colors.messageListingBackgroundColor,

    gap: Constants.layout.padding,
},

// Delete this entire message section as this is now handled in the component.
message: {
    borderWidth: 1,
    borderRadius: Constants.layout.borderRadius,
    padding: Constants.layout.padding,
},
```

You should now see who sent what message in the message listing.

> [!NOTE] 
> You can compare your changes here against the below file for reference if you are running into any challenges in completing this session.
>
> [constants.ts file for session 8](https://github.com/cah-john-ryan/expo-go-real-time-chat/blob/session-8-message-presentation/expo-go-real-time-chat/app/constants.ts)
>
> [Message.tsx file for session 8](https://github.com/cah-john-ryan/expo-go-real-time-chat/blob/session-8-message-presentation/expo-go-real-time-chat/app/components/Message.tsx)
>
> [chat.tsx file for session 8](https://github.com/cah-john-ryan/expo-go-real-time-chat/blob/session-8-message-presentation/expo-go-real-time-chat/app/%5BuserKey%5D/chat.tsx)

### SESSION COMPLETE

Up next -> [Session 9 - Message Presentation of your own messages](session-9-message-presentation-of-yourself.md)