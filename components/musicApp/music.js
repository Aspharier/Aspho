import { View, StyleSheet, StatusBar, Dimensions } from "react-native";
import React, { Component } from "react";
import { AudioContext } from "./context/AudioProvider";
import { LayoutProvider, RecyclerListView } from "recyclerlistview";
import { Audio } from "expo-av";

import AudioList from "./components/AudioList";
import Screen from "./components/screen";
import OptionModel from "./components/OptionModel";
import { play, pause, resume, playNext } from "./misc/audioController";
import { storeAudioForNextOpening } from "./misc/helper";
export default class Music extends Component {
  static contextType = AudioContext;

  constructor(props) {
    super(props);
    this.state = {
      optionModalVisible: false,
    };
    this.currentItem = {};
  }

  layoutProvider = new LayoutProvider(
    (i) => "audio",
    (type, dim) => {
      switch (type) {
        case "audio":
          dim.width = Dimensions.get("window").width;
          dim.height = 70;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    }
  );

  // onPlaybackStatusUpdate = async playbackStatus => {
  //   if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
  //     this.context.updateState(this.context, {
  //       playbackPosition: playbackStatus.positionMillis,
  //       playbackDuration: playbackStatus.durationMillis,
  //     });
  //   }
  //   if (playbackStatus.didJustFinish) {
  //     const nextAudioIndex = this.context.currentAudioIndex + 1;

  //     // there is no next audio to play or if the current audio is last one
  //     if (nextAudioIndex >= this.context.totalAudioCount) {
  //       this.context.playbackobj.unloadAsync();
  //       this.context.updateState(this.context, {
  //         soundObj: null,
  //         currentAudio: this.context.audioFiles[0],
  //         isPlaying: false,
  //         currentAudioIndex: 0,
  //         playbackPosition: null,
  //         playbackDuration: null,
  //       });
  //       return await storeAudioForNextOpening(this.context.audioFiles[0], 0);
  //     }
  //     // other wise we want to select the next audio
      
  //     const audio = this.context.audioFiles[audio,Index];
  //     const status = await playNext(this.context.playbackObj, audio.uri);
      
  //     this.context.updateState(this.context, {
  //       soundObj: status,
  //       currentAudio: audio,
  //       isPlaying: true,
  //       currentAudioIndex: audioIndex,
  //     });
  //     await storeAudioForNextOpening(audio, nextAudioIndex);
  //   }
  // };

  handleAudioPress = async (audio) => {
    const { soundObj, playbackObj, currentAudio, updateState, audioFiles } =
      this.context;
    //plaing audio for the first time.
    if (soundObj === null) {
      const playbackObj = new Audio.Sound();
      const status = await play(playbackObj, audio.uri);
      const index = audioFiles.indexOf(audio);
      
      updateState(this.context, {
        currentAudio: audio,
        playbackObj: playbackObj,
        soundObj: status,
        isPlaying: true,
        currentAudioIndex: index,
      });
      playbackObj.setOnPlaybackStatusUpdate(this.context.onPlaybackStatusUpdate);
      return storeAudioForNextOpening(audio, index);
    }

    //pause audio
    if (
      soundObj.isLoaded &&
      soundObj.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await pause(playbackObj);
      return updateState(this.context, { soundObj: status, isPlaying: false });
    }

    //resume audio
    if (
      soundObj.isLoaded &&
      !soundObj.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await resume(playbackObj);
      return updateState(this.context, { soundObj: status, isPlaying: true });
    }

    //select another audio
    if (soundObj.isLoaded && currentAudio.id !== audio.id) {
      if (!playbackObj) return;
      const status = await playNext(playbackObj, audio.uri);
      const index = audioFiles.indexOf(audio);

      updateState(this.context, {
        currentAudio: audio,
        soundObj: status,
        isPlaying: true,
        currentAudioIndex: index,
      });
      return storeAudioForNextOpening(audio, index);
    }
  };

  componentDidMount(){
    this.context.loadPreviousAudio();
  }
  
  rowRenderer = (type, item, index, extendedState) => {
    return (
      <View style={{ marginVertical: 5 }}>
        <AudioList
          title={item.filename}
          duration={item.duration}
          isPlaying={extendedState.isPlaying}
          activeListItem={this.context.currentAudioIndex === index}
          onAudioPress={() => this.handleAudioPress(item)}
          onOptionPress={() => {
            this.currentItem = item;
            this.setState({ ...this.state, optionModalVisible: true });
          }}
        />
      </View>
    );
  };

  render() {
    return (
      <AudioContext.Consumer>
        {({ dataProvider, isPlaying }) => {
          if(!dataProvider._data.length) return null;
          return (
            <Screen>
              <StatusBar barStyle="dark-content" backgroundColor="white" />
              <RecyclerListView
                dataProvider={dataProvider}
                layoutProvider={this.layoutProvider}
                rowRenderer={this.rowRenderer}
                extendedState={{ isPlaying }}
              />
              <OptionModel
                onPlayPress={() => console.log("Playing audio")}
                onPlaylistPress={() => console.log("Playlist")}
                currentItem={this.currentItem}
                onclose={() =>
                  this.setState({ ...this.state, optionModalVisible: false })
                }
                visible={this.state.optionModalVisible}
              />
            </Screen>
          );
        }}
      </AudioContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  buttonText: {
    fontWeight: "bold",
    letterSpacing: 2,
    fontSize: 35,
    color: "#0B090A",
  },
  searchButton: {
    marginRight: 10,
    marginLeft: 10,
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
});
