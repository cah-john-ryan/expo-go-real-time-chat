# Real-time chat with Expo Go and React Native
## Session 11 - Add the ability to embed links for other applications and email addresses in messages

Quite often people share email addresses and links to other applications in their messages.  In this short lesson we are going to make this possible in our chat application.

It is important to emphasis here that when it comes to features that are often needed in an appliction there are often publicly available libraries you can find to help you in accomplishing the same task.

I found a popular library below from Josh Swan that looks like a good candidate to use in making this feature in our chat.

https://github.com/joshswan/react-native-autolink

1. In Visual Studio Code, open the command prompt window at the bottom of your screen.

2. From the command prompt window, enter the below command:
```
npm install react-native-autolink
```

3. Open the `app/components/message/MessageFromSelf.tsx` file.

4. Update to this:
```tsx
// Add this to the import section at the top
import Autolink from "react-native-autolink";

// The new content for messageContainer
<View style={styles.messageContainer}>
    <Autolink 
        style={styles.messageTextContainer}
        text={message.messageText}
        email
        url
        phone="sms"
    />
</View>
```

5. Open the `/app/components/message/MessageFromSomeoneElse.tsx` file.

6. Update to this:
```tsx
// Add this to the import section at the top
import Autolink from "react-native-autolink";

// The new content for messageContainer
<View style={styles.messageContainer}>
    <Text>{userDataForMessage?.userName}</Text>
    <Autolink 
        style={styles.messageTextContainer}
        text={message.messageText}
        email
        url
        phone="sms"
    />
</View>
```

Recheck the app and you should see links for apps and email addresses appear automatically in message on the screen.

If you look at the website for this `<AutoLink/>` component, there are several other types of links it can support.  Feel free to add any others you want to try out.

> [!NOTE] 
> You can compare your changes here against the below file for reference if you are running into any challenges in completing this session.
>
> [MessageFromSelf.ts file for session 11](https://github.com/cah-john-ryan/expo-go-real-time-chat/blob/session-11-messages-with-links/expo-go-real-time-chat/app/components/MessageFromSelf.tsx)
>
> [MessageFromSomeoneElse.ts file for session 11](https://github.com/cah-john-ryan/expo-go-real-time-chat/blob/session-11-messages-with-links/expo-go-real-time-chat/app/components/MessageFromSomeoneElse.tsx)

7. In Visual Studio Code, open a new command prompt window which should automatically be displayed in the bottom of your screen.
8. Copy the below commands and paste them into the command prompt window:
```
git add .
git commit -m "session-11-messages-with-links done"
```
9. Submit a message in the chat stating that you have completed this session.

### SESSION COMPLETE

Up next -> [Session 12 - Using icons in Expo Go and creating a common IconButton component](session-12-icon-button.md)
