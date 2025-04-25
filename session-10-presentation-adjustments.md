# Real-time chat with Expo Go and React Native
## Session 10 - Presentation adjustments with the help of React Native

If you the conversation in the chat has grown larger than your screen or if you have tried running this application on your phone then you will notice that there are some presentation concerns.  There is no ability to scroll/swipe up and down through the chat conversation and the messages overflow and overlap the new message input.

We are going to let React Native solve this issue for us by using their `<FlatList/>` component.

https://reactnative.dev/docs/flatlist

1. Open the `/app/[userKey]/chat.tsx` file.

2. Replace this:
```tsx
<View style={styles.messageListing}>
    {messages.toReversed().map(message => (
        <View key={message.key}>
            <Message 
                userDataForSelf={userDataForSelf}
                message={message}
                userDataForMessage={userDataListing.get(message.who)}
            />
        </View>
    ))}
</View>
```
With this:
```tsx
<FlatList
    inverted // inverting this makes the Flatlist automatically scroll to the bottom
    style={styles.messageListing}
    data={messages}
    keyExtractor={item => item.key}
    renderItem={({item}) => 
        <Message 
            userDataForSelf={userDataForSelf}
            message={item}
            userDataForMessage={userDataListing.get(item?.who)}
        />
    }
/>
```

3. And in the `styles` section at the bottom we will need to remove the `gap` styling there as `<FlatList/>` will not honor this property.  We will need to add the padding between messages in those components directly.

From this:
```tsx
messageListing: {
    flex: 1,
    paddingHorizontal: Constants.layout.padding,
    gap: Constants.layout.padding,
},
```
To this:
```tsx
messageListing: {
    paddingHorizontal: Constants.layout.padding,
},
```

4. Open both the `/app/components/MessageFromSelf.tsx` and the `/app/components/MessageFromSomeoneElse.tsx` components.  Add the below line to their styling:
```tsx
    // inside the "container" styling
    marginBottom: Constants.layout.padding,
```

Now the chat conversation should be displaying properly when content runs off the screen and instead should be scrollable.

5. If you open this application on your phone, you will notice that when touching the new message input, the software keyboard appears and hides the bottom half of the screen. To address this we will create a new component that uses React Native's `<KeyboardAvoidingView/>` component.  

https://reactnative.dev/docs/keyboardavoidingview

We will also be bringing in React Native's <SafeAreaView/> component to address some cropping issues for what we have displayed at the edges of our screen.

https://reactnative.dev/docs/safeareaview

6. Create a file named `/app/components/KeyboardAvoidingContainer.tsx`.

7. In that file, paste the below contents:
```tsx
import { SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useHeaderHeight } from "@react-navigation/elements";
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{}>;
export default function KeyboardAvoidingContainer({children}: Readonly<Props>) {
    return (
        <SafeAreaView style={{flex: 1}}>
            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={useHeaderHeight()}
            >
                {children}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
```

8. Now, open the `/app/[userKey]/chat.tsx` file.  We will now use this new `<KeyboardAvoidingContainer/>` we have created.

Replace this:
```tsx
    return (
        <View style={styles.container}>

        ...

        </View>
    );
```

With this:
```tsx
    return (
        <KeyboardAvoidingContainer>

        ...

        </KeyboardAvoidingContainer>
    );
```

9. And in the `styling` section remove this code:
```tsx
    container: {
        flex: 1,
    },
```

Now these display issues should be resolved and we can add more features to this application.

> [!NOTE] 
> You can compare your changes here against the below file for reference if you are running into any challenges in completing this session.
>
> [chat.ts file for session 10](https://github.com/cah-john-ryan/expo-go-real-time-chat/blob/session-10-presentation-adjustments/expo-go-real-time-chat/app/%5BuserKey%5D/chat.tsx)

### SESSION COMPLETE

Up next -> [Session 11 - Add the ability to embed links for other applications and email addresses in messages](session-11-messages-with-links.md)
