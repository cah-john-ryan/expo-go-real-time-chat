import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function Index() {
  const [userName, setUserName] = useState<string>('');
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome! Please enter a user name to proceed.</Text>

      <TextInput
          value={userName}
          onChangeText={(text) => {
            setUserName(text);
          }}
          placeholder={"Enter your desired user name here"}
          placeholderTextColor={"grey"}
      />

      <Pressable 
          onPress={() => {
            alert(`Continue pressed. Current userName: ${userName}`)
          }}
      >
          <Text>Continue</Text>
      </Pressable>
    </View>
  );
}