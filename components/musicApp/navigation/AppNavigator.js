import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MusicPlayback from "../musicPlayback";
import PlayList from "../playlist";
import Home from "../../home";
import Music from "../music";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        ...styles.tabContainer,
      },
      animationEnabled: false,
      tabBarActiveTintColor: "white",
      tabBarInactiveTintColor: "black",
      tabBarLabelStyle: {
        fontSize: 12,
      },
    })}
    >
      <Tab.Screen
        name="AUDIO"
        component={Music}
        options={{
          tabBarIcon: ({ focused,color, size }) => (
            <Ionicons name={focused ? "headset" : "headset-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="PLAYER"
        component={MusicPlayback}
        options={{
          tabBarIcon: ({ focused,color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "record-circle" : "record-player"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PLAYLIST"
        component={PlayList}
        options={{
          tabBarIcon: ({ focused,color, size }) => (
            <MaterialIcons name={focused ? "playlist-play" : "playlist-remove"} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    marginLeft: 25,
    marginRight: 25,
    borderColor: "transparent",
    alignSelf: "center",
    width: "100%",
    height: 80,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 20,
    shadowColor: "black",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingTop: 10,
    alignItems: "center",
    backgroundColor: "#BA181B", 
  },
});

export default AppNavigator;
