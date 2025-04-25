import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useThemeColor } from "@/app/hooks/useThemeColor";

type Props = {
    // We are going to focus on using just the FontAwesome icons in this component
    name: keyof typeof FontAwesome.glyphMap;  
    onPress: () => void;
    style?: ViewStyle;
};
export default function IconButton({ name, onPress, style }: Readonly<Props>) {
    const backgroundColor = useThemeColor('primaryColor');
    const color = useThemeColor('primaryColorText');
    return (
        <Pressable
            // This manner of setting the style lets both our styles.container styling
            // be applied and then also an external styling that might be desired.
            style={[styles.container, {backgroundColor}, style]}
            onPress={onPress}
        >
             <FontAwesome name={name} size={18} color={color}/>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 35,
        height: 35,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
});