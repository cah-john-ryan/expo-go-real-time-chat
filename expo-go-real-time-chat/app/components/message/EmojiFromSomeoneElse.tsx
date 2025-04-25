import { StyleSheet, View } from "react-native";
import UserData from "@/app/objects/UserData";
import MessageObject from "@/app/objects/MessageObject";
import Text from "@/app/components/generic/Text";

type Props = {
    message: MessageObject;
    userDataForMessage: UserData | undefined;
};
export default function Message({message, userDataForMessage}: Readonly<Props>) {
    return (
        <View style={styles.container}>
            <View style={styles.messageContainer}>
                <Text>{userDataForMessage?.userName}</Text>
                <Text style={styles.messageText}>{message.messageText}</Text>
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
    messageText: {
        fontSize: 36,
    }
});