import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Constants from "@/app/constants";

type Props = {
    // We are going to focus on using just the FontAwesome icons in this component
    name: keyof typeof FontAwesome.glyphMap;  
    onPress: () => void;
    style?: ViewStyle;
};
export default function IconButton({ name, onPress, style }: Readonly<Props>) {
    return (
        <Pressable
            // This manner of setting the style lets both our styles.container styling
            // be applied and then also an external styling that might be desired.
            style={[styles.container, style]}
            onPress={onPress}
        >
            <FontAwesome name={name} size={18} color={Constants.colors.primaryColorText}/>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 35,
        height: 35,
        borderRadius: 17,
        backgroundColor: Constants.colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
});