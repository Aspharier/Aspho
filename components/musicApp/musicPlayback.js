import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React, { useContext } from "react";
import Screen from "./components/screen";
import color from "./misc/color";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Slider from "@react-native-community/slider";
import PlayerButton from "./components/PlayerButton";
import { AudioContext } from "./context/AudioProvider";

const { width, height } = Dimensions.get("window");

const MusicPlayback = () => {
  const context = useContext(AudioContext);

  const {playbackPosition,playbackDuration} = context;

  const calculateSeekbar = () => {
    
    if(playbackPosition !== null && playbackDuration !== null){
      return playbackPosition / playbackDuration;
    }
    return 0;
  }
  return (
    <Screen style={{ backgroundColor: "red" }}>
      <View style={styles.container}>
        <Text style={styles.audioCount}>{`${context.currentAudioIndex + 1} / ${
          context.totalAudioCount
        }`}</Text>
        <View style={styles.midBannerContainer}>
          <MaterialCommunityIcons
            name="music-circle"
            size={width * 0.8}
            color={context.isPlaying ? "#BA181B" : color.FONT_MEDIUM}
          />
        </View>
        <View style={styles.audioPlayerContainer}>
          <Text numberOfLines={1} style={styles.audioTitle}>
            {context.currentAudio.filename}
          </Text>
          <Slider
            style={{ width: width - 50, height: 40, alignSelf: "center" }}
            minimumValue={0}
            maximumValue={1}
            value={calculateSeekbar()}
            minimumTrackTintColor={color.ACTIVE_BG}
            maximumTrackTintColor={color.FONT_MEDIUM}
            thumbTintColor="black"
          />
          <View style={styles.audioControllers}>
            <PlayerButton style={{ width: 50, height: 50 }} iconType="PREV" />
            <PlayerButton
              style={{ marginHorizontal: 50, width: 50, height: 50 }}
              iconType={context.isPlaying ? "PLAY" : "PAUSE"}
            />
            <PlayerButton style={{ width: 50, height: 50 }} iconType="NEXT" />
          </View>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  audioControllers: {
    width: width - 40,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: 50,
    marginBottom: 50,
  },
  audioCount: {
    textAlign: "right",
    padding: 30,
    color: "black",
    fontSize: 25,
  },
  midBannerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  audioTitle: {
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
    paddingBottom: 50,
    textAlign: "center",
    padding: 30,
  },
});

export default MusicPlayback;
