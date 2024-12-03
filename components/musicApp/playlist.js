import {
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import color from "./misc/color";
import PlaylistInputModel from "./components/PlaylistInputModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AudioContext } from "./context/AudioProvider";
import PlayListDetails from "./components/playListDetails";

let selectedPlayList = {};

const PlayList = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showPlayList, setShowPlayList] = useState(false);

  const context = useContext(AudioContext);
  const { playList, addToPlayList, updateState } = context;

  const createPlayList = async (playListName) => {
    const result = await AsyncStorage.getItem("PLAYLIST");
    if (result !== null) {
      const audios = [];
      if (addToPlayList) {
        audios.push(addToPlayList);
      }
      const newList = {
        id: Date.now(),
        title: playListName,
        audios: audios,
      };

      const updatedList = [...playList, newList];
      updateState(context, { addToPlayList: null, playList: updatedList });
      await AsyncStorage.setItem("PLAYLIST", JSON.stringify(updatedList));
    }

    setModalVisible(false);
  };

  const renderPlayList = async () => {
    const result = await AsyncStorage.getItem("PLAYLIST");
    if (result === null) {
      const defaultPlayList = {
        id: Date.now(),
        title: "MY FAVORITE",
        audios: [],
      };

      const newPlayList = [...playList, defaultPlayList];
      updateState(context, { playList: [...newPlayList] });
      return await AsyncStorage.setItem(
        "PLAYLIST",
        JSON.stringify([...newPlayList])
      );
    }

    updateState(context, { playList: JSON.parse(result) });
  };

  useEffect(() => {
    if (!playList.length) {
      renderPlayList();
    }
  }, []);

  const handleBannerPress = async (playList) => {
    if (addToPlayList) {
      const result = await AsyncStorage.getItem("PLAYLIST");

      let oldList = [];
      let updatedList = [];
      let sameAudio = false;

      if (result !== null) {
        oldList = JSON.parse(result);

        updatedList = oldList.filter((list) => {
          if (list.id === playList.id) {
            // we want to check is that same audio is already inside our list or not
            for (let audio of list.audios) {
              if (audio.id === addToPlayList.id) {
                // alert with some message
                sameAudio = true;
                return;
              }
            }

            //update our playlist if there is any selected audio
            list.audios = [...list.audios, addToPlayList];
          }
          return list;
        });
      }

      if (sameAudio) {
        Alert.alert(
          "Found same Audio!",
          `${addToPlayList.filename} is already inside the list.`
        );
        sameAudio = false;
        return updateState(context, { addToPlayList: null });
      }

      updateState(context, { addToPlayList: null, playList: [...updatedList] });
      return AsyncStorage.setItem("PLAYLIST", JSON.stringify([...updatedList]));
    }

    // if there is not audio selected then we want to open the list
    selectedPlayList = playList;
    //setShowPlayList(true);
    navigation.navigate('PlayListDetails',playList);
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        {playList.length
          ? playList.map((item) => (
              <TouchableOpacity
                key={item.id.toString()}
                style={styles.playlistBanner}
                onPress={() => handleBannerPress(item)}
              >
                <Text style={styles.commonText}>{item.title}</Text>
                <Text style={styles.audioCount}>
                  {item.audios.length > 1
                    ? `${item.audios.length} Songs`
                    : `${item.audios.length} Song`}
                </Text>
              </TouchableOpacity>
            ))
          : null}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{ marginTop: 15 }}
        >
          <Text style={styles.playListButton}>+ Add New Playlist</Text>
        </TouchableOpacity>
        <PlaylistInputModel
          visible={modalVisible}
          onclose={() => setModalVisible(false)}
          onsubmit={createPlayList}
        />
      </ScrollView>
      <PlayListDetails visible={showPlayList} playList={selectedPlayList} onclose={() => setShowPlayList(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },
  commonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: color.ACTIVE_BG,
  },
  audioCount: {
    marginTop: 3,
    color: "black",
    fontSize: 15,
  },
  playlistBanner: {
    padding: 10,
    backgroundColor: color.FONT,
    borderRadius: 20,
    elevation: 10,
    shadowColor: "red",
    shadowOpacity: 10,
    marginBottom: 15,
  },
  playListButton: {
    color: color.ACTIVE_FONT,
    letterSpacing: 1,
    fontWeight: "bold",
    fontSize: 25,
    padding: 5,
  },
});

export default PlayList;
