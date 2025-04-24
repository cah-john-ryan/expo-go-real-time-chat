import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

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
    padding: 10,
    gap: 25
  },
  welcomeText: {
    marginTop: 25
  },
  userNameInput: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  continueButton: {
    // Makes the input fill the entire horizontal width of the parent container.
    width: "100%",
    // Gives rounded edges to the border around this element.
    borderRadius: 10,
    // Places a padding inside the element so that whatever is entered does not touch the borders.
    padding: 10,
    // Aligns the content in the button to be shown in the horizontal center of the screen.
    alignItems: "center",
    // Assigns a prominent color to the background to indicate this is an interactive button.
    backgroundColor: "blue",
  },
  continueButtonText: {
      color: "white"
  }
});