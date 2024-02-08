import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Color from "../theme/Color";
import { scale } from "../theme/Scalling";
import Images from "../theme/Images";

const Faqs = (props) => {
  // console.log("props ::", props.faqQuestion);
  return (
    <View style={styles.container}>
      <Text style={styles.header_text}>FAQ's</Text>
      <Text style={[styles.content_header_text, { color: Color.COLOR_BLACK }]}>
        Frequently Asked Questions
      </Text>
      <Text
        style={{
          color: Color.Grey,
          textAlign: "justify",
          marginHorizontal: scale(12),
          // borderBottomWidth: 1,
          // borderBottomColor: Color.BorderColor,
          padding: scale(10),
        }}
      >
        You have the option of creating Frequently Asked Questions for your
        customers. These show on your public profile and help customers
        understand a little more about your business.
      </Text>
      <Text
        style={[
          styles.content_header_text,
          {
            color: Color.BLUE_DRESS,
          },
        ]}
        onPress={() => props.addQuestion()}
      >
        Add Question
      </Text>
      <View style={styles.question_view}>
        <FlatList
          data={props.faqQuestion}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.question_flatlist_view}>
                <View>
                  <Text style={styles.question_text}>{item.question}</Text>
                  <Text style={styles.answer_text}>{item.answer}</Text>
                </View>
                <TouchableOpacity
                  style={{ alignSelf: "center" }}
                  onPress={() => props.delet_question(item._id)}
                >
                  <Image source={Images.Delet} style={styles.delet_image} />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};
export default Faqs;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.BACKGROUND_WHITE,
    marginTop: scale(10),
  },
  header_text: {
    fontSize: 15,
    fontWeight: "500",
    color: Color.COLOR_BLACK,
    paddingHorizontal: scale(12),
  },
  content_header_text: {
    fontSize: 15,
    fontWeight: "500",
    paddingTop: scale(10),
    paddingHorizontal: scale(10),
    marginHorizontal: scale(12),
  },
  question_view: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: Color.BorderColor,
    borderBottomColor: Color.BorderColor,
    margin: scale(15),
  },
  question_flatlist_view: {
    padding: scale(10),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  question_text: {
    fontSize: 16,
    marginBottom: scale(5),
    color: Color.COLOR_BLACK,
  },
  answer_text: {
    fontSize: 14,
    color: Color.Grey,
  },
  delet_image: {
    width: 22,
    height: 22,
    tintColor: Color.RED,
  },
});
