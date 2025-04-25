import { StyleSheet, Text, View } from "react-native";
import MessageObject from "@/app/objects/MessageObject";

type Props = {
    message: MessageObject;
};
export default function MessageFromSelf({message}: Readonly<Props>) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.messageText}>{message.messageText}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row-reverse",
    },
    messageText: {
        fontSize: 36,
    }
});