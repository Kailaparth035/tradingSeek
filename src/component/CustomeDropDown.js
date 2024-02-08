import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import Color from "../theme/Color";
import { scale } from "../theme/Scalling";
import Images from "../theme/Images";
import { FlatList } from "react-native-gesture-handler";

const CustomeDropDown = (props) => {
  // console.log("props.data::", props.stateValue);
  return (
    <>
      <View
        style={[
          styles.container,
          {
            borderColor:
              props.stateValue === true ? Color.BLUE_DRESS : Color.BorderColor,
          },
        ]}
      >
        <Text
          style={[
            styles.dropDownTitle,
            {
              color: props.stateValue === true ? Color.BLUE_DRESS : Color.Grey,
            },
          ]}
        >
          {[props.dropDownTitle]}
        </Text>
        <TouchableOpacity
          style={styles.openDropDownButton}
          onPress={() => props.openDropDown()}
        >
          <Text style={styles.placeholderStyle}>
            {props.value !== undefined ? props.value : "Select sortby"}
          </Text>
          <Image
            source={Images.DropDown}
            style={[
              styles.dropDownImage,
              {
                transform:
                  props.stateValue === true
                    ? [{ rotate: "180deg" }]
                    : [{ rotate: "0deg" }],
              },
            ]}
          />
        </TouchableOpacity>
      </View>
      {props.stateValue === true ? (
        <View style={styles.dropDownContatiner}>
          <FlatList
            data={props.data}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={{
                    padding: scale(10),
                    backgroundColor: item.check
                      ? Color.LIGHT_GREY
                      : Color.BACKGROUND_WHITE,
                  }}
                  onPress={() => props.selectedVal(item)}
                >
                  <Text style={{ color: Color.COLOR_BLACK }}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}
    </>
  );
};
export default CustomeDropDown;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginTop: scale(15),
    borderRadius: scale(5),
  },
  dropDownTitle: {
    color: Color.Grey,
    position: "absolute",
    marginTop: scale(-10),
    marginHorizontal: scale(15),
    paddingHorizontal: scale(5),
    backgroundColor: Color.BACKGROUND_WHITE,
  },
  openDropDownButton: {
    flexDirection: "row",
    height: scale(40),
    justifyContent: "space-between",
    paddingHorizontal: scale(10),
    alignItems: "center",
  },
  placeholderStyle: {
    color: Color.COLOR_BLACK,
    fontSize: scale(16),
  },
  dropDownImage: {
    width: scale(15),
    height: scale(15),
    tintColor: Color.Grey,
  },
  dropDownContatiner: {
    height: scale(120),
    backgroundColor: Color.BACKGROUND_WHITE,
    borderRadius: scale(5),
    elevation: 10,
  },
});
