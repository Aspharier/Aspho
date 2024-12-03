import {
  View,
  Text,
  Modal,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import color from "../misc/color";

const PlaylistInputModel = ({ visible, onclose, onsubmit }) => {
  const [playListName, setPlaylistName] = useState("");

  const handleOnSubmit = () => {
    if (!playListName.trim()) {
      onclose();
    } else {
      onsubmit(playListName);
      setPlaylistName('');
      onclose();
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.inputContainer}>
          <Text
            style={{
              color: color.ACTIVE_BG,
              fontSize: 20,
              fontWeight: "bold",
              paddingBottom: 20,
            }}
          >
            CREATE NEW PLAYLIST
          </Text>
          <TextInput
            value={playListName}
            onChangeText={(text) => setPlaylistName(text)}
            style={styles.input}
          />
          <AntDesign
            name="check"
            size={40}
            color={color.ACTIVE_FONT}
            style={styles.submitIcon}
            onPress={handleOnSubmit}
          />
        </View>
      </View>
      <TouchableWithoutFeedback onPress={onclose}>
        <View style={[StyleSheet.absoluteFillObject, styles.modalBG]} />
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: width - 70,
    height: 250,
    borderRadius: 20,
    backgroundColor: color.APP_BG,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: width - 80,
    borderBottomWidth: 0,
    borderBottomColor: "black",
    fontSize: 18,
    padding: 15,
    color: "black",
    fontWeight: "bold",
    letterSpacing: 2,
  },
  submitIcon: {
    padding: 20,
    backgroundColor: color.ACTIVE_BG,
    borderRadius: 50,
    marginTop: 30,
    color: "white",
  },
  modalBG: {
    backgroundColor: color.MODAL_INPUT,
    zIndex: -1,
    elevation: 5,
    shadowColor: "red",
  },
});

export default PlaylistInputModel;
