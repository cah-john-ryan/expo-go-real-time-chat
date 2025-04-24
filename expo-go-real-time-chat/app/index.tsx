import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Constants from "@/app/constants";
import useFirebaseUserData from "@/app/hooks/useFirebaseUserData";
// Add this to your imports.
import { Href, useRouter } from "expo-router";

export default function Index() {
  // Now add this here so that you have the Expo Go router available.
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');
  const {findByUserName, storeNewUserData} = useFirebaseUserData(null);
  
  const storeUserName = async () => {
      if (!userName) {
          return;
      }
      const existingUserData = findByUserName(userName);
      let userData;
      if (existingUserData) {
          console.log(`The user name ${userName} already exists.  Assuming identity of that user. (userKey: ${existingUserData.key})`);
          userData = existingUserData;
      } else {
          userData = await storeNewUserData(userName);
      }
      // Add this here replacing what was there before.
      // This will have this screen transition to the chat screen/route when the userName is identified.
      const homeRoute = `/${userData.key}/chat` as Href;
      router.replace(homeRoute);
  };
  
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
          onPress={storeUserName}
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