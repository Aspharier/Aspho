import { View, Text, StyleSheet,StatusBar } from "react-native";
import React from "react";

const MusicPlayback = ({ navigation }) => {

  return (
    <View style={styles.wrapper}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />

      <Text>PLAYER</Text>
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
  cardContainer: {
    position: "relative",
    bottom: 20,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#F5F3F4",
    borderRadius: 20,
    padding: 15,
    elevation: 30,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  albumArtContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  albumArt: {
    width: 300,
    height: 300,
    borderRadius: 15,
  },
  songInfo: {
    alignItems: "center",
  },
  songTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0B090A",
  },
  artistName: {
    fontSize: 16,
    color: "#0B090A",
  },
  controlContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },
  sliderContainer: {
    marginTop: 20,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  timeText: {
    fontSize: 12,
    color: "#0B090A",
  },
  button: {
    borderColor: "black",
    borderWidth: 1,
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
  buttonText: {
    fontWeight: "bold",
    letterSpacing: 2,
    fontSize: 20,
    color: "#0B090A",
  },
});

export default MusicPlayback;
