import { StyleSheet, View } from "react-native";
import UserData from "@/app/objects/UserData";
import MessageObject from "@/app/objects/MessageObject";
import Constants from "@/app/constants";
import Autolink from "react-native-autolink";
import Text from "@/app/components/generic/Text";
import { useThemeColor } from "@/app/hooks/useThemeColor";

type Props = {
    message: MessageObject;
    userDataForMessage: UserData | undefined;
};
export default function MessageFromSomeoneElse({message, userDataForMessage}: Readonly<Props>) {
    const backgroundColor = useThemeColor('messageBackgroundColor');
    const color = useThemeColor('messageColorText');
    return (
        <View style={styles.container}>
            <View style={styles.messageContainer}>

                <Text>{userDataForMessage?.userName}</Text>

                <Autolink 
                    style={[styles.messageTextContainer , {backgroundColor, color}]}
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
        flexDirection: "row",
        marginBottom: Constants.layout.padding,
    },
    messageContainer: {
        flexBasis: "90%",
    },
    messageTextContainer: {
        borderRadius: Constants.layout.borderRadius,
        padding: Constants.layout.padding,
    },
});