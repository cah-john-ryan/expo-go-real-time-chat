import { useCallback, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Constants from "@/app/constants";
import useFirebaseUserData from "@/app/hooks/useFirebaseUserData";
import useLocalStorage from "@/app/hooks/useLocalStorage";
import { Href, useFocusEffect, useRouter } from "expo-router";
import Text from "@/app/components/generic/Text";
import TextInput from "@/app/components/generic/InputText";
import TextButton from "@/app/components/generic/TextButton";

export default function Index() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');
  const {findByUserName, storeNewUserData} = useFirebaseUserData(null);
  const [userKeyInLocalStorage, setUserKeyInLocalStorage] = useLocalStorage('userKey');

  useFocusEffect(
    useCallback(() => {
        if (userKeyInLocalStorage) {
            console.log(`Index.useFocusEffect: userKey found in local storage.  Redirecting to the chat screen.  (userKey: ${userKeyInLocalStorage})`);
            const homeRoute = `/${userKeyInLocalStorage}/chat` as Href;
            router.replace(homeRoute);
        }
    }, [userKeyInLocalStorage])
  );
  
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
      setUserKeyInLocalStorage(userData.key);

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


      <TextButton onPress={storeUserName} text={"Continue"}/>
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
});