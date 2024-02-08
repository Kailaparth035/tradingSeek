import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
} from "react-native";
import { scale } from "../theme/Scalling";
import Color from "../theme/Color";
const TextInputComp = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <TextInput
          value={props.value}
          placeholder={props.placeholder}
          secureTextEntry={props.type ? true : false}
          style={props.textInputeStyle}
          onChangeText={props.onChangeText}
          keyboardType={props.keyboardType}
          onSubmitEditing={props.onSubmitEditing}
          autoCapitalize={props.autoCapitalize}
          onPressIn={props.onPressIn}
          maxLength={props.maxLength}
          multiline={props.multiline}
          textContentType={props.textContentType}
          placeholderTextColor={Color.Grey}
        />
        {props.icon ? (
          <TouchableOpacity onPress={props.iconPress}>
            <Image source={props.icon} style={styles.eyeImage} />
          </TouchableOpacity>
        ) : null}
      </View>

      {props.line ? <View style={styles.line}></View> : true}
    </View>
  );
};
export default TextInputComp;

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
  line: {
    borderBottomColor: Color.LIGHT_GREY,
    borderBottomWidth: 1,
    marginTop: scale(-2),
  },
  mainView: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: scale(10),
    justifyContent: "space-between",
  },
  eyeImage: {
    height: Dimensions.get("window").height / 40,
    width: Dimensions.get("window").width / 20,
    width: 20,
    height: 20,
    marginRight: scale(5),
  },
});
