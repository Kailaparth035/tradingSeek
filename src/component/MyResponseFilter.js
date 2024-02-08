import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
} from "react-native";
import { scale } from "../theme/Scalling";
import Images from "../theme/Images";
import Color from "../theme/Color";

const MyResponseFilter = (props) => {
  const [allMessages, setAllMessages] = useState(false);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.FlatlistView}
        onPress={() => props.selectCheckBox(item)}
      >
        <Text style={styles.checkBoxText}>{item.title}</Text>
        <View
          style={[
            styles.CheckBoxView,
            {
              backgroundColor:
                item.check === true ? Color.BLUE_DRESS : Color.BACKGROUND_WHITE,
              borderColor:
                item.check === true ? Color.BLUE_DRESS : Color.BorderColor,
            },
          ]}
        >
          {item.check === true ? (
            <Image source={Images.Check} style={styles.CheckImage} />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <Modal
      visible={props.visible}
      onRequestClose={props.closeFilter}
      animationType={"slide"}
    >
      <View style={{ flex: 1 }}>
        <StatusBar
          translucent
          backgroundColor={"transparent"}
          barStyle="dark-content"
        />

        <View
          style={[
            styles.headerView,
            { paddingTop: Platform.OS === "ios" ? 50 : 0 },
          ]}
        >
          <TouchableOpacity onPress={props.closeFilter}>
            <Image
              source={Images.BackArrow}
              style={{
                width: 20,
                height: 20,
                tintColor: Color.BACKGROUND_WHITE,
              }}
            />
          </TouchableOpacity>
          <Text style={styles.headerTrext}>Filter</Text>
          <TouchableOpacity onPress={props.reset}>
            <Text style={{ color: Color.BACKGROUND_WHITE }}>Reset</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.FlatlistView}
          onPress={() => setAllMessages(!allMessages)}
        >
          <Text style={styles.checkBoxText}>All Messages</Text>
          <View
            style={[
              styles.CheckBoxView,
              {
                backgroundColor: allMessages
                  ? Color.BLUE_DRESS
                  : Color.BACKGROUND_WHITE,
                borderColor:
                  allMessages === true ? Color.BLUE_DRESS : Color.BorderColor,
              },
            ]}
          >
            {allMessages === true ? (
              <Image source={Images.Check} style={styles.CheckImage} />
            ) : null}
          </View>
        </TouchableOpacity>
        {allMessages ? (
          <TouchableOpacity
            style={[
              styles.FlatlistView,
              {
                paddingTop: scale(10),
                borderBottomWidth: 0.5,
                borderBottomColor: Color.LIGHT_GREY,
              },
            ]}
            onPress={() => setAllMessages(!allMessages)}
          >
            <View
              style={[
                styles.CheckBoxView,
                {
                  backgroundColor: allMessages
                    ? Color.BLUE_DRESS
                    : Color.BACKGROUND_WHITE,
                  borderColor:
                    allMessages === true ? Color.BLUE_DRESS : Color.BorderColor,
                },
              ]}
            >
              {allMessages === true ? (
                <Image source={Images.Check} style={styles.CheckImage} />
              ) : null}
            </View>
            <Text style={styles.checkBoxText}>All Messages</Text>
          </TouchableOpacity>
        ) : null}
        <FlatList data={props.data} renderItem={renderItem} />
      </View>
    </Modal>
  );
};

export default MyResponseFilter;

const styles = StyleSheet.create({
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: scale(15),
    paddingBottom: scale(10),
    backgroundColor: Color.BUTTON_LIGHTBLUE,
  },
  headerTrext: {
    fontSize: 18,
    fontWeight: "500",
    color: Color.BACKGROUND_WHITE,
  },
  closeIconView: {
    padding: scale(5),
    borderRadius: scale(5),
  },

  // checkBox View
  FlatlistView: {
    padding: scale(15),
    flexDirection: "row",
  },
  CheckBoxView: {
    width: 20,
    height: 20,
    borderWidth: 1,
    marginRight: scale(10),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  CheckImage: {
    width: 15,
    height: 15,
    tintColor: Color.BACKGROUND_WHITE,
  },
  checkBoxText: {
    flex: 1,
    color: Color.Light_Black,
    alignSelf: "center",
    fontSize: 15,
  },
  radioView: {
    borderWidth: 1,
    height: scale(18),
    width: scale(18),
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
  radioinnerView: {
    backgroundColor: Color.BUTTON_LIGHTBLUE,
    height: scale(10),
    width: scale(10),
    borderRadius: 10,
    justifyContent: "center",
    alignSelf: "center",
  },
});
