import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { scale } from "../theme/Scalling";
import Color from "../theme/Color";

const DropDown = (props) => {
  return (
    // <View style={styles.container}>
    <Dropdown
      style={props.dropdown}
      containerStyle={styles.shadow}
      data={props.data}
      value={props.selectedValue}
      search
      searchPlaceholder="Search"
      labelField={props.labelField}
      valueField={props.valueField}
      placeholder={props.placeholder}
      onChange={props.selected}
      inputSearchStyle={{ fontSize: scale(10) }}
      dropdownPosition={"bottom"}
      selectedTextStyle={{ color: Color.COLOR_BLACK }}
      placeholderStyle={{ color: Color.Grey }}
    />
    // </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
