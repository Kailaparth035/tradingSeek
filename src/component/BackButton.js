import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Color from "../theme/Color";
import { scale } from "../theme/Scalling";

const BackButton = (props) => {
  return (
    <TouchableOpacity
      disabled={props.selectedQuestion == 0}
      style={[
        styles.button,
        props.selectedQuestion == 0
          ? { backgroundColor: Color.LIGHT_GREY }
          : { backgroundColor: Color.BackButton },
        { marginHorizontal: scale(7) },
      ]}
      onPress={props.backFunction}
    >
      <Text
        style={
          props.selectedQuestion == 0
            ? { color: "#9c9c9c", fontSize: 16 }
            : {
                color: Color.BACKGROUND_WHITE,
                fontSize: 16,
              }
        }
      >
        {props.buttonText}
      </Text>
    </TouchableOpacity>
  );
};
export default BackButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: scale(15),
    paddingVertical: scale(5),
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
