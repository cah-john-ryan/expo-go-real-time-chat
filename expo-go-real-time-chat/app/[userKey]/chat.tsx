import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import {useLocalSearchParams} from "expo-router";
import Constants from "@/app/constants";
// Add this import
import useFirebaseMessages from "@/app/hooks/useFirebaseMessages";
import { useState } from "react";
import MessageType from "@/app/objects/MessageType";
import Message from "@/app/components/Message";
import useFirebaseUserData from "@/app/hooks/useFirebaseUserData";
import KeyboardAvoidingContainer from "../components/KeyboardAvoidingContainer";

export default function Chat() {
    const [ newMessage, setNewMessage ] = useState<string>("");
    const { messages, storeMessage } = useFirebaseMessages();
    const { userKey } = useLocalSearchParams();
    const { userDataForSelf, userDataListing } = useFirebaseUserData(userKey);

    // And add this as well to handle rendering the data we are dependant on is not yet defined
    if (!messages || !userDataForSelf) {
        return (
            <View>
                <Text>Data loading...</Text>
            </View>
        );
    }

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
        <KeyboardAvoidingContainer>
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
        </KeyboardAvoidingContainer>
    );
}

const styles = StyleSheet.create({
    messageListing: {
        paddingHorizontal: Constants.layout.padding,
    },
    footer: {
        padding: Constants.layout.padding,
        display: "flex",
        flexDirection: "row",
        gap: Constants.layout.padding,
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