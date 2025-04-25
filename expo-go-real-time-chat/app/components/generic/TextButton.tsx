import { Pressable, type PressableProps, StyleSheet, Text } from "react-native";
import Constants from "@/app/constants";
import { useThemeColor } from "@/app/hooks/useThemeColor";

type Props = PressableProps & {
  text: string;
  isPrimary?: boolean;
  onPress: () => void;
};

export default function TextButton({
  text,
  onPress,
  style,
  isPrimary,
  ...rest
}: Readonly<Props>) {
  const backgroundColor = useThemeColor("primaryColor");
  const color = useThemeColor("primaryColorText");

  return (
    <Pressable
      style={[styles.continueButton, { backgroundColor }, style]}
      onPress={onPress}
      {...rest}
    >
      <Text style={{ color }}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  continueButton: {
    width: "100%",
    borderRadius: Constants.layout.borderRadius,
    padding: Constants.layout.padding,
    alignItems: "center",
  },
});
