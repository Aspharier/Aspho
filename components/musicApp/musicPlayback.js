import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Screen from "./components/screen";
import color from "./misc/color";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Slider from "@react-native-community/slider";
import PlayerButton from "./components/PlayerButton";
import { AudioContext } from "./context/AudioProvider";
import {
  changeAudio,
  moveAudio,
  pause,
  playNext,
  resume,
  selectAudio,
} from "./misc/audioController";
import { convertTime, storeAudioForNextOpening } from "./misc/helper";

const { width } = Dimensions.get("window");

const MusicPlayback = () => {
  const context = useContext(AudioContext);
  const [currentPosition, setCurrentPosition] = useState(0);
  const { playbackPosition, playbackDuration, currentAudio } = context;

  const calculateSeekbar = () => {
    if (playbackPosition !== null && playbackDuration !== null) {
      return playbackPosition / playbackDuration;
    }

    if (currentAudio.lastPosition) {
      return currentAudio.lastPosition / (currentAudio.duration * 1000);
    }
    return 0;
  };

  useEffect(() => {
    context.loadPreviousAudio();
  }, []);

  const handlePlayPause = async () => {
    await selectAudio(context.currentAudio, context);
    // // play
    // if (context.soundObj === null) {
    //   const audio = context.currentAudio;
    //   const status = await play(context.playbackObj, audio.uri);
    //   context.playbackObj.setOnPlaybackStatusUpdate(
    //     context.onPlaybackStatusUpdate
    //   );
    //   return context.updateState(context, {
    //     soundObj: status,
    //     currentAudio: audio,
    //     isPlaying: true,
    //     currentAudioIndex: context.currentAudioIndex,
    //   });
    // }
    // // pause
    // if (context.soundObj && context.soundObj.isPlaying) {
    //   const status = await pause(context.playbackObj);
    //   return context.updateState(context, {
    //     soundObj: status,
    //     isPlaying: false,
    //   });
    // }
    // // resume
    // if (context.soundObj && !context.soundObj.isPlaying) {
    //   const status = await resume(context.playbackObj);
    //   return context.updateState(context, {
    //     soundObj: status,
    //     isPlaying: true,
    //   });
    // }
  };

  const handleNext = async () => {
    await changeAudio(context, "next");
    // const { isLoaded } = await context.playbackObj.getStatusAsync();
    // const isLastAudio =
    //   context.currentAudioIndex + 1 === context.totalAudioCount;
    // let audio = context.audioFiles[context.currentAudioIndex + 1];
    // let index;
    // let status;

    // if (!isLoaded && !isLastAudio) {
    //   index = context.currentAudioIndex + 1;
    //   status = await play(context.playbackObj, audio.uri);
    // }
    // if (!isLoaded && !isLastAudio) {
    //   index = context.currentAudioIndex + 1;
    //   status = await playNext(context.playbackObj, audio.uri);
    // }
    // if (isLastAudio) {
    //   index = 0;
    //   audio = context.audioFiles[index];
    //   if (isLoaded) {
    //     status = await playNext(context.playbackObj, audio.uri);
    //   } else {
    //     status = await play(context.playbackObj, audio.uri);
    //   }
    // }

    // context.updateState(context, {
    //   currentAudio: audio,
    //   playbackObj: context.playbackObj,
    //   soundObj: status,
    //   isPlaying: true,
    //   currentAudioIndex: index,
    //   playbackPosition: null,
    //   playbackDuration: null,
    // });
    // storeAudioForNextOpening(audio, index);
  };

  const handlePrevious = async () => {
    await changeAudio(context, "previous");
    // const { isLoaded } = await context.playbackObj.getStatusAsync();
    // const isFirstAudio = context.currentAudioIndex <= 0;
    // let audio = context.audioFiles[context.currentAudioIndex - 1];
    // let index;
    // let status;

    // if (!isLoaded && !isFirstAudio) {
    //   index = context.currentAudioIndex - 1;
    //   status = await play(context.playbackObj, audio.uri);
    // }
    // if (!isLoaded && !isFirstAudio) {
    //   index = context.currentAudioIndex - 1;
    //   status = await playNext(context.playbackObj, audio.uri);
    // }
    // if (isFirstAudio) {
    //   index = context.totalAudioCount - 1;
    //   audio = context.audioFiles[index];
    //   if (isLoaded) {
    //     status = await playNext(context.playbackObj, audio.uri);
    //   } else {
    //     status = await play(context.playbackObj, audio.uri);
    //   }
    // }

    // context.updateState(context, {
    //   currentAudio: audio,
    //   playbackObj: context.playbackObj,
    //   soundObj: status,
    //   isPlaying: true,
    //   currentAudioIndex: index,
    //   playbackPosition: null,
    //   playbackDuration: null,
    // });
    // storeAudioForNextOpening(audio, index);
  };

  const renderCurrentTime = () => {
    if (!context.soundObj && currentAudio.lastPosition) {
      return convertTime(currentAudio.lastPosition / 1000);
    }
    return convertTime(context.playbackPosition / 1000);
  };

  if (!context.currentAudio) return null;

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.audioCountContainer}>
          <View style={{ flexDirection: "row" }}>
            {context.isPlayListRunning && (
              <>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  From PlayList :{" "}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: color.ACTIVE_BG,
                    fontWeight: "bold",
                  }}
                >
                  {context.activePlayList.title}
                </Text>
              </>
            )}
          </View>
          <Text style={styles.audioCount}>{`${
            context.currentAudioIndex + 1
          } / ${context.totalAudioCount}`}</Text>
        </View>

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
          <View style={styles.timeStamp}>
            <Text style={styles.timeStampText}>
              {convertTime(context.currentAudio.duration)}
            </Text>
            <Text style={styles.timeStampText}>
              {currentPosition ? currentPosition : renderCurrentTime()}
            </Text>
          </View>
          <Slider
            style={{ width: width - 50, height: 40, alignSelf: "center" }}
            minimumValue={0}
            maximumValue={1}
            value={calculateSeekbar()}
            minimumTrackTintColor={color.ACTIVE_BG}
            maximumTrackTintColor={color.FONT_MEDIUM}
            thumbTintColor="black"
            onValueChange={(value) => {
              setCurrentPosition(
                convertTime(value * context.currentAudio.duration)
              );
            }}
            onSlidingStart={async () => {
              if (!context.isPlaying) return;
              try {
                await pause(context.playbackObj);
              } catch (error) {
                console.log("Error inside onSlidingStart callback", error);
              }
            }}
            onSlidingComplete={async (value) => {
              await moveAudio(context, value);
              setCurrentPosition(0);
            }}
          />
          <View style={styles.audioControllers}>
            <PlayerButton
              style={{ width: 50, height: 50 }}
              iconType="PREV"
              onPress={handlePrevious}
            />
            <PlayerButton
              onPress={handlePlayPause}
              style={{ marginHorizontal: 50, width: 50, height: 50 }}
              iconType={context.isPlaying ? "PLAY" : "PAUSE"}
            />
            <PlayerButton
              style={{ width: 50, height: 50 }}
              iconType="NEXT"
              onPress={handleNext}
            />
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
  audioCountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
  audioCount: {
    textAlign: "right",
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
  timeStamp: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginLeft: 25,
    marginRight: 25,
  },
  timeStampText: {
    fontSize: 15,
    fontWeight: "bold",
    color: color.ACTIVE_BG,
  },
});

export default MusicPlayback;
