# Real-time chat with Expo Go and React Native
## Session 11 - Add the ability to embed links for other applications and email addresses in messages

Quite often people share email addresses and links to other applications in their messages.  In this short lesson we are going to make this possible in our chat application.

It is important to emphasis here that when it comes to features that are often needed in an appliction there are often publicly available libraries you can find to help you in accomplishing the same task.

I found a popular library below from Josh Swan that looks like a good candidate to use in making this feature in our chat.

https://github.com/joshswan/react-native-autolink


1. In Visual Studio Code, open a new command prompt window which should automatically be displayed in the bottom of your screen.

2. From the command prompt window, enter the below command to run this application in it's initial state:
```
npm install react-native-autolink
```

3. Open the `app/components/MessageFromSelf.tsx` file.

4. Update from this:
```tsx
export default function MessageFromSelf({message}: Readonly<Props>) {
    return (
        <View>
            <Text style={styles.messageTextContainer}>
                {message.messageText}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row-reverse",
    },
    messageContainer: {
        flexBasis: "90%"
    },
    messageTextContainer: {
        borderRadius: Constants.layout.borderRadius,
        padding: Constants.layout.padding,
        marginBottom: Constants.layout.padding,
        backgroundColor: Constants.colors.primaryColor,
        color: Constants.colors.primaryColorText
    },
});
```
To this:
```tsx
export default function MessageFromSelf({message}: Readonly<Props>) {
    return (
        <View>
            <View style={styles.messageTextContainer}>
                {/* Adding the Autolink component to handle this complexity */}
                <Autolink 
                    style={styles.messageText}
                    text={message.messageText}
                    email
                    url
                    phone="sms"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row-reverse",
    },
    messageContainer: {
        flexBasis: "90%"
    },
    messageTextContainer: {
        borderRadius: Constants.layout.borderRadius,
        padding: Constants.layout.padding,
        marginBottom: Constants.layout.padding,
        backgroundColor: Constants.colors.primaryColor
    },
    messageText: {
        // Migrating this font color from messageTextContainer to where it is now passed into the Autolink component as that is where the text resides
        color: Constants.colors.primaryColorText
    }
});
```

5. Open the `/app/components/MessageFromSomeoneElse.tsx` file.

6. Update from this:
```tsx
export default function MessageFromSomeoneElse({message, userDataForMessage}: Readonly<Props>) {
    return (
        <View>
            <Text>{userDataForMessage?.userName}</Text>
            <Text style={styles.messageTextContainer}>
                {message.messageText}
            </Text>
        </View>
    );
}
```

To this:
```tsx
export default function MessageFromSomeoneElse({message, userDataForMessage}: Readonly<Props>) {
    return (
        <View>
            <Text>{userDataForMessage?.userName}</Text>
            <View style={styles.messageTextContainer}>
                {/* Adding the Autolink component to handle this complexity */}
                <Autolink 
                    text={message.messageText}
                    email
                    url
                    phone="sms"
                />
            </View>
        </View>
    );
}
```

Recheck the app and you should see links for apps and email addresses appear automatically in message on the screen.

If you look at the website for this `<AutoLink/>` component, there are several other types of links it can support.  Feel free to add any others you want to try out.

> [!NOTE] 
> You can compare your changes here against the below file for reference if you are running into any challenges in completing this session.
>
> [MessageFromSelf.ts file for session 11](https://github.com/cah-john-ryan/expo-go-real-time-chat/blob/session-11-messages-with-links/expo-go-real-time-chat/app/components/MessageFromSelf.tsx)
>
> [MessageFromSomeoneElse.ts file for session 11](https://github.com/cah-john-ryan/expo-go-real-time-chat/blob/session-11-messages-with-links/expo-go-real-time-chat/app/components/MessageFromSomeoneElse.tsx)

### SESSION COMPLETE