import { Text,View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Sudoku")}
      >
        <Text style={styles.buttonText}>START</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#BA181B",
  },
  button: {
    width: 150,
    padding: 20,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F3F4",
  },
  buttonText: {
    fontWeight: "bold",
    letterSpacing: 4,
    fontSize: 30,
    color: "#0B090A",
  },
});

export default Home;
