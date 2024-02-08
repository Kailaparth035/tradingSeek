import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import Color from "../theme/Color";
import { scale } from "../theme/Scalling";

const ButtonComp = (props) => {
  // console.log("props", props);
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: props.disabled
            ? Color.DIABALEBUTTON_COLOR
            : Color.BUTTON_LIGHTBLUE,
          paddingHorizontal: props.paddingHorizontal,
          marginHorizontal: props.marginHorizontal,
        },
      ]}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      {props.image ? <Image source={props.image} style={styles.image} /> : null}
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
};
export default ButtonComp;

const styles = StyleSheet.create({
  button: {
    // backgroundColor:'red',
    justifyContent: "center",
    alignItems: "center",
    // height: scale(32),
    // height: Dimensions.get("window").height / 25,
    borderRadius: 5,
    flexDirection: "row",
    disablecolor: Color.DIABALEBUTTON_COLOR,
    marginTop: scale(10),
    paddingVertical: scale(5),
  },
  image: {
    height: scale(12),
    width: scale(12),
    tintColor: "white",
    marginRight: scale(3),
  },
  text: {
    color: Color.BACKGROUND_WHITE,
    fontSize: 15,
  },
});
