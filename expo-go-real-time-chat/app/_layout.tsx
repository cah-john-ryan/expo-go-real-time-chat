import { Stack } from "expo-router";
import Constants from "@/app/constants";

export default function RootLayout() {
  return (
    <Stack 
      screenOptions={{
      headerStyle: {
          backgroundColor: Constants.colors.primaryColor,
      },
      headerShadowVisible: false,
      headerTintColor: Constants.colors.primaryColorText
  }}
    >
      <Stack.Screen name="index" options={{title: 'Setup User Account'}}/>
      <Stack.Screen name="[userKey]/chat" options={{title: 'Technology Camp Chat'}}/>
      <Stack.Screen name="[userKey]/post-a-photo" options={{title: 'Post A Photo'}}/>
    </Stack>
  );
}