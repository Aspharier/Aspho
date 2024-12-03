import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import color from "./misc/color";
import AudioList from "./components/AudioList";
import { AudioContext } from "./context/AudioProvider";
import { selectAudio } from "./misc/audioController";
import OptionModel from "./components/OptionModel";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PlayListDetails = (props) => {
  const context = useContext(AudioContext);
  const playList = props.route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [audios, setAudios] = useState(playList.audios);

  const playAudio = async (audio) => {
    await selectAudio(audio, context, {
      activePlayList: playList,
      isPlayListRunning: true,
    });
  };

  const closeModal = () => {
    setSelectedItem({});
    setModalVisible(false);
  };

  const removeAudio = async () => {
    let isPlaying = context.isPlaying;
    let isPlayListRunning = context.isPlayListRunning;
    let soundObj = context.soundObj;
    let playbackPosition = context.playbackPosition;
    let activePlayList = context.activePlayList;

    if (
      context.isPlayListRunning &&
      context.currentAudio.id === selectedItem.id
    ) {
      // stop the audio
      await context.playbackObj.stopAsync();
      await context.playbackObj.unloadAsync();
      isPlaying = false;
      isPlayListRunning = false;
      soundObj = null;
      playbackPosition = 0;
      activePlayList = [];
    }
    const newAudios = audios.filter((audio) => audio.id !== selectedItem.id);
    const result = await AsyncStorage.getItem("PLAYLIST");
    if (result !== null) {
      const oldPlayList = JSON.parse(result);
      const updatedPlayList = oldPlayList.filter((item) => {
        if (item.id === playList.id) {
          item.audios = newAudios;
        }
        return item;
      });

      AsyncStorage.setItem("PLAYLIST", JSON.stringify(updatedPlayList));
      context.updateState(context, {
        playList: updatedPlayList,
        isPlayListRunning,
        activePlayList,
        playbackPosition,
        isPlaying,
        soundObj,
      });
    }
    setAudios(newAudios);
    closeModal();
  };

  const removePlayList = async () => {
    let isPlaying = context.isPlaying;
    let isPlayListRunning = context.isPlayListRunning;
    let soundObj = context.soundObj;
    let playbackPosition = context.playbackPosition;
    let activePlayList = context.activePlayList;

    if (context.isPlayListRunning && activePlayList.id === playList.id) {
      // stop the audio
      await context.playbackObj.stopAsync();
      await context.playbackObj.unloadAsync();
      isPlaying = false;
      isPlayListRunning = false;
      soundObj = null;
      playbackPosition = 0;
      activePlayList = [];
    }
    const result = await AsyncStorage.getItem("PLAYLIST");
    if (result !== null) {
      const oldPlayList = JSON.parse(result);
      const updatedPlayList = oldPlayList.filter(
        (item) => item.id !== playList.id
      );

      AsyncStorage.setItem("PLAYLIST", JSON.stringify(updatedPlayList));
      context.updateState(context, {
        playList: updatedPlayList,
        isPlayListRunning,
        activePlayList,
        playbackPosition,
        isPlaying,
        soundObj,
      });
    }
    props.navigation.goBack();
  };

  return (
    <>
      <View style={styles.container}>
        <View
          style={styles.headerContainer}
        >
          <Text style={styles.title}>{playList.title}</Text>
          <TouchableOpacity onPress={removePlayList}>
            <Text style={styles.deleteButton}>REMOVE</Text>
          </TouchableOpacity>
        </View>
        {audios.length ? (
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={audios}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 10 }}>
                <AudioList
                  title={item.filename}
                  duration={item.duration}
                  isPlaying={context.isPlaying}
                  activeListItem={item.id === context.currentAudio?.id}
                  onAudioPress={() => playAudio(item)}
                  onOptionPress={() => {
                    setSelectedItem(item);
                    setModalVisible(true);
                  }}
                  style={{
                    padding: 10,
                    backgroundColor: color.FONT,
                    borderRadius: 20,
                    elevation: 10,
                    shadowColor: "red",
                    shadowOpacity: 10,
                    marginBottom: 5,
                  }}
                />
              </View>
            )}
          />
        ) : (
          <Text
            style={{
              fontWeight: "bold",
              color: color.ACTIVE_BG,
              fontSize: 30,
              paddingTop: 50,
            }}
          >
            No Audio
          </Text>
        )}
      </View>
      <OptionModel
        visible={modalVisible}
        onclose={closeModal}
        options={[{ title: "Remove from PlayList", onPress: removeAudio }]}
        currentItem={selectedItem}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
  listContainer: {
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 35,
    paddingVertical: 15,
    fontWeight: "bold",
    color: "black",
  },
  deleteButton: {
    textAlign: "center",
    fontSize: 25,
    paddingVertical: 15,
    color: "gray",
    marginTop: 7,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  }
});

export default PlayListDetails;
