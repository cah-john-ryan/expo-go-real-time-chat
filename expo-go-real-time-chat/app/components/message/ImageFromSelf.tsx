import { Image, StyleSheet, View } from "react-native";
import MessageObject from "@/app/objects/MessageObject";
import Constants from "@/app/constants";
import { useThemeColor } from "@/app/hooks/useThemeColor";

type Props = {
    message: MessageObject;
};
export default function MessageFromSelf({message}: Readonly<Props>) {
    const primaryColor = useThemeColor('primaryColor');
    return (
        <View style={styles.container}>
            <View style={styles.messageContainer}>
                <Image source={{uri: message.messageText}} style={[styles.messageTextContainer, styles.imageContainer, {backgroundColor: primaryColor}]}/>
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
    imageContainer: {
        height: 200,
    },
});