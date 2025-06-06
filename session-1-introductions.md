# Real-time chat with Expo Go and React Native
## Session 1 - Introductions

### What is React Native?
A brief explanation: 
https://reactnative.dev

Examples of apps that use this technology: 
https://reactnative.dev/showcase

Helps you build applications that can be used by people on pretty much anything that has a screen. Why limit what you are building to only being accessible in a web browser?

React Native leverages the React JavaScript library at its core.

### What is Expo Go?
https://expo.dev/

Expo Go makes it easier to build, test, and deploy React Native applications.  

### What is already setup for you
On your laptop you should have the software you need to get started already installed.
What is already installed:
- NodeJS, https://nodejs.org/en/download
- Git for source control management, https://git-scm.com/downloads
- Visual Studio Code, https://code.visualstudio.com/download
- Google's Chrome browser, https://www.google.com/chrome/

### What you need to setup yourself
If you have a smartphone, there is a link to the installation of the Expo Go app for your phone via the link below.

https://expo.dev/go

### Getting setup
1. Power on your laptop and make your way to where you see the Windows Desktop presented.
2. Click on the Visual Studio Code icon.
3. In Visual Studio Code, open the the folder `/Documents/expo-go-real-time-chat/`.  You should see in Visual Studio Code now the project we will be using to build this application.
4. In Visual Studio Code, open the command prompt window which should be found at the bottom of your screen.
5. From the command prompt window, enter the below command to run this application in it's initial state:
```
npx create-expo-app@latest
```
6. At the prompt "What is your app named?" enter:
```
expo-go-real-time-chat
```
7. Type the command below to change directory in the initial Expo Go app that was setup.
```
cd expo-go-real-time-chat
```
8. (This step is only needed if running your computer on Cardinal's guest WiFi) Type the command below to support connectivity using tunneling.
```
npm install @expo/ngrok
```
9. Type the command below to run the application in its initial state.
```
npx expo start --tunnel
```
10. You should see a QR code displayed on the screen, scan this with your phone's camera to run this application on your phone.
11. Press the `w` key to run the application in your Google Chrome browser.  Once pressed, the browser should automatically appear with the application up and running.

You should now have the default template up and running on your computer as well as your phone.

### SESSION COMPLETE

Up next -> [Session 2 - Creating a landing screen](session-2-landing-screen.md)
