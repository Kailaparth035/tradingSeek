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

const MyJobListFilter = (props) => {
  const unread_renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.FlatlistView}
        onPress={() => props.selectCheckBox(item, "UnRead")}
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
        onPress={() => props.selectCheckBox(item, "actionBuyersHasTaken")}
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
        onPress={() => props.selectCheckBox(item, "subOptionForbuyers")}
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
        onPress={() => props.selectCheckBox(item, "actionnottaken")}
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
        onPress={() => props.selectCheckBox(item, "purchaseDate")}
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
          {props.profileDetails !== null &&
          props.profileDetails.userType === "Business User" ? (
            props.profileDetails.switchedToCustomerViewApk === false ? null : (
              <>
                <Text style={styles.filterTitle}>Category</Text>
                <View style={styles.filterView}>
                  <DropDownComp
                    selectedValue={props.selectedProfessionValue}
                    placeholder="Filter Category"
                    data={props.filterCategorydata}
                    labelField={"name"}
                    valueField={"name"}
                    dropdown={styles.dropdown}
                    selected={(item) => props.selectProfession(item)}
                  />
                  <TouchableOpacity
                    style={[styles.closeIconView]}
                    onPress={props.cancelProfession}
                  >
                    <Image
                      source={Images.Close}
                      style={styles.cancelSelection}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.filterTitle}>Status</Text>
                <View style={styles.filterView}>
                  <DropDownComp
                    selectedValue={props.selectedfilterStatusvalue}
                    placeholder="Filter Status"
                    data={props.FilterStatusData}
                    labelField={"status"}
                    valueField={"status"}
                    dropdown={styles.dropdown}
                    selected={(item) => props.selectFilterstatus(item.status)}
                  />
                  <TouchableOpacity
                    style={styles.closeIconView}
                    onPress={props.cancelFilterStatus}
                  >
                    <Image
                      source={Images.Close}
                      style={styles.cancelSelection}
                    />
                  </TouchableOpacity>
                </View>
              </>
            )
          ) : (
            <>
              <Text style={styles.filterTitle}>Category</Text>
              <View style={styles.filterView}>
                <DropDownComp
                  selectedValue={props.selectedProfessionValue}
                  placeholder="Filter Category"
                  data={props.filterCategorydata}
                  labelField={"name"}
                  valueField={"name"}
                  dropdown={styles.dropdown}
                  selected={(item) => props.selectProfession(item)}
                />
                <TouchableOpacity
                  style={[styles.closeIconView]}
                  onPress={props.cancelProfession}
                >
                  <Image source={Images.Close} style={styles.cancelSelection} />
                </TouchableOpacity>
              </View>
              <Text style={styles.filterTitle}>Status</Text>
              <View style={styles.filterView}>
                <DropDownComp
                  selectedValue={props.selectedfilterStatusvalue}
                  placeholder="Filter Status"
                  data={props.FilterStatusData}
                  labelField={"status"}
                  valueField={"status"}
                  dropdown={styles.dropdown}
                  selected={(item) => props.selectFilterstatus(item.status)}
                />
                <TouchableOpacity
                  style={styles.closeIconView}
                  onPress={props.cancelFilterStatus}
                >
                  <Image source={Images.Close} style={styles.cancelSelection} />
                </TouchableOpacity>
              </View>
            </>
          )}

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
            onPress={props.closeFilter}
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
export default MyJobListFilter;

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
    width: 10,
    height: 10,
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
