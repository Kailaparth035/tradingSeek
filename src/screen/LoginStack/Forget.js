import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Alert,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from "react-native";

// constant
import { scale } from "../../theme/Scalling";
import Images from "../../theme/Images";
import Color from "../../theme/Color";
import { countries } from "../../theme/Array";
// Component
import Loader from "../../component/Loader";
import HeaderComp from "../../component/HeaderLogo";
import ButtonComp from "../../component/Button";

// Redux
import { useDispatch, useSelector } from "react-redux";
import ReduxActions from "../../helper/ReduxActions";
import FooterComponent from "../../component/FooterComponent";

const Forget = ({ navigation }) => {
  const emailFormet =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  // --------- usedispatch and useSelectore  --------- //
  const dispatch = useDispatch();
  const loaderResponse = useSelector((state) => state.loader);
  const ipinfoResponse = useSelector((state) => state.Ipinfo);

  // --------- state  --------- //
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState();
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

  // --------- resetClick  --------- //
  const resetClick = () => {
    if (emailFormet.test(email) == false) {
      setEmailError("Valid email is requried ");
    } else {
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.ForgetPasswordRequest(email, navigation));
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Loader val={loaderResponse.loader} />
      <HeaderComp height={70} width={180} />
      <View style={styles.mainView}>
        <Text style={styles.resetText}>Reset Password</Text>
        <Text style={[styles.desText, { paddingTop: scale(10) }]}>
          Enter the email associated with your account and we'll send an email
          with instructions to reset your password.
        </Text>
        {/* <Text style={styles.desText}> */}

        {/* </Text> */}
      </View>
      <View style={styles.inputView}>
        <Image source={Images.Email} style={styles.mainImage} />
        <TextInput
          placeholder="Enter Email"
          style={{ flex: 1, color: Color.COLOR_BLACK }}
          onChangeText={(val) => {
            setEmail(val), setEmailError();
          }}
          autoCapitalize="none"
          placeholderTextColor={Color.Grey}
        />
      </View>
      <View style={styles.lineView}></View>
      {emailError !== undefined ? (
        <Text style={styles.errortext}>{emailError}</Text>
      ) : null}
      <View style={styles.Button}>
        <ButtonComp
          onPress={() => resetClick()}
          text={"Reset Password"}
          disabled={!email ? true : false}
          marginHorizontal={20}
        />
      </View>
      <View style={styles.loginView}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
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
export default Forget;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_WHITE,
  },
  mainView: {
    paddingHorizontal: scale(18),
    paddingTop: scale(20),
  },
  resetText: {
    fontSize: 25,
    fontWeight: "bold",
    color: Color.COLOR_BLACK,
  },
  desText: {
    fontSize: 12,
  },
  inputView: {
    marginTop: scale(15),
    paddingHorizontal: scale(35),
    flexDirection: "row",
    alignItems: "center",
  },
  mainImage: {
    height: 20,
    width: 20,
    marginRight: scale(15),
  },
  lineView: {
    marginHorizontal: scale(18),
    borderBottomColor: Color.LIGHT_GREY,
    borderBottomWidth: 1,
    marginTop: Platform.OS === "ios" ? 10 : 0,
  },
  errortext: {
    fontSize: scale(12),
    color: Color.ERROR,
    marginHorizontal: scale(20),
  },
  Button: {
    marginTop: scale(10),
  },
  loginView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginHorizontal: scale(20),
    marginTop: scale(12),
  },
  GoBake: {
    flexDirection: "row",
  },
  goBackText: {
    fontSize: 15,
    color: Color.COLOR_BLACK,
    marginRight: scale(3),
  },
  loginText: {
    fontSize: 15,
    color: Color.BLUE_DRESS,
  },
});
