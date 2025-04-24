import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import {useLocalSearchParams} from "expo-router";
import Constants from "@/app/constants";
// Add this import
import useFirebaseMessages from "@/app/hooks/useFirebaseMessages";
import { useState } from "react";
import MessageType from "@/app/objects/MessageType";
import Message from "@/app/components/Message";
import useFirebaseUserData from "@/app/hooks/useFirebaseUserData";

export default function Chat() {
    const [ newMessage, setNewMessage ] = useState<string>("");
    const { messages, storeMessage } = useFirebaseMessages();
    const { userKey } = useLocalSearchParams();
    const { userDataListing } = useFirebaseUserData(userKey);

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

    return (
        <View style={styles.container}>
            <View style={styles.messageListing}>

                {/* This is the React syntax to use to iterate through each message and render them individually */}
                {/* Also, each rendered element in an array needs a key in order to be uniquely identifiable in React. */}
                {/* See: https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key */}

                {/* One last note, the array being provided is in reverse order where the most recent message comes first. */}
                {/* We will have a better way to manage this than the implementation below but for now this will be how it will function. */}
                {messages.toReversed().map(message => (
                    <View key={message.key}>
                        <Message
                            message={message}
                            userDataForMessage={userDataListing.get(message.who)}
                        />
                    </View>
                ))}

            </View>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    messageListing: {
        flex: 1,
        paddingHorizontal: Constants.layout.padding,
        gap: Constants.layout.padding,
    },
    footer: {
        padding: Constants.layout.padding,
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
});