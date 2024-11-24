import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import React from "react";
import { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MusicPlayback from "./musicPlayback";

const Music = ({ navigation }) => {
  const [showPlayback, setShowPlayback] = useState(false);

  const handlePlayback = () => {
    navigation.navigate("MusicPlayback");
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <MaterialCommunityIcons name="music" size={20} color="#0B090A" />
          <TextInput
            style={styles.searchTextInput}
            placeholder="ENTER YOUR MUSIC"
            placeholderTextColor="#0B090A"
            underlineColor="transparent"
            activeUnderlineColor="transparent"
          />
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handlePlayback}>
          <Text style={styles.buttonText}>PLAY</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.buttonText}>HOME</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#BA181B",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F3F4",
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderWidth: 1,
    width: "70%",
    elevation: 30,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
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
    borderColor: "black",
    borderWidth: 1,
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
  searchTextInput: {
    marginLeft: 15,
    width: "70%",
    backgroundColor: "#F5F3F4",
    borderRadius: 15,
    fontWeight: "bold",
    fontSize: 20,
  },
  button: {
    margin: 10,
    width: "30%",
    alignSelf: "center",
    marginHorizontal: 5,
    padding: 20,
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
