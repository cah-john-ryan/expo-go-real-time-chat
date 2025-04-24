import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Constants from "@/app/constants";

export default function Index() {
  const [userName, setUserName] = useState<string>('');
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.welcomeText}>Welcome! Please enter a user name to proceed.</Text>

      <TextInput
          style={styles.userNameInput}
          value={userName}
          onChangeText={(text) => {
              setUserName(text);
          }}
          placeholder={"Enter your desired user name here"}
          placeholderTextColor={"grey"}
      />

      <Pressable
          style={styles.continueButton}
          onPress={() => {
            alert(`Continue pressed. Current userName: ${userName}`)
          }}
      >
          <Text style={styles.continueButtonText}>Continue</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Constants.layout.padding,
    gap: 25
  },
  welcomeText: {
    marginTop: 25
  },
  userNameInput: {
    width: "100%",
    borderWidth: 1,
    borderRadius: Constants.layout.borderRadius,
    padding: Constants.layout.padding,
  },
  continueButton: {
    width: "100%",
    borderRadius: Constants.layout.borderRadius,
    padding: Constants.layout.padding,
    alignItems: "center",
    backgroundColor: Constants.colors.primaryColor,
  },
  continueButtonText: {
      color: Constants.colors.primaryColorText
  }
});