import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import Color from "../theme/Color";
import Images from "../theme/Images";
import { scale } from "../theme/Scalling";
const HeaderComp = (props) => {
  // console.log("props.backOption", props);
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: props.backOption === "AfterLogin" ? "row" : "column",
          marginBottom: props.backOption === "AfterLogin" ? scale(10) : 0,
        },
      ]}
    >
      {props.backOption === "AfterLogin" ? (
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{ padding: scale(10) }}
        >
          <Image
            source={Images.BackArrow}
            style={{ width: scale(24), height: scale(24) }}
          />
        </TouchableOpacity>
      ) : null}
      <Image
        source={Images.logo}
        style={{
          width: scale(props.width),
          height: scale(props.height),
          margin: props.backOption === "AfterLogin" ? scale(45) : 0,
        }}
      />
    </View>
  );
};
export default HeaderComp;

const styles = StyleSheet.create({
  container: {
    height: scale(70),
    alignItems: "center",
    backgroundColor: Color.BACKGROUND_WHITE,
    justifyContent: "flex-start",
  },
});
