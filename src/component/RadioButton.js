import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { scale } from "../theme/Scalling";
import Color from "../theme/Color";

const RadioButton = (props) => {
  return (
    <View style={styles.choicesView}>
      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={props.selectRadioButton}
      >
        <TouchableOpacity
          style={[
            styles.radioView,
            props.answer_radio === props.choiceoption
              ? {
                  borderColor: Color.BUTTON_LIGHTBLUE,
                }
              : { borderColor: Color.LIGHT_GREY },
          ]}
          onPress={props.selectRadioButton}
        >
          <View
            style={[
              styles.radioinnerView,
              props.answer_radio == props.choiceoption
                ? {
                    backgroundColor: Color.BUTTON_LIGHTBLUE,
                  }
                : {
                    backgroundColor: Color.LIGHT_GREY,
                  },
            ]}
          ></View>
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: scale(5),
            fontSize: 16,
            color: Color.COLOR_BLACK,
          }}
        >
          {props.choiceitem}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default RadioButton;

const styles = StyleSheet.create({
  choicesView: {
    marginTop: scale(12),
  },
  radioView: {
    borderWidth: 1,
    height: 18,
    width: 18,
    // height: Dimensions.get("window").height / 24,
    // width: Dimensions.get("window").width / 12,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  radioinnerView: {
    backgroundColor: Color.BUTTON_LIGHTBLUE,
    height: 10,
    width: 10,
    // height: Dimensions.get("window").height / 30,
    // width: Dimensions.get("window").width / 18,
    borderRadius: 50,
    justifyContent: "center",
    alignSelf: "center",
  },
});
