import React from "react";
import { TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import Color from "../theme/Color";
import Images from "../theme/Images";
import { scale } from "../theme/Scalling";

const Option = (props) => {
  return (
    <TouchableOpacity
      style={[
        styles.option_button,
        { padding: scale(10), paddingHorizontal: scale(12) },
      ]}
      onPress={() => props.onPress()}
      disabled={props.disabled}
    >
      <Image source={props.image} style={styles.images} />
      <Text style={styles.text}>{props.label}</Text>
    </TouchableOpacity>
  );
};
export default Option;

const styles = StyleSheet.create({
  option_button: {
    flexDirection: "row",
    alignItems: "center",
  },
  images: {
    width: 24,
    height: 24,
    tintColor: Color.Grey,
    marginHorizontal: 10,
  },
  text: {
    marginHorizontal: scale(10),
    fontSize: 16,
    color: Color.Grey,
  },
});
