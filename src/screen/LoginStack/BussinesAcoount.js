import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Linking,
  Dimensions,
} from "react-native";
import Postcode from "../../../Postcode.json";
import { scale } from "../../theme/Scalling";
import Color from "../../theme/Color";
import Images from "../../theme/Images";
import countryCode from "../../../countryCode.json";
import { countries } from "../../theme/Array";
// Components
import HeaderComp from "../../component/HeaderLogo";
import TextInputeCom from "../../component/TextInput";
import ButtonComp from "../../component/Button";
import Loader from "../../component/Loader";
import DropDownComp from "../../component/DropDown";
import FooterComponent from "../../component/FooterComponent";
// Helpers
import ReduxActions from "../../helper/ReduxActions";
import { useDispatch, useSelector } from "react-redux";

const BussinesAccount = (props) => {
  // console.log("Props data :::", props.route.params);

  // ---------- dispatch and useSelector ---------- //
  const dispatch = useDispatch();
  const BussinessNumberResponse = useSelector((state) => state.bussinessnumber);
  const professionResponse = useSelector((state) => state.profession);
  const loaderResponse = useSelector((state) => state.loader);
  const ipinfoResponse = useSelector((state) => state.Ipinfo);

  // ---------- state ---------- //

  const [registerAuth, setRegisterAuth] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    businessName: "",
  });
  const [mobileNumber, setMbileNumber] = useState();
  const [nzbnNumber, setNzbnNumber] = useState("");
  const [professiondata, setProfessiondata] = useState();
  const [selectedProfession, setSelectedProfession] = useState({});
  const [selectedLocality, setSelectedLocality] = useState("");
  const [emailError, setEmailError] = useState();
  const [mobileNoError, setMobileNoError] = useState();
  const [nzbnstatus, setNzbnstatus] = useState(null);
  const [confirmPassErr, setConfirmPassErr] = useState();
  const [nzbzNumberError, setNzbzNumberError] = useState();
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [eyeIconPass, setEyeIconPass] = useState(true);
  const [eyeIconConfirmPass, setEyeIconConfirmPass] = useState(true);
  const [countrycode, setCountrycode] = useState({
    dial_code: "",
    combineCountycode: "",
  });
  const [defaultCountryCode, setDefaultCountryCode] = useState();
  const [url, setUrl] = useState("");

  // ---------- eceIcon ---------- //
  const IconPressPass = () => {
    setEyeIconPass((eyeIconPass) => !eyeIconPass);
  };
  const IconPressConfirmPass = () => {
    setEyeIconConfirmPass((eyeIconConfirmPass) => !eyeIconConfirmPass);
  };

  const emailFormat = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  // ****************** useEffect ****************** //

  // ---------- ipInfo ---------- //
  useEffect(() => {
    if (ipinfoResponse.data !== null) {
      // console.log("ipinfoResponse ::", ipinfoResponse.data.country);
      countries.map((countryItem) => {
        // console.log("countryItem ::", countryItem);
        if (countryItem.name === ipinfoResponse.data.country) {
          setUrl(countryItem.url);
        }
      });
      if (
        props.route.params.key === "AfterLogin" &&
        props.route.params.data.phone !== null &&
        props.route.params.data.phone !== ""
      ) {
        let number = props.route.params.data.phone;

        let countryCode =
          number.charAt(0) === "+" ? number.split("-")[0] : "+91";
        setDefaultCountryCode(countryCode);
        let phoneNumber = number.split("-")[1];

        setMbileNumber(phoneNumber);
      } else {
        countryCode.map((item) => {
          if (item.code === ipinfoResponse.data.country) {
            setDefaultCountryCode(item.dial_code);
          }
        });
      }
    } else {
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.IpinfoRequest());
    }
  }, [ipinfoResponse.data]);

  // ---------- profession ---------- //
  useEffect(() => {
    if (professionResponse.data !== null) {
      setProfessiondata(professionResponse.data);
    } else {
      dispatch(ReduxActions.ProfessionRequest());
    }
  }, [professionResponse.data]);

  // ---------- NZBN number api call ---------- //
  useEffect(() => {
    if (BussinessNumberResponse.data !== null) {
      if (BussinessNumberResponse.data.entityStatusCode == 50) {
        BussinessNumberResponse.data.roles.map((item, index) => {
          if (index === 0) {
            if (item.roleStatus === "ACTIVE") {
              dispatch(
                ReduxActions.ToastDisplay({
                  type: "positive",
                  title: "Your Bussiness NZBN Number Correct",
                })
              );
            } else {
              setNzbzNumberError("NBZN number status is : INACTIVE");
            }
          }
        });
        setNzbzNumberError();
        setNzbnstatus(true);
      } else if (BussinessNumberResponse.data.errorDescription) {
        setNzbnstatus(false);
        if (nzbnNumber.length === 13) {
          setNzbzNumberError("Invalid NZBN number");
        } else if (nzbnNumber.length !== 0) {
          setNzbzNumberError("Business Number must be 13 digits long");
        }
      }
    }
  }, [BussinessNumberResponse.data]);

  useEffect(() => {
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      if (keyboardStatus) {
        dispatch(ReduxActions.loaderAction(true));
        dispatch(ReduxActions.BussinessNumberRequest(nzbnNumber));
        setKeyboardStatus(false);
      }
    });
    return () => {
      hideSubscription.remove();
    };
  }, [nzbnNumber, keyboardStatus]);

  // ****************** functionPart ****************** //

  // ---------- submitButton  ---------- //

  const ToSeoUrl = (url) => {
    console.log("url ::", url);
    // make the url lowercase
    var encodedUrl = url?.toString().toLowerCase();
    console.log("encodedUrl lower case:::", encodedUrl);
    // replace & with and
    encodedUrl = encodedUrl?.split(/\&+/).join("-and-");
    console.log("encodedUrl::: and operator", encodedUrl);
    // remove invalid characters
    encodedUrl = encodedUrl?.split(/[^a-z0-9]/).join("-");
    console.log("encodedUrl::: number", encodedUrl);
    // remove duplicates
    encodedUrl = encodedUrl?.split(/-+/).join("-");
    console.log("encodedUrl joint:::", encodedUrl);
    // trim leading & trailing characters
    encodedUrl = encodedUrl?.trim("-");
    console.log("encodedUrl joint:::- ", encodedUrl);
    return encodedUrl;
  };

  const SubmitClick = () => {
    // console.log("countrycode.dial_code ::", countrycode.dial_code);
    let phRejex;
    if (countrycode.dial_code !== undefined) {
      if (countrycode.dial_code == "+91") {
        phRejex = /^[6-9]\d{9}$/;
      } else if (countrycode.dial_code == "+61") {
        phRejex = /^[4]\d{8}$/;
      } else if (countrycode.dial_code == "+64") {
        phRejex = /^[2]\d{8}$/;
      } else {
        phRejex = /^[0-9]/;
      }
    } else {
      if (defaultCountryCode === "+91") {
        phRejex = /^[6-9]\d{9}$/;
      } else if (defaultCountryCode == "+61") {
        phRejex = /^[4]\d{8}$/;
      } else if (defaultCountryCode == "+64") {
        phRejex = /^[2]\d{8}$/;
      } else {
        phRejex = /^[0-9]/;
      }
    }

    if (props.route.params.key === "BeforeLogin") {
      if (emailFormat.test(registerAuth.email) === false) {
        setEmailError("Valid email field is required ");
      } else if (registerAuth.password != registerAuth.confirmpassword) {
        setConfirmPassErr("Password does not match");
      } else if (!nzbnstatus) {
        if (nzbnNumber.length === 13) {
          setNzbzNumberError("Invalid NZBN number");
        } else {
          setNzbzNumberError("Business Number must be 13 digits long");
        }
      } else if (!phRejex.test(mobileNumber)) {
        setMobileNoError(
          "We should be enter country code and should not be accept below 8 numbers"
        );
      } else {
        let bodydata = {
          userName: registerAuth.name,
          email: registerAuth.email,
          businessName: registerAuth.businessName,
          businessProfession: {
            _id: selectedProfession._id,
            name: selectedProfession.name,
          },
          location: selectedLocality,
          businessABN: nzbnNumber,
          mobile:
            countrycode !== undefined
              ? countrycode.dial_code + "-" + mobileNumber
              : defaultCountryCode !== undefined
              ? defaultCountryCode + "-" + mobileNumber
              : null,

          password: registerAuth.password,
          userType: "Business User",
          createBusiness: "false",
          businessUrl: ToSeoUrl(registerAuth.businessName),
        };
        console.log("registerBusiness Acoount data", bodydata);
        dispatch(ReduxActions.loaderAction(true));
        dispatch(
          ReduxActions.RegisterBusinessRequest(
            bodydata,
            props.navigation,
            props.route.params.key
          )
        );
      }
    } else if (props.route.params.key === "AfterLogin") {
      if (!nzbnstatus) {
        if (nzbnNumber.length === 13) {
          setNzbzNumberError("Invalid NZBN number");
        } else {
          setNzbzNumberError("Business Number must be 13 digits long");
        }
      } else if (mobileNumber.length < 7) {
        setMobileNoError(
          "We should be enter country code and should not be accept below 8 numbers"
        );
      } else {
        let afterLogin = {
          email: props.route.params.data.email,
          password: props.route.params.data.password,
          userName: props.route.params.data.userName,
          businessUrl: props.route.params.data.businessUrl,
          businessName: registerAuth.businessName,
          businessProfession: {
            _id: selectedProfession._id,
            name: selectedProfession.name,
          },
          location: selectedLocality,
          businessABN: nzbnNumber,
          mobile:
            countrycode !== undefined
              ? countrycode.dial_code + "-" + mobileNumber
              : defaultCountryCode !== undefined
              ? defaultCountryCode + "-" + mobileNumber
              : null,
          userType: "Business User",
          createBusiness: "true",
          businessUrl: ToSeoUrl(registerAuth.businessName),
        };
        console.log("afterLogin::", afterLogin);
        dispatch(ReduxActions.loaderAction(true));
        dispatch(
          ReduxActions.RegisterBusinessRequest(
            afterLogin,
            props.navigation,
            props.route.params.key
          )
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <HeaderComp
        height={70}
        width={180}
        // height={Dimensions.get("window").height / 20}
        // width={Dimensions.get("window").width / 7}
        backOption={props.route.params.key}
        navigation={props.navigation}
      />
      <ScrollView
        style={styles.formView}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <Text style={styles.headerText}>Register Your business</Text>
        {props.route.params.key !== "AfterLogin" ? (
          <>
            <TextInputeCom
              value={registerAuth.name}
              placeholder={"Name*"}
              line={true}
              textInputeStyle={styles.textInput}
              onChangeText={(val) =>
                setRegisterAuth({ ...registerAuth, name: val })
              }
            />
            <TextInputeCom
              value={registerAuth.email}
              placeholder={"Email*"}
              line={true}
              textInputeStyle={styles.textInput}
              keyboardType={"email-address"}
              onChangeText={(val) => {
                setRegisterAuth({ ...registerAuth, email: val });
                setEmailError();
              }}
              autoCapitalize="none"
            />
            {emailError !== undefined ? (
              <Text style={styles.errortext}>{emailError}</Text>
            ) : null}
            <TextInputeCom
              value={registerAuth.password}
              placeholder={"Password*"}
              line={true}
              textInputeStyle={styles.textInput}
              autoCapitalize="words"
              onChangeText={(val) =>
                setRegisterAuth({ ...registerAuth, password: val })
              }
              type={eyeIconPass == true ? true : false}
              icon={eyeIconPass == true ? Images.CloseEye : Images.OpenEye}
              iconPress={() => IconPressPass()}
            />
            <TextInputeCom
              value={registerAuth.confirmpassword}
              placeholder={"Confirm Password*"}
              line={true}
              textInputeStyle={styles.textInput}
              autoCapitalize="words"
              onChangeText={(val) => {
                setRegisterAuth({ ...registerAuth, confirmpassword: val });
                setConfirmPassErr();
              }}
              type={eyeIconConfirmPass == true ? true : false}
              icon={
                eyeIconConfirmPass == true ? Images.CloseEye : Images.OpenEye
              }
              iconPress={() => IconPressConfirmPass()}
            />
            {confirmPassErr !== undefined ? (
              <Text style={styles.errortext}>{confirmPassErr}</Text>
            ) : null}
          </>
        ) : null}

        <TextInputeCom
          value={registerAuth.businessName}
          placeholder={"Bussiness Name*"}
          line={true}
          textInputeStyle={styles.textInput}
          onChangeText={(val) =>
            setRegisterAuth({ ...registerAuth, businessName: val })
          }
        />
        <DropDownComp
          selectedValue={selectedProfession.name}
          placeholder="Profession"
          data={professiondata}
          labelField={"name"}
          valueField={"name"}
          dropdown={styles.dropdown}
          selected={(item) =>
            setSelectedProfession({ name: item.name, _id: item._id })
          }
          placeholderStyle={{ color: Color.BorderColor }}
        />
        <DropDownComp
          selectedValue={selectedLocality}
          placeholder="Where are you based on?"
          data={Postcode}
          labelField={"locality"}
          valueField={"locality"}
          dropdown={styles.dropdown}
          selected={(item) => setSelectedLocality(item.locality)}
          placeholderStyle={{ color: Color.BorderColor }}
        />

        <TextInputeCom
          value={nzbnNumber}
          placeholder={"Bussiness NZBN*"}
          line={true}
          textInputeStyle={styles.textInput}
          keyboardType={"numeric"}
          onChangeText={(val) => {
            setNzbnNumber(val), setNzbzNumberError();
          }}
          onPressIn={() => {
            setKeyboardStatus(true);
          }}
          maxLength={13}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: scale(3),
          }}
        >
          <Text style={{ color: Color.COLOR_BLACK }}>
            Don't have it in hand?
          </Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "https://companies-register.companiesoffice.govt.nz/"
              )
            }
          >
            <Text style={{ color: Color.BLUE_DRESS, marginLeft: scale(4) }}>
              Lookup my NZBN
            </Text>
          </TouchableOpacity>
        </View>

        {nzbzNumberError ? (
          <Text style={[styles.errortext, { marginLeft: scale(-1) }]}>
            {nzbzNumberError}
          </Text>
        ) : null}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <DropDownComp
            selectedValue={
              countrycode !== undefined ? countrycode.combineCountycode : null
            }
            placeholder={
              defaultCountryCode !== undefined ? defaultCountryCode : null
            }
            data={countryCode}
            labelField={"combineCountycode"}
            valueField={"combineCountycode"}
            dropdown={{
              borderBottomColor: Color.LIGHT_GREY,
              paddingLeft: 3,
              borderBottomWidth: 1,
              borderRadius: scale(5),
              flex: 0.8,
              paddingVertical: 7,
            }}
            selected={(item) =>
              setCountrycode({
                dial_code: item.dial_code,
                combineCountycode: item.combineCountycode,
              })
            }
            placeholderStyle={{ color: Color.COLOR_BLACK }}
            key={"countryCode"}
          />
          <View style={{ flex: 2.5, marginLeft: 5, marginBottom: scale(5) }}>
            <TextInputeCom
              value={mobileNumber}
              placeholder={"Phone*"}
              line={true}
              textInputeStyle={styles.textInput}
              keyboardType={"phone-pad"}
              onChangeText={(val) => {
                setMbileNumber(val), setMobileNoError("");
              }}
            />
          </View>
        </View>
        {mobileNoError !== undefined && mobileNoError !== "" ? (
          <Text style={[styles.errortext, { marginLeft: scale(-1) }]}>
            {mobileNoError}
          </Text>
        ) : null}
        <View style={{ marginTop: scale(10), marginHorizontal: scale(-20) }}>
          <ButtonComp
            onPress={() => SubmitClick()}
            text={"Sign Up"}
            disabled={
              props.route.params.key !== "AfterLogin"
                ? !registerAuth.name ||
                  !registerAuth.email ||
                  !registerAuth.businessName ||
                  !mobileNumber ||
                  !selectedProfession ||
                  !nzbnNumber ||
                  !selectedLocality ||
                  !registerAuth.password ||
                  !registerAuth.confirmpassword
                  ? true
                  : false
                : !selectedProfession ||
                  !nzbnNumber ||
                  !selectedLocality ||
                  !registerAuth.businessName ||
                  !mobileNumber
                ? true
                : false
            }
            marginHorizontal={scale(20)}
          />
        </View>
        {props.route.params.key !== "AfterLogin" ? (
          <>
            <TouchableOpacity
              style={styles.gotoLoginButton}
              onPress={() => props.navigation.navigate("Login")}
            >
              <Text
                style={[styles.backbuttonText, { color: Color.BLUE_DRESS }]}
              >
                Login
              </Text>
              <Text
                style={[
                  styles.backbuttonText,
                  { color: Color.COLOR_BLACK, marginRight: scale(5) },
                ]}
              >
                Go Back to
              </Text>
            </TouchableOpacity>
          </>
        ) : null}
      </ScrollView>
      <TouchableOpacity
        style={styles.footerView}
        onPress={() => Linking.openURL("http://" + url)}
      >
        <FooterComponent height={80} width={100} />
      </TouchableOpacity>
      <Loader val={loaderResponse.loader} />
    </SafeAreaView>
  );
};
export default BussinesAccount;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_WHITE,
  },
  headerText: {
    color: Color.COLOR_BLACK,
    fontSize: 18,
    fontWeight: "400",
    // marginTop: 5,
    // marginLeft: scale(15),
  },
  formView: {
    height: Dimensions.get("window").height / 2,
    paddingHorizontal: scale(33),
  },
  footerView: {
    flex: 0.2,
    // bottom: scale(-30),
    alignSelf: "center",
    justifyContent: "center",
  },
  gotoLoginButton: {
    marginTop: scale(10),
    flexDirection: "row-reverse",
  },
  backbuttonText: {
    fontSize: 15,
  },
  errortext: {
    fontSize: 12,
    color: Color.ERROR,
    marginHorizontal: scale(3),
  },
  dropdown: {
    borderBottomColor: Color.LIGHT_GREY,
    borderBottomWidth: 1,
    paddingVertical: scale(8),
    paddingHorizontal: scale(7),
  },
  // textInput: {
  //   fontSize: 15,
  //   padding: 5,
  //   width: "80%",
  //   paddingVertical: scale(10),
  // },
  textInput: {
    flex: 1,
    fontSize: 15,
    padding: scale(5),
    width: "100%",
    color: Color.COLOR_BLACK,
    height: Dimensions.get("window").height / 20,
  },
  buttonStyle: {
    marginTop: 8,
    height: 38,
    borderBottomWidth: 0.3,
    // paddingVertical: Platform.OS === "ios" ? 13 : 0,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: Color.BorderColor,
  },
  buttonTextstyle: {
    textAlign: "center",
    fontSize: 14,
    marginLeft: 5,
    fontWeight: "500",
    color: Color.COLOR_BLACK,
  },
  triangleShapeCSS: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 9,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    transform: [{ rotateX: "180deg" }],
  },
  iconView: {
    backgroundColor: "transparent",
  },
});
