import {
  View,
  Text,
  Modal,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import color from "../misc/color";
import AudioList from "./AudioList";
import { selectAudio } from "../misc/audioController";

const PlayListDetails = ({ visible, playList, onclose }) => {
  const playAudio = (audio) => {
    selectAudio(audio, );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onclose}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{playList.title}</Text>
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={playList.audios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(item) => (
            <View style={{ marginBottom: 10 }}>
              <AudioList
                title={item.filename}
                duration={item.duration}
                onAudioPress={() => playAudio(item)}
              />
            </View>
          )}
        />
      </View>
      <View style={[StyleSheet.absoluteFillObject, styles.modalBG]} />
    </Modal>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    height: height - 150,
    width: width - 10,
    backgroundColor: color.ACTIVE_BG,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
  },
  modalBG: {
    backgroundColor: color.MODAL_BG,
    zIndex: -1,
  },
  listContainer: {
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 35,
    paddingVertical: 5,
    fontWeight: "bold",
    color: color.FONT,
  },
});

export default PlayListDetails;
