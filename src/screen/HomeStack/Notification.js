import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import Color from "../../theme/Color";
import Header from "../../component/Header";
import { notification_option } from "../../theme/Array";
import { scale } from "../../theme/Scalling";
import Images from "../../theme/Images";
import Slider from "@react-native-community/slider";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const Notification = ({ navigation }) => {
  const [notification, setNotification] = useState(notification_option);
  const [experienceValue, setExperienceValue] = useState([0.0, 24.0]);
  const selectNotification_option = (item, key) => {
    let temp = notification;
    temp.map((tempItem) => {
      if (tempItem.id === item.id) {
        if (key === "sms") {
          if (tempItem.sms === false) {
            tempItem.sms = true;
          } else {
            tempItem.sms = false;
          }
        } else if (key === "email") {
          if (tempItem.email === false) {
            tempItem.email = true;
          } else {
            tempItem.email = false;
          }
        } else if (key === "app") {
          if (tempItem.app === false) {
            tempItem.app = true;
          } else {
            tempItem.app = false;
          }
        }
      }
    });
    // console.log("temp :::", temp);
    setNotification([...temp]);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle="dark-content"
      />
      <Header goBack={() => navigation.goBack()} header_title="Notification" />
      <ScrollView>
        <View
          style={[
            styles.header_view,
            {
              marginTop: scale(20),
              backgroundColor: Color.Dark_White,
              elevation: 10,
            },
          ]}
        >
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <Text style={styles.header_text}>Customer Account</Text>
          </View>
          <View style={{ flex: 0.33, alignItems: "center" }}>
            <Text style={styles.header_text}>SMS</Text>
          </View>
          <View style={{ flex: 0.33, alignItems: "center" }}>
            <Text style={styles.header_text}>Email</Text>
          </View>
          <View style={{ flex: 0.33, alignItems: "center" }}>
            <Text style={styles.header_text}>App</Text>
          </View>
        </View>
        {notification.map((mapItem) => {
          return (
            <View style={styles.header_view}>
              <View style={{ flex: 1, alignItems: "flex-start" }}>
                <Text style={styles.flatlist_text}>{mapItem.title}</Text>
              </View>
              <View style={{ flex: 0.33, alignItems: "center" }}>
                <TouchableOpacity
                  style={[
                    styles.CheckBoxView,
                    {
                      backgroundColor:
                        mapItem.sms === true
                          ? Color.BLUE_DRESS
                          : Color.BACKGROUND_WHITE,
                      borderColor:
                        mapItem.sms === true
                          ? Color.BLUE_DRESS
                          : Color.BorderColor,
                    },
                  ]}
                  onPress={() => selectNotification_option(mapItem, "sms")}
                >
                  {mapItem.sms === true ? (
                    <Image source={Images.Check} style={styles.CheckImage} />
                  ) : null}
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.33, alignItems: "center" }}>
                <TouchableOpacity
                  style={[
                    styles.CheckBoxView,
                    {
                      backgroundColor:
                        mapItem.email === true
                          ? Color.BLUE_DRESS
                          : Color.BACKGROUND_WHITE,
                      borderColor:
                        mapItem.email === true
                          ? Color.BLUE_DRESS
                          : Color.BorderColor,
                    },
                  ]}
                  onPress={() => selectNotification_option(mapItem, "email")}
                >
                  {mapItem.email === true ? (
                    <Image source={Images.Check} style={styles.CheckImage} />
                  ) : null}
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.33, alignItems: "center" }}>
                <TouchableOpacity
                  style={[
                    styles.CheckBoxView,
                    {
                      backgroundColor:
                        mapItem.app === true
                          ? Color.BLUE_DRESS
                          : Color.BACKGROUND_WHITE,
                      borderColor:
                        mapItem.app === true
                          ? Color.BLUE_DRESS
                          : Color.BorderColor,
                    },
                  ]}
                  onPress={() => selectNotification_option(mapItem, "app")}
                >
                  {mapItem.app === true ? (
                    <Image source={Images.Check} style={styles.CheckImage} />
                  ) : null}
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
        <Text
          style={[
            styles.header_text,
            { paddingTop: scale(30), paddingHorizontal: scale(10) },
          ]}
        >
          SMS notifications
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: Color.Grey,
            textAlign: "justify",
            margin: scale(10),
          }}
        >
          When would you like to receive SMS notifications from us?
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: scale(30),
          }}
        >
          <Text style={{ color: Color.COLOR_BLACK }}>
            From : {experienceValue[0]}
          </Text>
          <Text style={{ color: Color.COLOR_BLACK }}>
            To : {experienceValue[1]}
          </Text>
        </View>

        <MultiSlider
          values={[experienceValue[0], experienceValue[1]]}
          sliderLength={Dimensions.get("window").width / 1.2}
          onValuesChange={(value) => {
            // console.log("value :::", value), setExperienceValue(value);
          }}
          min={0.0}
          max={24.0}
          selectedStyle={{ backgroundColor: Color.BUTTON_LIGHTBLUE }}
          markerStyle={styles.markerStyle}
          textFormat="HH:mm"
          containerStyle={{ height: 20, paddingHorizontal: scale(20), flex: 1 }}
        />
      </ScrollView>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_WHITE,
  },
  header_view: {
    flexDirection: "row",
    padding: scale(10),
    borderBottomColor: Color.BorderColor,
    alignItems: "center",
  },
  header_text: {
    fontSize: 16,
    fontWeight: "500",
    color: Color.COLOR_BLACK,
  },
  flatlist_text: {
    fontSize: 16,
    fontWeight: "500",
    color: Color.Grey,
  },
  CheckBoxView: {
    width: 20,
    height: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    borderColor: Color.BorderColor,
  },
  CheckImage: {
    width: scale(15),
    height: scale(15),
    tintColor: Color.BACKGROUND_WHITE,
  },
  markerStyle: {
    backgroundColor: Color.BUTTON_LIGHTBLUE,
    height: 20,
    width: 20,
  },
});
