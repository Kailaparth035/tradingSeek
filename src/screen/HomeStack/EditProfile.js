import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import Color from "../../theme/Color";
import Images from "../../theme/Images";
import { scale } from "../../theme/Scalling";
import countryCodeJson from "../../../countryCode.json";
import { useDispatch, useSelector } from "react-redux";
import TextInputComp from "../../component/TextInput";
import DropDownComp from "../../component/DropDown";
import ReduxActions from "../../helper/ReduxActions";
import AsyncStorage from "../../helper/AsyncStorage";
import Loader from "../../component/Loader";
import Header from "../../component/Header";

const EditProfile = ({ navigation }) => {
  const emailFormat =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const dispatch = useDispatch();
  const getProfileData = useSelector((state) => state.GetProfileData);
  const ipinfoResponse = useSelector((state) => state.Ipinfo);
  const upadateprofiledataResp = useSelector((state) => state.UpdateUserName);
  const loaderResponse = useSelector((state) => state.loader);

  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [profileDetails, setProfileDetails] = useState(null);
  const [defaultCountryCode, setDefaultCountryCode] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState({
    dial_code: "",
    combineCountycode: "",
  });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (ipinfoResponse.data !== null) {
      countryCodeJson.map((item) => {
        if (item.code === ipinfoResponse.data.country) {
          setDefaultCountryCode(item.dial_code);
        }
      });
    } else {
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.IpinfoRequest());
    }
  }, [ipinfoResponse.data]);

  useEffect(() => {
    AsyncStorage.getItem("userId").then((value) => {
      var val = value;
      setUserId(val);
    });
  }, []);

  useEffect(() => {
    // console.log("getProfileData", getProfileData.data);
    if (getProfileData.data !== null) {
      setEmail(getProfileData.data.user.email);
      setUserName(getProfileData.data.user.userName);
      setProfileDetails(getProfileData.data.user);
      if (
        getProfileData.data.user.phone !== null &&
        getProfileData.data.user.phone !== ""
      ) {
        let phonenumber = getProfileData.data.user.phone;
        let coutryCode =
          phonenumber.split("-")[0].charAt(0) === "+"
            ? phonenumber.split("-")[0]
            : defaultCountryCode;
        let number = phonenumber.split("-")[1];
        setSelectedCountryCode({
          combineCountycode: coutryCode,
          dial_code: coutryCode,
        });
        setPhoneNumber(number);
      }
    }
  }, [getProfileData.data]);

  useEffect(() => {
    // console.log("upadateprofiledataResp", upadateprofiledataResp.data);
    if (upadateprofiledataResp.data !== null) {
      dispatch(ReduxActions.GetProfileDataRequest(null));
      navigation.goBack();
    }
  }, [upadateprofiledataResp.data]);

  const updateProfileApicall = () => {
    console.log("phonenumber :::", phoneNumber);
    console.log(
      "selectedCountryCode :::",
      selectedCountryCode.combineCountycode
    );
    let phRejex;
    if (selectedCountryCode.combineCountycode == "+91") {
      phRejex = /^[6-9]\d{9}$/;
    } else if (selectedCountryCode.combineCountycode == "+61") {
      phRejex = /^[4]\d{8}$/;
    } else if (selectedCountryCode.combineCountycode == "+64") {
      phRejex = /^[2]\d{8}$/;
    } else {
      phRejex = /^[0-9]/;
    }
    console.log("phonenumber :::", phRejex.test(phoneNumber));
    if (phRejex.test(phoneNumber)) {
      if (profileDetails !== null) {
        if (
          profileDetails.userType === "Business User" &&
          profileDetails.switchedToCustomerViewApk === false
        ) {
          if (userName === null || userName === "") {
            dispatch(
              ReduxActions.ToastDisplay({
                type: "negative",
                title: "Enter a UserName.",
              })
            );
          } else if (
            email === null ||
            email === "" ||
            emailFormat.test(email) === false
          ) {
            dispatch(
              ReduxActions.ToastDisplay({
                type: "negative",
                title: "Enter a valid email address.",
              })
            );
          } else if (
            selectedCountryCode.dial_code !== "" &&
            phoneNumber !== ""
          ) {
            let fulllengthofNumber =
              phoneNumber !== "" && selectedCountryCode.dial_code !== ""
                ? selectedCountryCode.dial_code + "-" + phoneNumber
                : defaultCountryCode !== ""
                ? phoneNumber !== ""
                  ? defaultCountryCode + "-" + phoneNumber
                  : defaultCountryCode + "-" + ""
                : null;

            let bodyData = {
              id: userId,
              userName: userName,
              email: email,
              phone: fulllengthofNumber,
            };
            dispatch(ReduxActions.loaderAction(true));
            dispatch(ReduxActions.UpdateUserNameRequest(bodyData));
          } else {
            dispatch(
              ReduxActions.ToastDisplay({
                type: "negative",
                title: "Invalid phone number.",
              })
            );
          }
        } else {
          // console.log("selectedCountryCode.dial_code ::", selectedCountryCode);
          // console.log(" phoneNumber :::", phoneNumber);
          // console.log(" phoneNumber :::", defaultCountryCode);
          if (userName === null || userName === "") {
            dispatch(
              ReduxActions.ToastDisplay({
                type: "negative",
                title: "Enter a UserName.",
              })
            );
          } else if (
            email === null ||
            email === "" ||
            emailFormat.test(email) === false
          ) {
            dispatch(
              ReduxActions.ToastDisplay({
                type: "negative",
                title: "Enter a valid email address.",
              })
            );
          } else {
            let fulllengthofNumber =
              phoneNumber !== ""
                ? selectedCountryCode.dial_code !== ""
                  ? selectedCountryCode.dial_code + "-" + phoneNumber
                  : defaultCountryCode !== undefined
                  ? defaultCountryCode + "-" + phoneNumber
                  : null
                : defaultCountryCode + "-" + "";

            let bodyData = {
              id: userId,
              userName: userName,
              email: email,
              phone: fulllengthofNumber,
            };
            // console.log("BodyData :::", bodyData);
            dispatch(ReduxActions.loaderAction(true));
            dispatch(ReduxActions.UpdateUserNameRequest(bodyData));
          }
        }
      }
    } else {
      dispatch(
        ReduxActions.ToastDisplay({
          type: "negative",
          title: "Please Enter valid phone number and country code.",
        })
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle="dark-content"
      />
      <Header goBack={() => navigation.goBack()} header_title="Edit" />

      <ScrollView style={styles.container}>
        <Text style={styles.title_text}>User Name :</Text>

        <TextInputComp
          placeholder={"Name"}
          line={false}
          value={userName}
          textInputeStyle={[
            styles.textInput,
            { borderRadius: 5, borderWidth: 1 },
          ]}
          onChangeText={(val) => setUserName(val)}
        />
        <Text style={styles.title_text}>Email :</Text>

        <TextInputComp
          placeholder={"email"}
          line={false}
          value={email}
          textInputeStyle={[
            styles.textInput,
            { borderRadius: 5, borderWidth: 1 },
          ]}
          onChangeText={(val) => setEmail(val)}
        />
        <Text style={styles.title_text}>Phone Number :</Text>
        <View style={styles.editPhone_view}>
          <DropDownComp
            selectedValue={
              selectedCountryCode.combineCountycode !== ""
                ? selectedCountryCode.combineCountycode
                : null
            }
            placeholder={
              selectedCountryCode !== ""
                ? selectedCountryCode.combineCountycode
                : defaultCountryCode !== ""
                ? defaultCountryCode
                : null
            }
            data={countryCodeJson}
            labelField={"combineCountycode"}
            valueField={"combineCountycode"}
            dropdown={styles.country_dropdown}
            selected={(item) =>
              setSelectedCountryCode({
                dial_code: item.dial_code,
                combineCountycode: item.combineCountycode,
              })
            }
            placeholderStyle={{ color: Color.COLOR_BLACK }}
            key={"countryCode"}
          />

          <TextInput
            style={styles.phone_textInpute}
            keyboardType={"numeric"}
            value={phoneNumber}
            onChangeText={(val) => setPhoneNumber(val.replace(/[^0-9]/g, ""))}
          />
        </View>

        <View style={{ flexDirection: "row", padding: scale(12) }}>
          <TouchableOpacity
            style={[
              styles.touchabale_button,
              {
                backgroundColor: Color.LIGHT_GREY,
              },
            ]}
            onPress={() => navigation.goBack()}
          >
            <Text
              style={[styles.footerButtonText, { color: Color.COLOR_BLACK }]}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => updateProfileApicall()}
            style={[
              styles.touchabale_button,
              { backgroundColor: Color.BUTTON_LIGHTBLUE },
            ]}
          >
            <Text
              style={[
                styles.footerButtonText,
                { color: Color.BACKGROUND_WHITE },
              ]}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Loader val={loaderResponse.loader} />
    </View>
  );
};
export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_WHITE,
  },

  // textInpute Component
  textInput: {
    width: "90%",
    marginHorizontal: scale(20),
    fontSize: 15,
    paddingHorizontal: Platform.OS === "ios" ? scale(4) : scale(4),
    paddingVertical: Platform.OS === "ios" ? scale(5) : scale(2),
    marginRight: scale(15),
    borderColor: Color.ModalBorder,
    marginTop: scale(5),
    color: Color.COLOR_BLACK,
  },
  title_text: {
    paddingHorizontal: scale(12),
    fontSize: 15,
    fontWeight: "600",
    marginTop: scale(10),
    color: Color.COLOR_BLACK,
  },
  editPhone_view: {
    flexDirection: "row",
    paddingHorizontal: scale(12),
    marginRight: scale(5),
    alignItems: "center",
    marginTop: scale(5),
  },
  phone_textInpute: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Color.BorderColor,
    paddingVertical: Platform.OS === "ios" ? scale(6) : scale(3),
    paddingHorizontal: scale(5),
    flex: 1,
    color: Color.COLOR_BLACK,
  },

  country_dropdown: {
    borderColor: Color.BorderColor,
    borderBottomColor: Color.BorderColor,
    paddingLeft: 3,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: scale(8),
    paddingVertical: scale(5),

    flex: 0.4,
  },
  buttonView: {
    flexDirection: "row",
    margin: scale(25),
    justifyContent: "center",
  },
  footerButton: {
    borderRadius: scale(5),
    padding: scale(10),
    paddingHorizontal: scale(16),
    elevation: 1,
  },
  footerButtonText: {
    fontWeight: "500",
    letterSpacing: 1,
    fontSize: 14,
    color: Color.COLOR_BLACK,
  },
  touchabale_button: {
    flex: 1,
    alignItems: "center",
    padding: scale(10),
    borderRadius: scale(5),
    marginHorizontal: scale(5),
  },
});
