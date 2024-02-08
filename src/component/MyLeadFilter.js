import { propsFlattener } from "native-base/lib/typescript/hooks/useThemeProps/propsFlattener";
import React from "react";
import {
  View,
  Text,
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  StatusBar,
  Platform,
} from "react-native";
import Color from "../theme/Color";
import Images from "../theme/Images";
import { scale } from "../theme/Scalling";
import DropDownComp from "./DropDown";

const MyLeadFilter = (props) => {
  const category = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.FlatlistView}
        onPress={() => props.selectCheckBox(item, "category", "multiselect")}
      >
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
        <Text style={styles.checkBoxText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  const credit_rang = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.FlatlistView}
        onPress={() => props.selectCheckBox(item, "credit_rang", "multiselect")}
      >
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
        <Text style={styles.checkBoxText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  const Verified = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.FlatlistView}
        onPress={() =>
          props.selectCheckBox(item, "verified_proof", "singleselect")
        }
      >
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
        <Text style={styles.checkBoxText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  const sort_by = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.FlatlistView}
        onPress={() =>
          props.selectCheckBox(item, "sort_by_credit", "singleselect")
        }
      >
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
        <Text style={styles.checkBoxText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  const unread_renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.FlatlistView}
        onPress={() => props.selectCheckBox(item, "UnRead", "multiselect")}
      >
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
        <Text style={styles.checkBoxText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  const actionBuyersHasTaken_renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.FlatlistView}
        onPress={() =>
          props.selectCheckBox(item, "actionBuyersHasTaken", "multiselect")
        }
      >
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
        <Text style={styles.checkBoxText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  const subOptionForbuyers_renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.FlatlistView}
        onPress={() =>
          props.selectCheckBox(item, "subOptionForbuyers", "multiselect")
        }
      >
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
        <Text style={styles.checkBoxText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  const actionnottaken_renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.FlatlistView}
        onPress={() =>
          props.selectCheckBox(item, "actionnottaken", "multiselect")
        }
      >
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
        <Text style={styles.checkBoxText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  const purchaseDate_renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.FlatlistView}
        onPress={() =>
          props.selectCheckBox(item, "purchaseDate", "multiselect")
        }
      >
        <TouchableOpacity
          style={[
            styles.radioView,
            item.check === true
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
              item.check === true
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
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  // console.log("props.category", props.category);
  return (
    <Modal
      visible={props.visibale}
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
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.filterTitle}>Sort By</Text>
          <FlatList data={props.sort_by_credit} renderItem={sort_by} />
          <Text style={styles.filterTitle}>Verified</Text>
          <FlatList data={props.verifiedproof} renderItem={Verified} />
          <Text style={styles.filterTitle}>Credit Range</Text>
          <FlatList data={props.credit_range} renderItem={credit_rang} />
          <Text style={styles.filterTitle}>Category</Text>
          <FlatList data={props.category} renderItem={category} />
          <Text style={styles.filterTitle}>View</Text>
          <FlatList data={props.unreadData} renderItem={unread_renderItem} />
          <Text style={styles.filterTitle}>Actions buyers has taken </Text>
          <FlatList
            data={props.actionBuyersHasTaken}
            renderItem={actionBuyersHasTaken_renderItem}
          />
          <View style={{ marginLeft: scale(17) }}>
            <FlatList
              data={props.subOptionForbuyers}
              renderItem={subOptionForbuyers_renderItem}
            />
          </View>
          <Text style={styles.filterTitle}>Actions I've taken</Text>
          <FlatList
            data={props.actionnottaken}
            renderItem={actionnottaken_renderItem}
          />
          <Text style={styles.filterTitle}>Purchase date</Text>
          <FlatList
            data={props.purchaseDate}
            renderItem={purchaseDate_renderItem}
          />
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            marginBottom: scale(20),
          }}
        >
          <TouchableOpacity
            style={[styles.desideButton, { backgroundColor: Color.LIGHT_GREY }]}
            onPress={props.cancelButton}
          >
            <Text
              style={[styles.desideButtonText, { color: Color.COLOR_BLACK }]}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.desideButton,
              { backgroundColor: Color.BUTTON_LIGHTBLUE },
            ]}
            onPress={props.applyFilter}
          >
            <Text
              style={[
                styles.desideButtonText,
                { color: Color.BACKGROUND_WHITE },
              ]}
            >
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default MyLeadFilter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_WHITE,
    marginHorizontal: scale(15),
  },
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
  dropdown: {
    flex: 1,
    borderBottomColor: Color.BorderColor,
    paddingLeft: 3,
    padding: scale(5),
  },
  filterView: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
  },
  closeIcon: {
    width: scale(13),
    height: scale(13),
  },
  cancelSelection: {
    width: scale(10),
    height: scale(10),
  },
  desideButton: {
    flex: 1,
    padding: scale(7),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(5),
    marginHorizontal: scale(10),
  },
  desideButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  filterTitle: {
    marginTop: scale(12),
    fontSize: 16,
    color: Color.COLOR_BLACK,
    fontWeight: "600",
  },

  // checkBox View
  FlatlistView: {
    padding: scale(5),
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
  },
  radioView: {
    borderWidth: 1,
    height: 18,
    width: 18,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
  radioinnerView: {
    backgroundColor: Color.BUTTON_LIGHTBLUE,
    height: 10,
    width: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignSelf: "center",
  },
});
