import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import color from "../misc/color";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const getThubnailText = (filename) => filename[0];

const convertTime = (minutes) => {
  if (minutes) {
    const hrs = minutes / 60;
    const minute = hrs.toString().split(".")[0];
    const percent = parseInt(hrs.toString().split(".")[1].slice(0, 2));
    const sec = Math.ceil((60 * percent) / 100);

    if (parseInt(minute) < 10 && sec < 10) {
      return `0${minute}:0${sec}`;
    }

    if (parseInt(minute) < 10) {
      return `0${minute}:${sec}`;
    }

    if (sec < 10) {
      return `${minute}:0${sec}`;
    }

    return `${minute}:${sec}`;
  }
};

const renderPlayPauseIcon = (isPlaying) => {
  if (isPlaying) return <FontAwesome6 name="pause" size={30} color={color.ACTIVE_FONT} />
  return <FontAwesome6 name="play" size={30} color={color.ACTIVE_FONT} />;
};

export default function AudioList({
  title,
  duration,
  onOptionPress,
  onAudioPress,
  isPlaying,
  activeListItem,
}) {
  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={onAudioPress}>
            <View style={styles.leftContainer}>
              <View style={[styles.thumbnail, {backgroundColor: activeListItem ? color.ACTIVE_BG : color.FONT_LIGHT}]}>
                <Text style={styles.thumbnailText}>
                  {activeListItem
                    ? renderPlayPauseIcon(isPlaying)
                    : getThubnailText(title)}
                </Text>
              </View>
              <View style={styles.titleContainer}>
                <Text numberOfLines={1} style={styles.title}>
                  {title}
                </Text>
                <Text style={styles.timeText}>{convertTime(duration)}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.rightContainer}>
            <Entypo
              onPress={onOptionPress}
              name="dots-three-vertical"
              size={20}
              color={color.FONT_MEDIUM}
              style={{ padding: 10 }}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
  },
  container: {
    flexDirection: "row",
    alignSelf: "center",
    width: width - 60,
    backgroundColor: "white",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rightContainer: {
    flexBasis: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  thumbnail: {
    flexBasis: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.FONT_LIGHT,
    borderRadius: 25,
  },
  thumbnailText: {
    fontSize: 30,
    fontWeight: "bold",
    color: color.FONT,
  },
  titleContainer: {
    width: width - 180,
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
    color: color.TITLE_TEXT,
    fontWeight: "bold",
  },
  timeText: {
    fontSize: 14,
    color: color.FONT_LIGHT,
    fontWeight: "bold",
  },
});
