import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headLineContainer}>
        <Text style={styles.headLine}>Dare</Text>
        <Text style={styles.headLine}>TO</Text>
        <Text style={styles.headLine}>Begin</Text>
      </View>
      <View style = {styles.emptySpace}>

      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Sudoku")}
      >
        <Text style={styles.buttonText}>PLAY</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  emptySpace : {
    margin : 80
  },  
  headLineContainer: {
    flex: 0,
    flexDirection: "column",
  },
  headLine: {
    letterSpacing: 2,
    color: "#F5F3F4",
    fontSize: 100,
    fontWeight: "bold",
  },
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
