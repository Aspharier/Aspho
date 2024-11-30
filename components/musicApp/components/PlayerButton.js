import React from "react";
import color from "../misc/color";
import { AntDesign } from "@expo/vector-icons";

export default function PlayerButton(props ) {
  const {
    iconType,
    size = 40,
    iconColor = color.COLOR_PREV,
    onPress,
    otherProps,
  } = props;
  const getIconName = (type) => {
    switch (type) {
      case "PLAY":
        return "pausecircleo";
      case "PAUSE":
        return "playcircleo";
      case "NEXT":
        return "stepforward";
      case "PREV":
        return "stepbackward";
    }
  };
  return (
    <AntDesign
      {...props}
      onPress={onPress}
      name={getIconName(iconType)}
      size={size}
      color={iconColor}
    />
  );
}
