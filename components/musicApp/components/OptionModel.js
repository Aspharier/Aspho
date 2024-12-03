import {
  View,
  Text,
  StyleSheet,
  Modal,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import color from "../misc/color";

export default function OptionModel({
  visible,
  onclose,
  currentItem,
  options,
  onPlayPress,
  onPlaylistPress,
}) {
  const { filename } = currentItem;
  return (
    <>
      <StatusBar backgroundColor="white" />
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.modal}>
          <Text style={styles.title} numberOfLines={2}>
            {filename}
          </Text>
          <View style={styles.optionContainer}>
            {options.map((optn) => {
              return (
                <TouchableWithoutFeedback
                  key={optn.title}
                  onPress={optn.onPress}
                >
                  <Text style={styles.option}>{optn.title}</Text>
                </TouchableWithoutFeedback>
              );
            })}
            {/* <TouchableWithoutFeedback onPress={onPlayPress}>
              <Text style={styles.option}>Play</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onPlaylistPress}>
              <Text style={styles.option}>Add to Playlist</Text>
            </TouchableWithoutFeedback> */}
          </View>
        </View>
        <TouchableWithoutFeedback onPress={onclose}>
          <View style={styles.modalBg} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: color.APP_BG,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    zIndex: 1000,
    elevation: 10,
  },
  optionContainer: {
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 20,
    paddingBottom: 0,
    color: color.FONT_MEDIUM,
  },
  option: {
    fontSize: 20,
    fontWeight: "bold",
    color: color.MODAL_FONT,
    paddingVertical: 10,
    letterSpacing: 1,
  },
  modalBg: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: color.MODAL_BG,
  },
});
