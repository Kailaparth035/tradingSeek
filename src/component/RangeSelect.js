import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Slider from "@react-native-community/slider";
import Colors from "../theme/Color";
import Images from "../theme/Images";
// import { Range, getTrackBackground } from "react-range";

const RangeSelect = (props) => {
  return (
    <View
      style={{
        height: 50,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Slider
        style={{ width: 230, height: 50 }}
        value={props.range}
        minimumValue={0}
        maximumValue={100}
        step={1}
        // onValueChange={(value)=> console.log(value)}
        onSlidingComplete={props.selectRange}
        minimumTrackTintColor={Colors.BUTTON_LIGHTBLUE}
        maximumTrackTintColor={Colors.BLUE_DRESS}
      />
      <Text
        style={{ textAlign: "center", fontSize: 20, color: Colors.COLOR_BLACK }}
      >
        {props.range}
      </Text>
      <View style={{ marginLeft: 10 }}>
        <TouchableOpacity
          onSlidingComplete={props.selectRange}
          onPress={props.minus}
          style={{ backgroundColor: Colors.BorderColor, marginVertical: 5 }}
        >
          <Image source={Images.UpArrow} style={{ height: 20, width: 20 }} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={props.plus}
          style={{ backgroundColor: Colors.BorderColor }}
        >
          <Image source={Images.Down} style={{ height: 20, width: 20 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default RangeSelect;
