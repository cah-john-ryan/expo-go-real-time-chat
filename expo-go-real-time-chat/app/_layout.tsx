import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from 'expo-linear-gradient';

import { useColorScheme } from '@/app/hooks/useColorScheme';
import { useThemeColor } from '@/app/hooks/useThemeColor';
import React from 'react';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const primaryColorText = useThemeColor('primaryColorText');
  const linearGradientStart = useThemeColor('linearGradientStart');
  const linearGradientEnd = useThemeColor('linearGradientEnd');
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack 
        screenOptions={{
          headerBackground: () => (
            <LinearGradient
              colors={[linearGradientStart, linearGradientEnd]}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
            ),
          headerTintColor: primaryColorText
        }}
      >
        <Stack.Screen name="index" options={{title: 'Setup User Account'}}/>
        <Stack.Screen name="[userKey]/chat" options={{title: 'Technology Camp Chat'}}/>
        <Stack.Screen name="[userKey]/post-a-photo" options={{title: 'Post A Photo'}}/>
      </Stack>
      <StatusBar style="auto"/>
    </ThemeProvider>
  );
}