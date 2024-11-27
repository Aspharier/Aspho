import { View, Text, StyleSheet, StatusBar } from "react-native";
import React from "react";

const PlayList = () => {
  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <Text>PLAY LIST</Text>
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
});

export default PlayList;
