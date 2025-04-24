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