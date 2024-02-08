import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";
import Color from "../theme/Color";
import { scale } from "../theme/Scalling";
import Images from "../theme/Images";

const Header = (props) => {
  return (
    <SafeAreaView style={styles.header_view}>
      <TouchableOpacity
        style={styles.back_button}
        onPress={() => props.goBack()}
      >
        <Image source={Images.LeftArrow} style={styles.back_image} />
      </TouchableOpacity>
      <Text style={styles.header_text}>{props.header_title}</Text>
      <View style={styles.back_button}></View>
    </SafeAreaView>
  );
};
export default Header;
const styles = StyleSheet.create({
  header_view: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Color.BUTTON_LIGHTBLUE,
    paddingHorizontal: Platform.OS === "ios" ? scale(0) : scale(12),
    paddingTop: Platform.OS === "ios" ? scale(0) : scale(20),
  },

  back_button: {
    justifyContent: "center",
    flex: 0.2,
    paddingHorizontal: Platform.OS === "ios" ? scale(10) : 0,
  },
  back_image: {
    width: 20,
    height: 20,
    tintColor: Color.BACKGROUND_WHITE,
  },
  header_text: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: Color.BACKGROUND_WHITE,
    padding: scale(15),
  },
});
