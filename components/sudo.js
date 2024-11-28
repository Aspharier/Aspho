import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";

const Sudoku = ({ navigation }) => {
  const generateRandomSudoku = () => {
    const isValid = (grid, row, col, num) => {
      if (grid[row].includes(num)) return false;

      for (let i = 0; i < 9; i++) {
        if (grid[i][col] === num) return false;
      }

      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(col / 3) * 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (grid[startRow + i][startCol + j] === num) return false;
        }
      }

      return true;
    };

    const fillGrid = (grid) => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (grid[row][col] === "") {
            const nums = Array.from({ length: 9 }, (_, i) => i + 1).sort(
              () => Math.random() - 0.5
            );
            for (let num of nums) {
              if (isValid(grid, row, col, num)) {
                grid[row][col] = num;
                if (fillGrid(grid)) return true;
                grid[row][col] = "";
              }
            }
            return false;
          }
        }
      }
      return true;
    };

    const removeCells = (grid, count) => {
      const newGrid = grid.map((row) => [...row]);
      while (count > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (newGrid[row][col] !== "") {
          newGrid[row][col] = "";
          count--;
        }
      }
      return newGrid;
    };

    const fullGrid = Array(9)
      .fill()
      .map(() => Array(9).fill(""));
    fillGrid(fullGrid);

    return removeCells(fullGrid, 40); 
  };

  const [grid, setGrid] = useState([]);
  const [originalGrid, setOriginalGrid] = useState([]);

  useEffect(() => {
    const newGrid = generateRandomSudoku();
    setGrid(newGrid);
    setOriginalGrid(newGrid.map((row) => [...row]));
  }, []);

  const handleInputChange = (row, col, value) => {
    const newGrid = [...grid];
    if (originalGrid[row][col] === "") {
      newGrid[row][col] = value;
      setGrid(newGrid);
    }
  };

  const checkSudoku = () => {
    const isValid = (grid) => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          const num = parseInt(grid[row][col], 10);
          if (isNaN(num) || !isValidNum(grid, row, col, num)) return false;
        }
      }
      return true;
    };

    const isValidNum = (grid, row, col, num) => {
      // for row checking
      for (let i = 0; i < 9; i++) {
        if (i !== col && grid[row][i] == num) return false;
      }

      // for column checking
      for (let i = 0; i < 9; i++) {
        if (i !== row && grid[i][col] == num) return false;
      }

      // for 3x3 cube checking
      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(col / 3) * 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (
            (startRow + i !== row || startCol + j !== col) &&
            grid[startRow + i][startCol + j] == num
          )
            return false;
        }
      }

      return true;
    };

    if (isValid(grid)) {
      alert("Congratulations! The Sudoku is correct!");
    } else {
      alert("The Sudoku solution is incorrect. Keep trying!");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.gridContainer}>
        {grid.map((row, rowIndex) => (
          <View style={styles.row} key={rowIndex}>
            {row.map((cell, colIndex) => (
              <TextInput
                key={colIndex}
                style={[
                  styles.cell,
                  {
                    borderRightWidth: colIndex % 3 === 2 ? 2 : 1,
                    borderBottomWidth: rowIndex % 3 === 2 ? 2 : 1,
                    backgroundColor:
                      originalGrid[rowIndex][colIndex] !== "" ? "" : "white",
                    fontWeight: "bold",
                  },
                ]}
                keyboardType="numeric"
                maxLength={1}
                editable={originalGrid[rowIndex][colIndex] === ""}
                value={cell !== "" ? cell.toString() : ""}
                onChangeText={(text) =>
                  handleInputChange(rowIndex, colIndex, text)
                }
              />
            ))}
          </View>
        ))}
      </View>
      <View style = {styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={checkSudoku}>
          <Text style={styles.buttonText}>CHECK</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            const newGrid = generateRandomSudoku();
            setGrid(newGrid);
            setOriginalGrid(newGrid.map((row) => [...row]));
          }}
        >
          <Text style={styles.buttonText}>RESET</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>HOME</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  },
  button: {
    flex : 1,
    marginHorizontal : 5,
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
  buttonText: {
    fontWeight: "bold",
    letterSpacing: 4,
    fontSize: 30,
    color: "#0B090A",
  },
  buttonRow : {
    flexDirection : "row",
    marginTop : 50,
    justifyContent : "space-between",
    width : "94%"
  },  
});

export default Sudoku;
