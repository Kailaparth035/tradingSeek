import React from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import Color from "../theme/Color";
import { scale } from "../theme/Scalling";
import Images from "../theme/Images";
import Loader from "../component/Loader";
const DeletPopUpCom = (props) => {
  return (
    <Modal
      visible={props.deletPopUpVisibale}
      transparent={true}
      animationType="slide"
    >
      <Image source={Images.Black} style={styles.modalBackground} />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={styles.container}>
          <Image source={Images.Exclamation} style={styles.exclamationImage} />
          <Text style={styles.headerText}>
            {props.DeletConfirmText}
            {/* Are you sure? */}
          </Text>
          <Text
            style={{
              color: Color.COLOR_BLACK,
              fontSize: 17,
              textAlign: "center",
            }}
          >
            {props.DeletExclamationmarkText}
            {/* You won't be able to revert this! */}
          </Text>
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={[
                styles.touchabaleButton,
                { backgroundColor: Color.BorderColor },
              ]}
              onPress={props.nodeletProfile}
            >
              <Text style={styles.buttonText}>
                {props.DeletNoButton}
                {/* No, cancel! */}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.touchabaleButton,
                { backgroundColor: Color.BLUE_DRESS },
              ]}
              onPress={props.yesDeletProfile}
            >
              <Text style={styles.buttonText}>
                {props.DeletYesButton}
                {/* Yes, delete it! */}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Loader val={props.loaderValue} />
      {/* </ImageBackground> */}
    </Modal>
  );
};
export default DeletPopUpCom;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginVertical: Dimensions.get("window").height / ,
    backgroundColor: Color.BACKGROUND_WHITE,
    marginHorizontal: scale(10),
    padding: scale(10),
    elevation: 2,
    borderRadius: scale(3),
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    color: Color.COLOR_BLACK,
    fontWeight: "500",
    textAlign: "center",
  },
  touchabaleButton: {
    flex: 1,
    padding: scale(5),
    paddingHorizontal: scale(10),
    borderRadius: scale(5),
    marginHorizontal: scale(5),
  },
  buttonText: {
    fontSize: 15,
    color: Color.BACKGROUND_WHITE,
    textAlign: "center",
  },
  exclamationImage: {
    height: 70,
    width: 70,
    tintColor: Color.LightOrange,
  },
  buttonView: {
    flexDirection: "row",
    margin: scale(15),
  },
  modalBackground: {
    position: "absolute",
    height: "100%",
    width: "100%",
    opacity: 0.8,
  },
});
