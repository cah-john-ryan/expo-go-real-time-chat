import { StyleSheet, View } from "react-native";
import MessageObject from "@/app/objects/MessageObject";
import Constants from "@/app/constants";
import Autolink from 'react-native-autolink';
import { useThemeColor } from "@/app/hooks/useThemeColor";

type Props = {
    message: MessageObject;
};
export default function MessageFromSelf({message}: Readonly<Props>) {
    const backgroundColor = useThemeColor('primaryColor');
    const color = useThemeColor('primaryColorText');
    return (
        <View style={styles.container}>
            <View style={styles.messageContainer}>
                <Autolink 
                    style={[styles.messageTextContainer, {backgroundColor, color}]}
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
        flexDirection: "row-reverse", // This will make messages from self appear on the right
        marginBottom: Constants.layout.padding,
    },
    messageContainer: {
        flexBasis: "90%"
    },
    messageTextContainer: {
        borderRadius: Constants.layout.borderRadius,
        padding: Constants.layout.padding,
    },
});