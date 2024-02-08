import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";

// Constant
import { scale } from "../../theme/Scalling";
import Images from "../../theme/Images";
import Color from "../../theme/Color";
import { countries } from "../../theme/Array";
// Components
import HeaderComp from "../../component/HeaderLogo";
import Loader from "../../component/Loader";
import TextInputComp from "../../component/TextInput";
import ButtonComp from "../../component/Button";
import VerificationComp from "../../component/DeletPopUpCom";
import FooterComponent from "../../component/FooterComponent";

// Redux
import { useDispatch, useSelector } from "react-redux";
import ReduxActions from "../../helper/ReduxActions";

// Library
import SplashScreen from "react-native-splash-screen";

const Login = ({ navigation }) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const emailFormat = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  // ---------- dispatch and useSelectore ---------- //

  const dispatch = useDispatch();
  const loaderResponse = useSelector((state) => state.loader);
  const loginResponse = useSelector((state) => state.login);
  const accountActivationResponse = useSelector(
    (state) => state.AccountActivate
  );
  const ipinfoResponse = useSelector((state) => state.Ipinfo);

  // ---------- state ---------- //
  const [eyeIcon, setEyeIcon] = useState(true);
  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState();
  const [openVrifiCationModal, setOpenVrifiCationModal] = useState(false);
  const [url, setUrl] = useState("");

  // ---------- ipInfo_Useffect  ----------  //
  useEffect(() => {
    if (ipinfoResponse.data !== null) {
      countries.map((countryItem) => {
        // console.log("countryItem ::", countryItem);
        if (countryItem.name === ipinfoResponse.data.country) {
          setUrl(countryItem.url);
        }
      });
    } else {
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.IpinfoRequest());
    }
  }, [ipinfoResponse.data]);

  // login Resaponse
  useEffect(() => {
    if (loginResponse.data !== null) {
      if (loginResponse.data === "Deleted User Detected") {
        setOpenVrifiCationModal(true);
      }
    }
  }, [loginResponse.data]);

  // activeAccount  Resaponse
  useEffect(() => {
    if (accountActivationResponse.data !== null) {
      if (accountActivationResponse.data.result === "User activated") {
        setTimeout(() => {
          dispatch(
            ReduxActions.ToastDisplay({
              type: "positive",
              title: "User activated",
            })
          );
        }, 700);
        dispatch(ReduxActions.AccountActivateResponse(null));
        setOpenVrifiCationModal(false);
      }
    }
  }, [accountActivationResponse.data]);

  // Eye Function
  const EyeIconPress = () => {
    setEyeIcon((eyeIcon) => !eyeIcon);
  };

  // Submit Click
  const SubmitClick = () => {
    let bodydata = {
      email: auth.email.toLowerCase(),
      password: auth.password,
    };
    if (emailFormat.test(auth.email) == false) {
      if (emailFormat.test(auth.email) != undefined) {
        setEmailError("Valid email is requried ");
      }
    } else {
      dispatch(ReduxActions.GetProfileDataResponse(null));
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.LoginRequest(bodydata, navigation));
    }
  };

  // actiVatedAccountCall
  const actiVatedAccountCall = () => {
    let emailId = {
      email: auth.email,
    };
    dispatch(ReduxActions.loaderAction(true));
    dispatch(ReduxActions.AccountActivateReuest(emailId, navigation));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
      <Loader val={loaderResponse.loader} />
      <HeaderComp height={70} width={180} />
      <View style={styles.signInView}>
        <Text style={styles.signInText}>Sign In</Text>
        <TouchableOpacity
          style={styles.postjobButton}
          onPress={() => {
            navigation.navigate("Postjob"),
              dispatch(ReduxActions.PostJobResponse(null));
          }}
        >
          <Text style={styles.postjobText}>Post A Job</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.textView}>
        <Text style={styles.desText}>Hi there! Nice to see you again.</Text>
      </View>
      <View
        style={{
          marginTop: scale(10),
          paddingTop: scale(25),
          paddingHorizontal: scale(33),
        }}
      >
        <TextInputComp
          line={true}
          textInputeStyle={styles.textInput}
          placeholder={"Email"}
          keyboardType={"email-address"}
          autoCapitalize="none"
          onChangeText={(val) => {
            setAuth({ ...auth, email: val });
            setEmailError();
          }}
        />
        {emailError !== undefined ? (
          <Text style={styles.errortext}>{emailError}</Text>
        ) : null}
      </View>
      <View
        style={{
          paddingTop: scale(5),
          paddingHorizontal: scale(33),
        }}
      >
        <TextInputComp
          line={true}
          placeholder={"Password"}
          textInputeStyle={styles.textInput}
          onChangeText={(val) => setAuth({ ...auth, password: val })}
          type={eyeIcon == true ? true : false}
          icon={eyeIcon == true ? Images.CloseEye : Images.OpenEye}
          iconPress={() => EyeIconPress()}
        />
      </View>
      <View style={styles.createView}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Signup", { key: "BeforeLogin" })}
          style={{ flex: 1, alignItems: "flex-start" }}
        >
          <Text style={styles.text}>Create an account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Forget")}
          style={{
            flex: 1,

            alignItems: "flex-end",
          }}
        >
          <Text style={styles.text}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <ButtonComp
        onPress={() => SubmitClick()}
        image={Images.Telegram}
        text={"Login"}
        disabled={!auth.email || !auth.password ? true : false}
        marginHorizontal={scale(20)}
      />
      <View style={{ flex: 1 }}></View>
      <TouchableOpacity onPress={() => Linking.openURL("http://" + url)}>
        <FooterComponent
          height={50}
          width={100}
          // height={Dimensions.get("window").height / 12}
          // width={Dimensions.get("window").width / 4}
        />
      </TouchableOpacity>
      {/* </ScrollView> */}
      <VerificationComp
        deletPopUpVisibale={openVrifiCationModal}
        nodeletProfile={() => {
          setOpenVrifiCationModal(false),
            dispatch(ReduxActions.LoginResponse(null));
        }}
        yesDeletProfile={() => actiVatedAccountCall()}
        loaderValue={loaderResponse.loader}
        DeletConfirmText={"Deactivated User Detected"}
        DeletExclamationmarkText={"Do you want to activate user?"}
        DeletNoButton={"No, cancel!"}
        DeletYesButton={"Yes, activate it!"}
      />
    </SafeAreaView>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_WHITE,
  },
  signInView: {
    marginTop: Dimensions.get("window").height / 15,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: scale(19),
    marginBottom: scale(20),
  },
  signInText: {
    flex: 2,

    fontSize: 20,
    // fontSize: Dimensions.get("window").width / 25,
    fontWeight: "500",
    color: Color.COLOR_BLACK,
  },
  postjobButton: {
    flex: 1,
    backgroundColor: Color.BUTTON_LIGHTBLUE,
    borderRadius: scale(5),
    justifyContent: "center",
    alignItems: "center",
  },
  postjobText: {
    color: Color.BACKGROUND_WHITE,
    fontSize: 14,
  },
  text: {
    fontSize: 13,
    color: Color.BUTTON_LIGHTBLUE,
  },
  textView: {
    marginHorizontal: scale(33),
  },
  desText: {
    fontSize: 16,
    color: Color.COLOR_BLACK,
  },
  createView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: scale(20),
    marginVertical: scale(10),
  },

  errortext: {
    fontSize: 12,
    color: Color.ERROR,
    paddingLeft: scale(3),
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    padding: scale(5),
    width: "100%",
    color: Color.COLOR_BLACK,
    height: Dimensions.get("window").height / 25,
  },
});
