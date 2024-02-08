import React from "react";
import {
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  View,
} from "react-native";
import Images from "../theme/Images";
import { scale } from "../theme/Scalling";
import Colors from "../theme/Color";

const StaticChatModule = (props) => {
  // console.log("props.type ::", props.type);
  return (
    <TouchableOpacity onPress={props.openModule}>
      {props.type === "application/pdf" || props.type === "application/XLS" ? (
        <View style={styles.videoBackground}>
          <Image
            source={
              props.type === "application/pdf"
                ? Images.PDF
                : props.type === "application/XLS"
                ? Images.XLS
                : null
            }
            style={[
              styles.videoImage,
              {
                tintColor:
                  props.type === "application/pdf"
                    ? Colors.RED
                    : props.type === "application/XLS"
                    ? Colors.BLUE_DRESS
                    : null,
              },
            ]}
          />
        </View>
      ) : (
        <ImageBackground source={Images.Black} style={styles.videoBackground}>
          <Image
            source={props.type === "video" ? Images.Video : null}
            style={[styles.videoImage, { tintColor: Colors.BACKGROUND_WHITE }]}
          />
        </ImageBackground>
      )}
    </TouchableOpacity>
  );
};
export default StaticChatModule;

const styles = StyleSheet.create({
  videoBackground: {
    marginVertical: scale(5),
    height: 100,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  videoImage: {
    width: 50,
    height: 50,
  },
});
