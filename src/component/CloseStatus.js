import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from "react-native";
import { scale } from "../theme/Scalling";
import Color from "../theme/Color";
import Images from "../theme/Images";
import DropDownComp from "../component/DropDown";
import Loader from "./Loader";

const CloseStatus = (props) => {
  return (
    <Modal animationType="slide" transparent={true}>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        accessible={false}
        style={{ flex: 1 }}
      >
        <View style={styles.closeStatus_view}>
          <Image source={Images.Black} style={styles.blackBackground}></Image>
          <View
            style={[
              styles.statusUpdateModalView,
              {
                marginTop: props.scrollValue
                  ? Dimensions.get("window").height / 4
                  : Dimensions.get("window").height / 3,
              },
            ]}
          >
            <View style={styles.header_view}>
              <Text style={styles.updateJobstatusText}>{props.headerText}</Text>
              <TouchableOpacity onPress={() => props.closeModal()}>
                <Image source={Images.ViewClose} style={styles.closeImage} />
              </TouchableOpacity>
            </View>
            <KeyboardAvoidingView
              style={{ marginVertical: scale(5) }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <Text style={styles.instrucion_text}>
                {props.InstructionText}
              </Text>
              <DropDownComp
                selectedValue={props.selectedValue}
                placeholder="Select an option"
                data={props.data}
                labelField={props.labelField}
                valueField={props.valueField}
                dropdown={styles.dropdown2}
                selected={(val) => props.selectValue(val.status)}
              />
              {props.somethingselect ? (
                <View>
                  <TextInput
                    placeholder={"Enter reason Here.."}
                    onFocus={props.ScrollScreen}
                    onBlur={props.ScrollScreen1}
                    style={styles.textInpute}
                    multiline={true}
                    value={props.something}
                    onChange={(val) => props.somethingOnchange(val)}
                  />
                </View>
              ) : null}
              <TouchableOpacity
                style={[
                  styles.updateStatusButton,
                  {
                    backgroundColor: !props.somethingselect
                      ? props.selectedValue !== ""
                        ? Color.BUTTON_LIGHTBLUE
                        : Color.LIGHT_GREY
                      : props.something !== ""
                      ? Color.BUTTON_LIGHTBLUE
                      : Color.LIGHT_GREY,
                  },
                ]}
                disabled={
                  !props.somethingselect
                    ? props.selectedValue !== ""
                      ? false
                      : true
                    : props.something !== ""
                    ? false
                    : true
                }
                onPress={props.functionCall}
              >
                <Text
                  style={{
                    color: !props.somethingselect
                      ? props.selectedValue !== ""
                        ? Color.BACKGROUND_WHITE
                        : Color.Grey
                      : props.something !== ""
                      ? Color.BACKGROUND_WHITE
                      : Color.Grey,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  {props.buttonText}
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
            <Loader val={props.loaderResponse} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CloseStatus;

const styles = StyleSheet.create({
  statusUpdateModalView: {
    backgroundColor: "white",
    elevation: 10,
    shadowColor: Color.COLOR_BLACK,
    borderRadius: 5,

    width: "90%",
    marginHorizontal: scale(15),
  },
  updateJobstatusText: {
    color: Color.BACKGROUND_WHITE,
    fontSize: scale(16),
    fontWeight: "500",
    alignSelf: "center",
  },

  dropdown2: {
    borderColor: Color.BorderColor,
    borderWidth: 1,
    borderRadius: 5,
    color: Color.COLOR_BLACK,
    paddingHorizontal: scale(5),
    marginHorizontal: scale(15),
    padding: scale(5),
  },
  updateStatusButton: {
    padding: scale(8),
    borderRadius: scale(5),
    marginVertical: 10,
    marginHorizontal: scale(15),
  },
  blackBackground: {
    flex: 1,
    height: "100%",
    width: "100%",
    opacity: 0.7,
    position: "absolute",
  },
  closeStatus_view: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  header_view: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Color.BUTTON_LIGHTBLUE,
    paddingHorizontal: scale(15),
    paddingVertical: scale(7),
    borderTopLeftRadius: scale(5),
    borderTopRightRadius: scale(5),
  },
  closeImage: {
    height: 28,
    width: 28,
    tintColor: Color.BACKGROUND_WHITE,
    alignSelf: "center",
  },
  instrucion_text: {
    fontSize: scale(15),
    fontWeight: "600",
    color: Color.COLOR_BLACK,
    padding: scale(7),
    paddingHorizontal: scale(15),
  },
  textInpute: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Color.BorderColor,
    textAlignVertical: "top",
    marginHorizontal: scale(15),
    marginTop: scale(10),
    padding: scale(7),
  },
});
