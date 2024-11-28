import React from "react";
import { StatusBar, View } from "react-native";
import Sudoku from "./components/sudo";
import Home from "./components/home";
import TicTacToe from "./components/tictactoe";
import Music from "./components/musicApp/music";
import MusicPlayback from "./components/musicApp/musicPlayback";
import AppNavigator from "./components/musicApp/navigation/AppNavigator";
import AudioProvider from "./components/musicApp/context/AudioProvider";
import AudioList from "./components/musicApp/components/AudioList";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens";

enableScreens();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AudioProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#BA181B" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: "#BA181B" },
            animation: "none",
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Sudoku" component={Sudoku} />
          <Stack.Screen name="TicTacToe" component={TicTacToe} />
          <Stack.Screen name="AppNavigator" component={AppNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </AudioProvider>
  );
}
{/* <Stack.Screen name="AudioList" component={AudioList} /> */}