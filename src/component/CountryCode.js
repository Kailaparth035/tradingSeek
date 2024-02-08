import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";
import Color from "../theme/Color";
import countryCode from "../../countryCode.json";

const CountryCode = (props) => {
  return (
    <Modal transparent visible={props.countrymodal}>
      <TouchableWithoutFeedback onPress={props.closeCountrymodal}>
        <View style={{ flex: 1 }}>
          <View style={styles.modal_container}>
            <TextInput
              style={{ height: Platform.OS === "ios" ? 40 : 40 }}
              placeholder="search here"
              onChangeText={(text) => props.searchfunction(text)}
            />
            <FlatList
              data={props.country}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={styles.modal_button}
                    onPress={() =>
                      props.countryselect(item.dial_code, item.code)
                    }
                  >
                    <Text style={styles.modal_text}>{item.code}</Text>
                    <Text
                      style={{
                        marginLeft: 5,
                        color: "black",
                      }}
                    >
                      ({item.dial_code})
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
export default CountryCode;

const styles = StyleSheet.create({
  modal_container: {
    height: 300,
    width: 100,
    backgroundColor: Color.BACKGROUND_WHITE,
    marginTop: "85%",
    borderRadius: 5,
    marginLeft: "8%",
  },
  modal_button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 0.5,
    borderTopColor: "black",
    paddingVertical: "5%",
  },
  modal_text: {
    color: "black",
  },
});
