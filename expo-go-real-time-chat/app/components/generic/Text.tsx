import { Text, type TextProps } from "react-native";
import { useThemeColor } from "@/app/hooks/useThemeColor";

export default function ThemedText({ style, ...rest }: Readonly<TextProps>) {
  const color = useThemeColor("messageColorText");

  return <Text style={[{ color }, style]} {...rest} />;
}
