import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import Home from "./home";
// Getting the screen Dimenesions
const screen = Dimensions.get("window");

// Giving the Square Size 30% of the width of Window
const SQUARE_SIZE = Math.floor(screen.width * 0.3);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

const Square = ({ onPress, value }) => {
  return (
    <TouchableOpacity style={styles.square} onPress={onPress}>
      <Text style={styles.squareText}>{value}</Text>
    </TouchableOpacity>
  );
};

const Board = ({ onSquarePress, squares }) => {
  const renderSquare = (i) => {
    return <Square value={squares[i]} onPress={() => onSquarePress(i)} />;
  };

  return (
    <View style={styles.board}>
      <View style={styles.row}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </View>
      <View style={styles.row}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </View>
      <View style={styles.row}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </View>
    </View>
  );
};

const TicTacToe = ({ navigation }) => {
  const [xIsNext, setXIsNext] = useState(false);
  const [squares, setSquares] = useState(Array(9).fill(null));

  const onSquarePress = (i) => {
    const value = xIsNext ? "X" : "O";
    const newSquares = [...squares];

    if (newSquares[i] || calculateWinner(squares)) {
      return;
    }

    newSquares[i] = value;

    setXIsNext(!xIsNext);
    setSquares(newSquares);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(false);
  };

  const winner = calculateWinner(squares);

  return (
    <SafeAreaView style={styles.container}>
      <Board squares={squares} onSquarePress={onSquarePress} />

      {winner && (
        <View style={styles.winnerBlock}>
          <Text style={styles.text}>{`WINNER: ${winner}`}</Text>
        </View>
      )}
      <View style={styles.buttonRow}>
        {winner && (
          <TouchableOpacity onPress={resetGame} style={styles.button}>
            <Text style={styles.buttonText}>New Game</Text>
          </TouchableOpacity>
        )}

        {!winner && (
          <TouchableOpacity onPress={resetGame} style={styles.button}>
            <Text style={styles.buttonText}>RESET</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>HOME</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TicTacToe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#BA181B",
  },
  board: {
    borderWidth: 1,
    borderColor: "#fff",
    margin: 10,
  },
  row: {
    flexDirection: "row",
  },
  square: {
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
  },
  squareText: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
  },
  winnerBlock: {
    marginTop: 20,
  },
  button: {
    margin: 10,
    marginHorizontal: 5,
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
  text: {
    fontSize: 50,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "94%",
  },
});
