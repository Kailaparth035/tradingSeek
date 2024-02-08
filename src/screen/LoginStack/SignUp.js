import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Linking,
  Dimensions,
} from "react-native";

// Constant
import Images from "../../theme/Images";
import { scale } from "../../theme/Scalling";
import Color from "../../theme/Color";
import { countries } from "../../theme/Array";
// Components
import HeaderComp from "../../component/HeaderLogo";
import TextInputComp from "../../component/TextInput";
import ButtonComp from "../../component/Button";
import Loader from "../../component/Loader";

// Redux
import { useDispatch, useSelector } from "react-redux";
import ReduxActions from "../../helper/ReduxActions";
import FooterComponent from "../../component/FooterComponent";

const SignUp = (props) => {
  // ---------- regex ----------  //
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  // ---------- useDispatch and useSelectore ----------  //
  const dispatch = useDispatch();
  const loaderResponse = useSelector((state) => state.loader);
  const ipinfoResponse = useSelector((state) => state.Ipinfo);

  // ---------- state ----------  //
  const [signupAuth, setSignupAuth] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [icon, setIcon] = useState(true);
  const [icon2, setIcon2] = useState(true);
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
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

  // ---------- eye_button_function  ----------  //
  const IconPress = () => {
    setIcon((icon) => !icon);
  };
  const IconPress2 = () => {
    setIcon2((icon2) => !icon2);
  };

  // ---------- submit_function  ----------  //
  const SubmitClick = () => {
    if (regex.test(signupAuth.email) == false) {
      if (regex.test(signupAuth.email) == "") {
        setEmailError("Valid email is requried");
      } else {
        dispatch(
          ReduxActions.ToastDisplay({
            type: "negative",
            title: "Please Enter Valid Email",
          })
        );
      }
    } else if (signupAuth.password != signupAuth.confirmpassword) {
      setPasswordError("Password does not match");
    } else {
      let bodyData = {
        email: signupAuth.email,
        userName: signupAuth.name,
        password: signupAuth.password,
        userType: "Customer User",
        status: "PENDING",
      };
      // console.log("bodyData", bodyData);
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.SignUpRequest(bodyData, props.navigation));
    }
  };

  // ---------- * ----------  //

  return (
    <SafeAreaView style={styles.container}>
      <Loader val={loaderResponse.loader} />
      <HeaderComp
        height={70}
        width={180}
        // height={Dimensions.get("window").height / 25}
        // width={Dimensions.get("window").width / 10}
      />
      <View style={styles.signUpView}>
        <Text style={styles.signUpText}>Sign Up</Text>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() =>
            props.navigation.navigate("BussinessAccount", {
              key: props.route.params.key,
            })
          }
        >
          <Text style={styles.registerText}>Register Business</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textInputView}>
        <TextInputComp
          line={true}
          placeholder={"Name"}
          textInputeStyle={styles.textInput}
          onChangeText={(val) => setSignupAuth({ ...signupAuth, name: val })}
        />

        <TextInputComp
          line={true}
          placeholder={"Email"}
          textInputeStyle={styles.textInput}
          onChangeText={(val) => {
            setSignupAuth({ ...signupAuth, email: val });
            setEmailError();
          }}
          autoCapitalize="none"
        />

        {emailError !== undefined ? (
          <Text style={styles.errortext}>{emailError}</Text>
        ) : null}

        <TextInputComp
          line={true}
          placeholder={"Password"}
          textInputeStyle={styles.textInput}
          autoCapitalize="words"
          onChangeText={(val) =>
            setSignupAuth({ ...signupAuth, password: val })
          }
          type={icon == true ? true : false}
          icon={icon == true ? Images.CloseEye : Images.OpenEye}
          iconPress={() => IconPress()}
        />
        <TextInputComp
          line={true}
          placeholder={"Confirm Password"}
          textInputeStyle={styles.textInput}
          autoCapitalize="words"
          onChangeText={(val) => {
            setSignupAuth({ ...signupAuth, confirmpassword: val });
            setPasswordError();
          }}
          type={icon2 == true ? true : false}
          icon={icon2 == true ? Images.CloseEye : Images.OpenEye}
          iconPress={() => IconPress2()}
        />
        {passwordError !== undefined ? (
          <Text style={styles.errortext}>{passwordError}</Text>
        ) : null}
      </View>
      <ButtonComp
        onPress={() => SubmitClick()}
        image={Images.Telegram}
        text={"Sign Up"}
        disabled={
          !signupAuth.name ||
          !signupAuth.email ||
          !signupAuth.password ||
          !signupAuth.confirmpassword
            ? true
            : false
        }
        marginHorizontal={20}
      />
      <View style={styles.loginView}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Login")}
          style={styles.GoBake}
        >
          <Text style={styles.goBackText}>Go Back To</Text>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}></View>

      <TouchableOpacity onPress={() => Linking.openURL("http://" + url)}>
        <FooterComponent height={50} width={100} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_WHITE,
  },
  signUpView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(20),
    paddingTop: scale(25),
  },
  signUpText: {
    fontSize: 20,
    color: Color.COLOR_BLACK,
  },
  registerButton: {
    backgroundColor: Color.BUTTON_LIGHTBLUE,
    borderRadius: scale(5),
    // height: scale(22),
    // width: scale(150),
    height: Dimensions.get("window").height / 30,
    width: Dimensions.get("window").height / 5,
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: {
    color: Color.BACKGROUND_WHITE,
    fontSize: 15,
  },
  textInputView: {
    marginTop: scale(20),
    marginBottom: scale(20),
    paddingHorizontal: scale(33),
  },
  loginView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: scale(18),
    marginTop: scale(12),
  },
  GoBake: {
    flexDirection: "row",
  },
  goBackText: {
    fontSize: 15,
    color: Color.COLOR_BLACK,
    marginRight: scale(5),
  },
  loginText: {
    fontSize: 15,
    color: Color.BLUE_DRESS,
  },
  footerView: {
    flex: 1,
    alignSelf: "center",
    marginBottom: scale(-50),
    // marginTop: scale(170),
    position: "absolute",
    bottom: 0,
  },
  errortext: {
    fontSize: 12,
    color: Color.ERROR,
    paddingLeft: scale(35),
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    padding: scale(5),
    width: "100%",
    color: Color.COLOR_BLACK,
    height: Dimensions.get("window").height / 20,
  },
});
