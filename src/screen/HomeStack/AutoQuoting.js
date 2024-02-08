import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Switch,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Color from "../../theme/Color";
import Images from "../../theme/Images";
import Header from "../../component/Header";

import AsyncStorage from "../../helper/AsyncStorage";
import { scale } from "../../theme/Scalling";
import MultiSelect from "react-native-multiple-select";
import { useDispatch, useSelector } from "react-redux";
import ReduxActions from "../../helper/ReduxActions";
import AusLocation from "../../../duplicate_aus.json";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Loader from "../../component/Loader";

const AutoQuoting = ({ navigation }) => {
  const dispatch = useDispatch();
  const loaderResponse = useSelector((state) => state.loader);
  const professionResponse = useSelector((state) => state.profession);
  const [profileDetails, setProfileDetails] = useState(null);
  const [autoQuote_switch, setAutoQuote_switch] = useState(true);
  const [credit, setCredit] = useState("");
  const [selectProfession, setSelectProfession] = useState([]);
  const [professiondata, setProfessiondata] = useState([]);
  const [selectLocation, setSelectLocation] = useState([]);
  const [checkBox, setCheckBox] = useState(false);
  const [message, setMessage] = useState("");
  const [autoQuote_pause_switch, setAutoQuote_pause_switch] = useState(false);
  const [openFirstDatePicker, setOpenFirstDatePicker] = useState(false);
  const [openSecondDatePicker, setOpenSecondDatePicker] = useState(false);
  const [firstDate, setFirstDate] = useState(null);
  const [secondDate, setSecondDate] = useState(null);
  const [addDate, setAddDate] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("userProfile").then((profileData) => {
      console.log("profileData.userAType", JSON.parse(profileData));
      setProfileDetails(JSON.parse(profileData));
      setCheckBox(JSON.parse(profileData).allLocations);
    });
  }, []);

  const onSelectedItemsChange = (selectedItems) => {
    setSelectProfession([...selectedItems]);
  };

  const onSelectLocation = (selectedItems) => {
    setSelectLocation([...selectedItems]);
  };
  useEffect(() => {
    if (professionResponse.data !== null) {
      // console.log("profession response ::", professionResponse.data);
      setProfessiondata(professionResponse.data);
    } else {
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.ProfessionRequest());
    }
  }, [professionResponse.data]);

  const checkbox_click = () => {
    setCheckBox(!checkBox);
  };

  const hideDatePicker = () => {
    setOpenFirstDatePicker(false);
    setOpenSecondDatePicker(false);
  };
  const handleConfirm_firstDate = (data) => {
    setFirstDate(FormatDate(data));
    hideDatePicker();
  };

  const handleConfirm_secondDate = (data) => {
    setSecondDate(FormatDate(data));
    hideDatePicker();
  };
  const FormatDate = (data) => {
    let dateTimeString =
      data.getFullYear() + "-" + (data.getMonth() + 1) + "-" + data.getDate();
    return dateTimeString;
  };

  const autoQuotepauseDate = () => {
    if (autoQuote_pause_switch === true) {
      setAutoQuote_pause_switch(false);
      setAddDate(false);
    } else {
      setAutoQuote_pause_switch(true);
      setFirstDate(null), setSecondDate(null);
    }
  };

  const save_auto_quotes = () => {
    let temp_location = [];
    let temp_profession = [];
    if (selectLocation.length !== 0) {
      selectLocation.map((mapItem) => {
        temp_location.push({ locality: mapItem });
      });
    }
    if (selectProfession.length !== 0) {
      selectProfession.map((selItem) => {
        // console.log("professiondata ::", professiondata._id);
        // console.log("professiondata ::", selectProfession);
        professiondata.map((proItem) => {
          if (selItem === proItem.name) {
            temp_profession.push(proItem);
          }
        });
      });
    }
    let bodyData = {
      autoQuote: true,
      autoQuotedLocations: temp_location,
      autoQuotedProfessions: temp_profession,
      autoQuotedMessage: message,
      dailyCredits: credit,
      autoQuotePauseDates: [
        {
          startDate: firstDate,
          endDate: secondDate,
        },
      ],
      autoQuotePause: autoQuote_pause_switch,
      autoQuoteAllLocations: checkBox,
    };
    // console.log("bodyData::", bodyData);
    dispatch(ReduxActions.loaderAction(true));
    dispatch(ReduxActions.AutoQuoteRequest(bodyData));
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle="dark-content"
      />

      <Header goBack={() => navigation.goBack()} header_title="Auto Quoting" />
      <ScrollView>
        <View
          style={[
            styles.autoQuote_view,
            { marginTop: scale(15), flexDirection: "row" },
          ]}
        >
          <Text style={[styles.autoquote_text, { alignSelf: "center" }]}>
            Auto Quote :
          </Text>
          <View style={{ marginHorizontal: scale(10), alignSelf: "center" }}>
            <Switch
              trackColor={{
                false: Color.BorderColor,
                true: Color.BUTTON_LIGHTBLUE,
              }}
              thumbColor={
                autoQuote_switch
                  ? Color.BACKGROUND_WHITE
                  : Color.BACKGROUND_WHITE
              }
              ios_backgroundColor={Color.BorderColor}
              onValueChange={() => setAutoQuote_switch(!autoQuote_switch)}
              value={autoQuote_switch}
            />
          </View>
        </View>
        {autoQuote_switch ? (
          <>
            <View style={styles.autoQuote_view}>
              <Text style={styles.autoquote_text}>Daily Credits :</Text>
              <TextInput
                style={styles.credit_textinpute}
                onChangeText={(text) => setCredit(text)}
                value={credit}
                placeholder={"Enter Credit"}
                placeholderTextColor={Color.Grey}
              />
            </View>
            <View
              style={[
                styles.autoQuote_view,
                { marginVertical: scale(0), marginTop: scale(10) },
              ]}
            >
              <Text style={styles.autoquote_text}>Auto Quote Locations :</Text>
              <View style={{ marginLeft: scale(15), marginRight: scale(10) }}>
                <MultiSelect
                  hideTags
                  items={
                    profileDetails !== null
                      ? checkBox === false
                        ? profileDetails.locations
                        : AusLocation
                      : AusLocation
                  }
                  uniqueKey="locality"
                  onSelectedItemsChange={onSelectLocation}
                  selectedItems={selectLocation}
                  selectText={
                    selectLocation.length !== 0 ? selectLocation : "Location"
                  }
                  searchInputPlaceholderText="Search Items..."
                  itemFontSize={scale(14)}
                  fontSize={14}
                  textColor={Color.COLOR_BLACK}
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#CCC"
                  tagTextColor="#CCC"
                  itemTextColor="#000"
                  displayKey="locality"
                  searchInputStyle={{ color: "#CCC" }}
                  submitButtonColor={Color.BUTTON_LIGHTBLUE}
                  submitButtonText="Submit"
                  styleItemsContainer={{
                    backgroundColor: Color.BACKGROUND_WHITE,
                    paddingVertical: scale(7),
                    height: Dimensions.get("window").height / 3,
                  }}
                  // onToggleList={() => update_location()}
                />
              </View>
            </View>
            <View
              style={[
                styles.autoQuote_view,
                {
                  paddingVertical: scale(0),
                  marginBottom: scale(10),
                  flexDirection: "row",
                },
              ]}
            >
              <Text style={[styles.autoquote_text, { alignSelf: "center" }]}>
                Auto Quote for all locations :
              </Text>
              <TouchableOpacity
                style={[
                  styles.checkbox_button,
                  {
                    borderColor: checkBox
                      ? Color.BLUE_DRESS
                      : Color.BorderColor,
                    backgroundColor: checkBox
                      ? Color.BLUE_DRESS
                      : Color.BACKGROUND_WHITE,
                  },
                ]}
                onPress={() => checkbox_click()}
              >
                {checkBox ? (
                  <Image source={Images.Check} style={styles.CheckImage} />
                ) : null}
              </TouchableOpacity>
            </View>
            <View style={styles.autoQuote_view}>
              <Text style={styles.autoquote_text}>Professions :</Text>
              <View style={{ marginLeft: scale(15), marginRight: scale(10) }}>
                <MultiSelect
                  hideTags
                  items={
                    profileDetails !== null
                      ? profileDetails.professions
                      : professiondata
                  }
                  uniqueKey="name"
                  onSelectedItemsChange={onSelectedItemsChange}
                  selectedItems={selectProfession}
                  selectText={
                    selectProfession.length !== 0
                      ? selectProfession
                      : "Services"
                  }
                  searchInputPlaceholderText="Search Items..."
                  itemFontSize={scale(14)}
                  fontSize={14}
                  textColor={Color.COLOR_BLACK}
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#CCC"
                  tagTextColor="#CCC"
                  itemTextColor="#000"
                  displayKey="name"
                  searchInputStyle={{
                    color: "#CCC",
                    paddingVertical: scale(10),
                  }}
                  submitButtonColor={Color.BUTTON_LIGHTBLUE}
                  submitButtonText="Submit"
                  styleItemsContainer={{
                    backgroundColor: Color.BACKGROUND_WHITE,
                    paddingVertical: scale(7),
                    height: Dimensions.get("window").height / 3,
                  }}
                  // onToggleList={() => update_profession()}
                />
              </View>
            </View>
            <View style={styles.autoQuote_view}>
              <Text style={styles.autoquote_text}>Message :</Text>
              <TextInput
                style={styles.credit_textinpute}
                onChangeText={(text) => setMessage(text)}
                value={message}
                placeholder={"Type here..."}
                placeholderTextColor={Color.Grey}
              />
            </View>
            <View style={[styles.autoQuote_view, { flexDirection: "row" }]}>
              <Text style={[styles.autoquote_text, { alignSelf: "center" }]}>
                Auto Quote Pause :
              </Text>
              <View
                style={{ marginHorizontal: scale(10), alignSelf: "center" }}
              >
                <Switch
                  trackColor={{
                    false: Color.BorderColor,
                    true: Color.BUTTON_LIGHTBLUE,
                  }}
                  thumbColor={
                    autoQuote_pause_switch
                      ? Color.BACKGROUND_WHITE
                      : Color.BACKGROUND_WHITE
                  }
                  ios_backgroundColor={Color.BorderColor}
                  onValueChange={
                    () => autoQuotepauseDate()
                    // setAutoQuote_pause_switch(!autoQuote_pause_switch)
                  }
                  value={autoQuote_pause_switch}
                />
              </View>
            </View>
            {autoQuote_pause_switch ? (
              <View style={[styles.autoQuote_view, { flexDirection: "row" }]}>
                <Text
                  style={[styles.autoquote_text, { alignSelf: "flex-start" }]}
                >
                  Pause Date :
                </Text>

                <View style={{ marginHorizontal: scale(10) }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: Color.COLOR_BLACK }}>
                      From Date :
                    </Text>
                    <TouchableOpacity
                      style={{
                        borderBottomWidth: 1,
                        marginHorizontal: scale(10),
                      }}
                      onPress={() => setOpenFirstDatePicker(true)}
                    >
                      <Text style={{ flex: 1, color: Color.COLOR_BLACK }}>
                        {firstDate !== null ? firstDate : "Select Date"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: "row", marginTop: scale(5) }}>
                    <Text style={{ color: Color.COLOR_BLACK }}>
                      To Date : {"    "}
                    </Text>
                    <TouchableOpacity
                      style={{
                        borderBottomWidth: 1,
                        marginHorizontal: scale(10),
                      }}
                      onPress={() => setOpenSecondDatePicker(true)}
                    >
                      <Text style={{ flex: 1, color: Color.COLOR_BLACK }}>
                        {secondDate !== null ? secondDate : "Select Date"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <DateTimePickerModal
                    isVisible={openFirstDatePicker}
                    mode="date"
                    onConfirm={handleConfirm_firstDate}
                    onCancel={hideDatePicker}
                  />
                  <DateTimePickerModal
                    isVisible={openSecondDatePicker}
                    mode="date"
                    onConfirm={handleConfirm_secondDate}
                    onCancel={hideDatePicker}
                  />
                </View>
                <TouchableOpacity
                  style={styles.add_touchabale}
                  onPress={() => setAddDate(true)}
                  disabled={
                    firstDate !== null && secondDate !== null ? false : true
                  }
                >
                  <Text style={styles.add_button}>Add</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </>
        ) : null}

        {addDate && autoQuote_switch ? (
          <View style={styles.date_view}>
            <Text style={styles.date_text}>From : {firstDate}</Text>
            <Text style={styles.date_text}>To : {secondDate}</Text>
            <TouchableOpacity
              onPress={() => {
                setAddDate(false), setFirstDate(null), setSecondDate(null);
              }}
            >
              <Image source={Images.Delet} style={styles.delet_image} />
            </TouchableOpacity>
          </View>
        ) : null}
        {autoQuote_switch ? (
          <TouchableOpacity
            style={[
              styles.add_touchabale,
              {
                alignSelf: "flex-start",
                marginHorizontal: scale(20),
                paddingHorizontal: scale(20),
                marginTop: scale(10),
                opacity:
                  credit !== "" &&
                  selectProfession.length !== 0 &&
                  selectLocation.length !== 0 &&
                  message !== ""
                    ? 1
                    : 0.5,
              },
            ]}
            onPress={() => save_auto_quotes()}
            disabled={
              credit !== "" &&
              selectProfession.length !== 0 &&
              selectLocation.length !== 0 &&
              message !== ""
                ? false
                : true
            }
          >
            <Text style={[styles.add_button, { fontSize: 14 }]}>Save</Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
      <Loader val={loaderResponse.loader} />
    </View>
  );
};

export default AutoQuoting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_WHITE,
  },
  autoQuote_view: {
    paddingVertical: scale(8),
    paddingHorizontal: scale(20),

    // alignItems: "center",
  },
  autoquote_text: {
    fontSize: 14,
    fontWeight: "600",
    color: Color.COLOR_BLACK,
  },
  credit_textinpute: {
    borderRadius: scale(5),
    borderWidth: 1,
    borderColor: Color.BorderColor,
    width: Dimensions.get("window").width / 1.2,
    padding: scale(7),
    marginHorizontal: scale(10),
    color: Color.COLOR_BLACK,
    marginTop: scale(10),
  },

  checkbox_button: {
    height: 20,
    width: 20,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: scale(10),
  },

  CheckImage: {
    width: 15,
    height: 15,
    tintColor: Color.BACKGROUND_WHITE,
  },
  date_view: {
    flexDirection: "row",
    backgroundColor: Color.LIGHT_GREY,
    marginHorizontal: scale(20),
    padding: scale(7),
    borderRadius: scale(5),
    justifyContent: "space-between",
    alignItems: "center",
  },
  date_text: {
    color: Color.COLOR_BLACK,
    fontSize: 14,
  },
  add_button: {
    color: Color.BACKGROUND_WHITE,
    fontWeight: "600",
    alignSelf: "center",
  },
  delet_image: {
    width: scale(15),
    height: scale(15),
    tintColor: Color.Grey,
  },
  add_touchabale: {
    padding: scale(7),
    backgroundColor: Color.BUTTON_LIGHTBLUE,
    borderRadius: scale(5),
    alignSelf: "center",
  },
});
