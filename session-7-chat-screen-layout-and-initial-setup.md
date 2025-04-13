# Real-time chat with Expo Go and React Native
## Session 7 - Setup chat screen layout and initial setup

In this session we will take the barebones chat screen we have and layout the sections that need to be put in place for our content. 

The chat screen will be split into 3 sections.
- A header (already done and provided by Expo Go's router).
- A footer at the bottom where someone can write a new message.
    - A `<TextInput/>` element to accept the new message.
    - A `<Pressable/>` button to the right of the new message to submit it to the chat.
- A message listing that will take up the remainder of the screen.
    - A `<Text/>` element for each message present.

1. Open the `/app/constants.ts` file.

2. Add this line to the `colors` section.
```ts
messageListingBackgroundColor: '#DEE2E6', // #DEE2E6
```

3. Open the `/app/[userKey]/chat.tsx` file.

4. Update the below content from this:
```tsx
import { Text, View } from "react-native";
import {useLocalSearchParams} from "expo-router";

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
To this:
```tsx
import { StyleSheet, Text, View } from "react-native";
import {useLocalSearchParams} from "expo-router";
import Constants from "@/app/constants";

export default function Chat() {
    const { userKey } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <View style={styles.messageListing}>
                <Text>This will contain the list of messages for the chat.</Text>
            </View>
            <View style={styles.footer}>
                <Text>This will contain the input to create new messages.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Fill up the whole screen
    },
    messageListing: {
        flex: 1, // Fill up the remaining height of the screen
        padding: Constants.layout.padding,
        backgroundColor: Constants.colors.messageListingBackgroundColor
    },
    footer: {
        // No explicit height through flex or otherwise.
        // This component will take up only the space it needs. 
        padding: Constants.layout.padding,
    }
});
```

5. Now, let's have the message listing actually show messages that are in Firebase.
```tsx
import { StyleSheet, Text, View } from "react-native";
import {useLocalSearchParams} from "expo-router";
import Constants from "@/app/constants";
import useFirebaseMessages from "@/app/hooks/useFirebaseMessages";

export default function Chat() {
    // The pre-built React hook I have made available where we will work with the messages from our chat.
    const { messages } = useFirebaseMessages();
    const { userKey } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <View style={styles.messageListing}>

                {/* This is the React syntax to use to iterate through each message and render them individually */}
                {/* Also, each rendered element in an array needs a key in order to be uniquely identifiable in React. */}
                {/* See: https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key */}

                {/* One last note, the array being provided is in reverse order where the most recent message comes first. */}
                {/* We will have a better way to manage this than the implementation below but for now this will be how it will function. */}
                {messages.toReversed().map(message => (
                    <View key={message.key} style={styles.message}>
                        <Text>{message.messageText}</Text>
                    </View>
                ))}

            </View>
            <View style={styles.footer}>
                <Text>This will contain the input to create new messages.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Fill up the whole screen
    },
    messageListing: {
        flex: 1, // Fill up the remaining height of the screen
        padding: Constants.layout.padding,
        backgroundColor: Constants.colors.messageListingBackgroundColor,
        gap: Constants.layout.padding,
    },
    message: {
        borderWidth: 1,
        borderRadius: Constants.layout.borderRadius,
        padding: Constants.layout.padding,
    },
    footer: {
        // No explicit height through flex or otherwise.
        // This component will take up only the space it needs. 
        padding: Constants.layout.padding,
    }
});
```

6. Now to setup the input we want to provide at the bottom of the screen for new messages.
Add the below line to the top of this component.
```tsx
 const [ newMessage, setNewMessage ] = useState<string>("");
```

7. Now, update the footer with the below content.  This should render an input at the bottom of the screen where you can type a new message.
```tsx
// Add this to replace the footer in the template of the component.
<View style={styles.footer}>
    <TextInput
        style={styles.newMessageInput}
        value={newMessage}
        onChangeText={(text) => {
            setNewMessage(text);
        }}
        placeholder={"Aa"}
        placeholderTextColor={"grey"}
    />
</View>

...

// In the styles section at the bottom of the file.
newMessageInput: {
    borderWidth: 1,
    borderRadius: Constants.layout.borderRadius,
    padding: Constants.layout.padding,
}
```

8. Nearly everything is setup but actually submitting a new message to the chat.  To do this, let's add a submit button to the bottom of the screen next to the new message input.

```tsx
// Logic at the top of the component to process the 
const { messages, storeMessage } = useFirebaseMessages();
const [ newMessage, setNewMessage ] = useState<string>("");
const { userKey } = useLocalSearchParams();

const submitNewMessage = () => {
    // Only submit a message if one is entered.
    if (newMessage) { 
        // Some logic to handle how Expo provides the userKey.  Don't pay this much mind.
        const parsedUserKey = Array.isArray(userKey) ? userKey[0] : userKey;

        // A storeMethod() I have pre-built that will handle sending this new messag to Firebase.
        storeMessage(parsedUserKey, newMessage, MessageType.Text);

        setNewMessage(""); // Clear the input for the next new message to be entered.
    }
};

// In the template, add a new <Pressable/> button to submit new messages.
<View style={styles.footer}>
    <TextInput
        style={styles.newMessageInput}
        value={newMessage}
        onChangeText={(text) => {
            setNewMessage(text);
        }}
        placeholder={"Aa"}
        placeholderTextColor={"grey"}
    />

    <Pressable
        style={styles.submitNewMessageButton}
        onPress={submitNewMessage}
    >
        <Text style={styles.submitNewMessageButtonText}>
            Submit
        </Text>
    </Pressable>
</View>

// Lastly, some styling to present this on the screen
footer: {
    padding: Constants.layout.padding,

    // This part is new for the footer and uses flexbox to layout the
    // input and button alongside one another with a standard gap between them.
    display: "flex",
    flexDirection: "row",
    gap: Constants.layout.padding
},
newMessageInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: Constants.layout.borderRadius,
    padding: Constants.layout.padding,
},
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

...

Now for the real test to see if everything works.

9. Enter a new message into the input at the bottom of the screen stating who you are.

10. Click the submit button.

Did you see your new message appear in the message listing?

#### 🎉 Congratulations! 🎉
You have completed a milestone for today.

> [!NOTE] 
> You can compare your changes here against the below file for reference if you are running into any challenges in completing this session.
>
> [chat.tsx file for session 7](https://github.com/cah-john-ryan/expo-go-real-time-chat/blob/session-7-chat-screen-layout-and-initial-setup/expo-go-real-time-chat/app/%5BuserKey%5D/chat.tsx)

### SESSION COMPLETE