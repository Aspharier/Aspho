import { View, Text, StyleSheet, StatusBar, ScrollView } from "react-native";
import React from "react";

const PlayList = () => {
  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <Text>PLAY LIST</Text>
    </ScrollView>
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
