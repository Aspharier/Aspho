import React from "react";
import { StatusBar } from "react-native";
import Sudoku from "./components/main";
import Home from "./components/home";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from "react-native-screens";

enableScreens();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#BA181B" />
      <Stack.Navigator initialRouteName="Home"
        screenOptions={{
          headerShown : false,
          cardStyle : {backgroundColor : "#BA181B"},
          animation : "none",
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Sudoku" component={Sudoku} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}