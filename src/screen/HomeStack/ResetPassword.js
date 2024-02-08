import React, { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StatusBar,
} from "react-native";
import Images from "../../theme/Images";
import Color from "../../theme/Color";
import { scale } from "../../theme/Scalling";
import AsyncStorage from "../../helper/AsyncStorage";
import Loader from "../../component/Loader";
import ReduxActions from "../../helper/ReduxActions";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../component/Header";

const ResetPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const resetPasswordresp = useSelector((state) => state.ResetPassword);
  const loaderResponse = useSelector((state) => state.loader);

  const [currentpassword, setCurrentpassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [newPassEyeIcon, setNewPassEyeIcon] = useState(false);
  const [currentPassEyeIcon, setCurrentPassEyeIcon] = useState(false);
  const [confirmPassEyeIcon, setConfirmPassEyeIcon] = useState(false);
  const [userId, setUserId] = useState(null);

  const openCurrentPassword = () => {
    setCurrentPassEyeIcon((currentPassEyeIcon) => !currentPassEyeIcon);
  };
  const openNewPassword = () => {
    setNewPassEyeIcon((newPassEyeIcon) => !newPassEyeIcon);
  };
  const openConfirmPassword = () => {
    setConfirmPassEyeIcon((confirmPassEyeIcon) => !confirmPassEyeIcon);
  };

  useEffect(() => {
    AsyncStorage.getItem("userId").then((value) => {
      var val = value;
      setUserId(val);
    });
  }, []);
  useEffect(() => {
    if (resetPasswordresp.data !== null) {
      // console.log("resetPasswordresp.data", resetPasswordresp.data);
      if (resetPasswordresp.data.message === "Old password does not match") {
        setCurrentpassword("");
      } else {
        navigation.goBack();
      }
    }
  }, [resetPasswordresp.data]);

  const resetPasswordApicall = () => {
    if (confirmPassword === newPassword) {
      let resPasswordbodyData = {
        confirmpassword: confirmPassword,
        id: userId,
        oldpassword: currentpassword,
        password: newPassword,
      };
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.ResetPasswordRequest(resPasswordbodyData));
    } else {
      dispatch(
        ReduxActions.ToastDisplay({
          type: "negative",
          title: "Enter correct password.",
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
      <Header goBack={() => navigation.goBack()} header_title="Password" />
      <ScrollView style={styles.container}>
        <Text style={styles.title_text}>Current Password :</Text>
        <View style={styles.passwordView}>
          <TextInput
            style={styles.textInputePasswordView}
            placeholder="Current Password"
            value={currentpassword}
            secureTextEntry={currentPassEyeIcon ? true : false}
            onChangeText={(val) => setCurrentpassword(val)}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => openCurrentPassword()}>
            <Image
              source={!currentPassEyeIcon ? Images.OpenEye : Images.CloseEye}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.title_text}>New Password :</Text>
        <View style={styles.passwordView}>
          <TextInput
            style={styles.textInputePasswordView}
            placeholder="New Password"
            value={newPassword}
            secureTextEntry={!newPassEyeIcon ? true : false}
            onChangeText={(val) => setNewPassword(val)}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => openNewPassword()}>
            <Image
              source={newPassEyeIcon ? Images.OpenEye : Images.CloseEye}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.title_text}>Confirm Password :</Text>
        <View style={styles.passwordView}>
          <TextInput
            style={styles.textInputePasswordView}
            placeholder="Confirm Password"
            value={confirmPassword}
            secureTextEntry={!confirmPassEyeIcon ? true : false}
            onChangeText={(val) => setConfirmPassword(val)}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => openConfirmPassword()}>
            <Image
              source={confirmPassEyeIcon ? Images.OpenEye : Images.CloseEye}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", padding: scale(12) }}>
          <TouchableOpacity
            style={[
              styles.touchabale_button,
              {
                backgroundColor: Color.LIGHT_GREY,
              },
            ]}
            onPress={() => {
              setConfirmPassword(""),
                setNewPassword(""),
                setCurrentpassword(""),
                navigation.goBack();
            }}
          >
            <Text
              style={[styles.footerButtonText, { color: Color.COLOR_BLACK }]}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => resetPasswordApicall()}
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
export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_WHITE,
  },
  header_view: {
    flexDirection: "row",
    padding: scale(12),
    alignItems: "center",
  },
  backarrow_button: {
    flex: 0.1,
    alignItems: "center",
  },
  back_image: {
    width: scale(24),
    height: scale(24),
  },
  header_text: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
    color: Color.COLOR_BLACK,
  },

  // textInpute View
  title_text: {
    paddingHorizontal: scale(12),
    paddingTop: scale(7),
    fontSize: 15,
    fontWeight: "600",
    color: Color.COLOR_BLACK,
  },
  textInputePasswordView: {
    fontSize: 14,
    width: "85%",
    paddingHorizontal: scale(10),
    padding: scale(7),
    color: Color.COLOR_BLACK,
  },
  passwordView: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: scale(20),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Color.BorderColor,
    marginTop: scale(10),
    justifyContent: "space-between",
  },
  eyeIcon: {
    height: 20,
    width: 20,
    marginRight: scale(15),
  },

  touchabale_button: {
    flex: 1,
    alignItems: "center",
    padding: scale(10),
    borderRadius: scale(5),
    marginHorizontal: scale(5),
  },
});
