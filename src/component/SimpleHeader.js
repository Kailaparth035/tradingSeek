import React from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  View,
  Platform,
} from "react-native";
import Color from "../theme/Color";
import { scale } from "../theme/Scalling";

const SimpleHeader = (props) => {
  return (
    <SafeAreaView style={styles.header_view}>
      {props.rightbutton === true ? <View style={{ flex: 0.1 }}></View> : null}
      <Text style={styles.header_text}>{props.title}</Text>
      {props.rightbutton === true ? (
        <TouchableOpacity
          onPress={() => props.navigation()}
          style={{ flex: 0.13, alignItems: "flex-end" }}
        >
          <Image source={props.image} style={styles.header_setting_image} />
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
};
export default SimpleHeader;
const styles = StyleSheet.create({
  header_view: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.BUTTON_LIGHTBLUE,
    paddingTop: Platform.OS === "ios" ? scale(0) : scale(20),
    paddingHorizontal: scale(5),
  },
  header_text: {
    flex: 1,
    // alignSelf: "center",
    fontSize: 18,
    padding: 15,

    fontWeight: "600",
    color: Color.BACKGROUND_WHITE,
    textAlign: "center",
  },
  header_setting_image: {
    width: 24,
    height: 24,
    marginRight: 10,
    tintColor: Color.BACKGROUND_WHITE,
  },
});
