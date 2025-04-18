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
```

To this:
```tsx
export default function MessageFromSelf({message}: Readonly<Props>) {
    return (
        <View>
            <View style={styles.messageTextContainer}>
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

### SESSION COMPLETE