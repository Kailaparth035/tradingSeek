import React from "react";
import {
  Modal,
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from "react-native";
import Images from "../theme/Images";
import Color from "../theme/Color";
import { scale } from "../theme/Scalling";
import DropDownComp from "../component/DropDown";
import Loader from "../component/Loader";

const UpdateStatus = (props) => {
  // console.log("props.visibale :::", props.visibale);
  return (
    <Modal
      visible={props.visibale}
      transparent={true}
      onRequestClose={() => props.closeModal()}
      animationType="slide"
    >
      <Image source={Images.Black} style={styles.background_image}></Image>
      <View style={{ flex: 1 }}>
        <View style={styles.statusUpdateModalView}>
          <View style={styles.updateStaus_view}>
            <Text style={styles.updateJobstatusText}>{props.headerText}</Text>
            <TouchableOpacity onPress={() => props.closeModal()}>
              <Image source={Images.ViewClose} style={styles.close_image} />
            </TouchableOpacity>
          </View>
          <View style={styles.content_view}>
            <Text style={styles.instruction_text}>{props.InstructionText}</Text>
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
          </View>
        </View>
        <Loader val={props.loaderValue} />
      </View>
    </Modal>
  );
};
export default UpdateStatus;

const styles = StyleSheet.create({
  statusUpdateModalView: {
    backgroundColor: "white",
    marginTop: Dimensions.get("window").height / 3,
    marginHorizontal: scale(15),
    elevation: 10,
    shadowColor: Color.COLOR_BLACK,
    borderRadius: 5,
  },
  updateJobstatusText: {
    color: Color.BACKGROUND_WHITE,
    fontSize: 16,
    fontWeight: "500",
  },
  closeTouchabaleOpacity: {
    marginTop: 10,
    marginLeft: 10,
    height: 22,
    width: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  dropdown2: {
    borderColor: Color.BorderColor,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: scale(5),
    // paddingHorizontal: 5,
    padding: scale(5),
  },
  updateStatusButton: {
    padding: scale(8),
    borderRadius: scale(5),
    marginBottom: scale(10),
    marginTop: scale(5),
  },
  background_image: {
    flex: 1,
    height: "100%",
    width: "100%",
    opacity: 0.7,
    position: "absolute",
  },
  updateStaus_view: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Color.BUTTON_LIGHTBLUE,
    paddingVertical: scale(7),
    paddingHorizontal: scale(10),
    alignItems: "center",
    borderTopLeftRadius: scale(5),
    borderTopRightRadius: scale(5),
  },
  close_image: {
    height: 30,
    width: 30,
    tintColor: Color.BACKGROUND_WHITE,
  },
  content_view: {
    marginVertical: scale(5),
    marginHorizontal: scale(15),
  },
  instruction_text: {
    fontSize: 15,
    color: Color.COLOR_BLACK,
    fontWeight: "500",
  },
  textInpute: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Color.BorderColor,
    textAlignVertical: "top",
  },
});
