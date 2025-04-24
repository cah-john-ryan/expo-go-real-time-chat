import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Chat() {
    const { userKey } = useLocalSearchParams();

    return (
        <View>
            <Text>Welcome to the chat screen!</Text>
            <Text>userKey: {userKey}</Text>
        </View>
    );
}