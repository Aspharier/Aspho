import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Slider from "@react-native-community/slider";

const MusicPlayback = ({ navigation }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.cardContainer}>
        <View style={styles.albumArtContainer}>
          <Image
            source={require("../../assets/albumCover.jpg")}
            style={styles.albumArt}
          />
        </View>

        <View style={styles.songInfo}>
          <Text style={styles.songTitle}>SONG TITLE</Text>
          <Text style={styles.artisName}>ARTIST NAME</Text>
        </View>

        <View style={styles.controlContainer}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="skip-previous"
              size={40}
              color="#0B090A"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons name="pause" size={50} color="#0B090A" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="skip-next"
              size={40}
              color="#0B090A"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#BA181B"
            maximumTrackTintColor="#E5E5E5"
            thumbTintColor="#BA181B"
          />
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>0:00</Text>
            <Text style={styles.timeText}>3:45</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Music")}
      >
        <Text style={styles.buttonText}>BACK</Text>
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
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor: "#E5E5E5",
  },
  songInfo: {
    alignItems: "center",
    marginBottom: 10,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0B090A",
  },
  artisName: {
    fontSize: 14,
    color: "#6C757D",
  },
  controlContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sliderContainer: {
    marginTop: 10,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -10,
  },
  timeText: {
    fontSize: 12,
    color: "#6C757D",
  },
  button: {
    alignSelf: "center",
    width: "90%",
    padding: 15,
    borderRadius: 20,
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
    textAlign: "center",
  },
});

export default MusicPlayback;
