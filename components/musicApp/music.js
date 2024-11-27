import { View, Text, StyleSheet,StatusBar } from "react-native";
import React from "react";

const Music = () => {
  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <Text>AUDIO LIST</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  buttonText: {
    fontWeight: "bold",
    letterSpacing: 2,
    fontSize: 35,
    color: "#0B090A",
  },
  searchButton: {
    marginRight: 10,
    marginLeft: 10,
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F3F4",
    elevation: 30,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});

export default Music;
