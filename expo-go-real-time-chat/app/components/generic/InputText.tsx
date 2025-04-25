import { TextInput, type TextInputProps } from "react-native";
import { useThemeColor } from "@/app/hooks/useThemeColor";

export default function ThemedTextInput({
  style,
  ...rest
}: Readonly<TextInputProps>) {
  const color = useThemeColor("messageColorText");
  const borderColor = useThemeColor("inputTextBorderColor");

  return <TextInput style={[{ color, borderColor }, style]} {...rest} />;
}
