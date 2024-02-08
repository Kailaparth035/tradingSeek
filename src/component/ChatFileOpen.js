import React, { useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Images from "../theme/Images";
import Colors from "../theme/Color";
import { scale } from "../theme/Scalling";
import VideoPlayer from "react-native-video-player";
import Pdf from "react-native-pdf";
import Video from "react-native-video";

const ChatFileOpen = (props) => {
  // console.log("type of document ::", props.typeOfDocument);
  const [bufferstate, setBufferState] = useState(true);
  // console.log("props.imageUri ::", props.imageUri);
  return (
    <Modal
      visible={props.visibale}
      onRequestClose={props.closeModal}
      transparent={true}
    >
      <Image source={Images.Black} style={styles.modalBackground} />
      <View
        style={[
          styles.imageModalView,
          {
            marginTop:
              props.typeOfDocument === "image"
                ? scale(100)
                : props.typeOfDocument === "video"
                ? scale(200)
                : 0,
            paddingVertical: props.typeOfDocument === "video" ? scale(10) : 10,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.touchabaleClose}
          onPress={props.closeModal}
        >
          <Image source={Images.Close} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
        {props.typeOfDocument === "image" ? (
          <View>
            <Image
              source={{ uri: props.imageUri }}
              style={styles.Image}
              resizeMode="stretch"
            />
            <Text
              style={{
                color: Colors.COLOR_BLACK,
                fontSize: scale(15),
                margin: scale(5),
              }}
            >
              {props.imageUri.split("%")[1]}
            </Text>
          </View>
        ) : props.typeOfDocument === "video" ? (
          <View>
            <ActivityIndicator
              size="large"
              color="black"
              animating={bufferstate}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              }}
            />

            <VideoPlayer
              video={{
                uri: props.imageUri,
              }}
              fullscreen={true}
              fullscreenAutorotate={true}
              endThumbnail={true}
              autoplay={true}
              hideControlsOnStart={bufferstate}
              onVideoLoad={() => setBufferState(false)}
            />
            <Text
              style={{
                color: Colors.COLOR_BLACK,
                fontSize: scale(15),
                margin: scale(5),
              }}
            >
              {props.imageUri.split("%")[4].split("_")[1]}
              {/* {props.imageUri.split("%")[1]} */}
            </Text>
          </View>
        ) : props.typeOfDocument === "application/pdf" ? (
          <Pdf
            source={{ uri: props.imageUri }}
            style={styles.pdf}
            onLoadComplete={(numberOfPages) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
          />
        ) : null}
      </View>
    </Modal>
  );
};

export default ChatFileOpen;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    position: "absolute",
    height: "100%",
    width: "100%",
    opacity: 0.2,
  },
  imageModalView: {
    justifyContent: "center",
    paddingHorizontal: 5,
    backgroundColor: Colors.BACKGROUND_WHITE,
    marginHorizontal: scale(10),
    borderRadius: scale(5),
  },
  touchabaleClose: {
    alignSelf: "flex-end",
    backgroundColor: Colors.LIGHT_GREY,
    padding: 5,
    marginVertical: scale(5),
    borderRadius: scale(5),
  },
  Image: {
    width: 320,
    height: 400,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: Colors.COLOR_BLACK,
  },
  pdf: {
    width: 200,
    height: 200,
  },
});
