import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import React from "react";

const Home = ({ navigation }) => {
  const handleCardPress = (cardFunction) => {
    cardFunction();
  };

  const cardFunction = {
    cardSudo: () => navigation.navigate("Sudoku"),
    cardTic: () => navigation.navigate("TicTacToe"),
    cardMusic: () => navigation.navigate("AppNavigator"),
  };

  return (
    <ScrollView contentContainerStyle={styles.bigContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.cardSudo}
          onPress={() => handleCardPress(cardFunction.cardSudo)}
        >
          <Text style={styles.cardText}>SudO</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.cardSudo}
          onPress={() => handleCardPress(cardFunction.cardTic)}
        >
          <Text style={styles.cardText}>TicTacToe</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.cardSudo}
          onPress={() => handleCardPress(cardFunction.cardMusic)}
        >
          <Text style={styles.cardText}>JAM</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bigContainer: {
    flex: 1,
    backgroundColor: "#BA181B",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  cardSudo: {
    width: "200",
    height: "200",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 30,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  cardText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
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
