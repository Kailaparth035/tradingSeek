import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Color from "../theme/Color";
import { scale } from "../theme/Scalling";

const ModalButton = (props) => {
  // console.log("props.disabled::", props.disabled);
  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onPressButoon}
      style={[
        styles.button,
        {
          backgroundColor: props.selectedAnswer
            ? Color.BUTTON_LIGHTBLUE
            : Color.LIGHT_GREY,
          marginRight: scale(20),
          width: props.VerifyButton ? scale(118) : null,
        },
      ]}
    >
      <Text
        style={{
          color: props.selectedAnswer ? Color.BACKGROUND_WHITE : "#9c9c9c",
          fontSize: 16,
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};
export default ModalButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: scale(15),
    paddingVertical: scale(5),
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
