import { Image, StyleSheet, View } from "react-native";
import UserData from "@/app/objects/UserData";
import MessageObject from "@/app/objects/MessageObject";
import Constants from "@/app/constants";
import Text from "@/app/components/generic/Text";
import { useThemeColor } from "@/app/hooks/useThemeColor";

type Props = {
    message: MessageObject;
    userDataForMessage: UserData | undefined;
};
export default function MessageFromSomeoneElse({message, userDataForMessage}: Readonly<Props>) {
    const backgroundColor = useThemeColor('messageBackgroundColor');
    return (
        <View style={styles.container}>
            <View style={[styles.messageContainer, {backgroundColor}]}>
                <Text>{userDataForMessage?.userName}</Text>
                <Image source={{uri: message.messageText}} style={[styles.messageTextContainer, styles.imageContainer]}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
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