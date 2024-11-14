import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Home from "./home";
import React, { cloneElement, useState } from "react";

const Sudoku = ({ navigation }) => {
  const [grid, setGrid] = useState(
    Array(9)
      .fill()
      .map(() => Array(9).fill(""))
  );

  const handleInputChange = (row, col, value) => {
    const newGrid = [...grid];
    newGrid[row][col] = value;
    setGrid(newGrid);
  };

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {grid.map((row, rowIndex) => (
          <View style={styles.row} key={rowIndex}>
            {row.map((cell, colIndex) => (
              <TextInput
                key={colIndex}
                style={[
                  styles.cell,
                  {
                    borderRightWidth: colIndex % 3 == 2 ? 2 : 1,
                    borderBottomWidth: rowIndex % 3 == 2 ? 2 : 1,
                    backgroundColor: cell === 1 ? "" : "white",
                  },
                ]}
                keyboardType="numeric"
                maxLength={1}
                value={cell}
                onChangeText={(text) =>
                  handleInputChange(rowIndex, colIndex, text)
                }
              />
            ))}
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => alert("Check Sudoku!")}
      >
        <Text style={styles.buttonText}>CHECK</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>RESET</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#BA181B",
  },
  gridContainer: {
    flexDirection: "column",
    width: 360,
    height: 360,
    borderWidth: 2,
    borderColor: "#BA181B",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 40,
    height: 40,
    textAlign: "center",
    fontSize: 15,
    borderColor: "#BA181B",
    borderWidth: 1,
    margin: 0,
    backgroundColor: "white",
  },
  button: {
    marginTop : 20,
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

export default Sudoku;
