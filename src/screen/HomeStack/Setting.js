import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Linking,
} from "react-native";
import Color from "../../theme/Color";
import Images from "../../theme/Images";
import { scale } from "../../theme/Scalling";
import Optioncomp from "../../component/Option";
import Loader from "../../component/Loader";
import ReduxActions from "../../helper/ReduxActions";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "../../helper/AsyncStorage";
import auth from "@react-native-firebase/auth";
import LogoutModalComp from "../../component/DeletPopUpCom";
import DeletPopUpCom from "../../component/DeletPopUpCom";
import Header from "../../component/Header";

const Setting = ({ navigation }) => {
  const dispatch = useDispatch();
  const loaderResponse = useSelector((state) => state.loader);
  const [profileDetails, setProfileDetails] = useState({});
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null);
  const [deletPopUpOpen, setDeletPopUpOpen] = useState(false);
  const [openLogoutPopup, setOpenLogoutPopup] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("userProfile").then((profileData) => {
      // console.log("profileData.userAType", JSON.parse(profileData));
      setProfileDetails(JSON.parse(profileData));
    });

    AsyncStorage.getItem("userType").then((userType) => {
      setUserType(userType);
    });

    AsyncStorage.getItem("userId").then((value) => {
      var val = value;
      setUserId(val);
    });
  }, []);

  const switchingAccount = () => {
    let switchAccountkey = "switchAccount";
    let switchingData = {
      value:
        profileDetails.switchedToCustomerViewApk === false ? "true" : "false",
      field: "switchedToCustomerViewApk",
    };
    dispatch(ReduxActions.loaderAction(true));
    dispatch(ReduxActions.ConversationResponse(null));
    dispatch(
      ReduxActions.UpadateUserInfoRequest(
        switchingData,
        switchAccountkey,
        navigation
      )
    );
  };

  const DeletAccountApicall = () => {
    dispatch(ReduxActions.loaderAction(true));
    dispatch(ReduxActions.DeletAccountRequest(navigation));
  };

  const logout = () => {
    AsyncStorage.removeItem("login");
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("userId");
    AsyncStorage.removeItem("userType");
    AsyncStorage.removeItem("userProfile");
    navigation.replace("LoginStack");
    dispatch(ReduxActions.LoginResponse(null));
    dispatch(ReduxActions.GetUserJobResponse(null));
    dispatch(ReduxActions.LeadResponse(null));
    auth().signOut();
  };
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle="dark-content"
      />
      <Header goBack={() => navigation.goBack()} header_title="Settings" />
      <ScrollView style={styles.container}>
        {/** Account Setting option**/}
        {/* {profileDetails !== null &&
        profileDetails.userType === "Business User" ? (
          profileDetails.switchedToCustomerViewApk === false ? (
            <>
              <Text style={styles.title_text}>Account Settings</Text>
              <Optioncomp
                image={Images.Notification}
                label={"Notification"}
                onPress={() => navigation.navigate("Notification")}
              />
              <Optioncomp
                image={Images.ProfileSetting}
                label={"Lead Settings"}
                onPress={() => navigation.navigate("LeadActivity")}
              />
              <Optioncomp
                image={Images.ActivityQuotes}
                label={"Quote Activity"}
                onPress={() => navigation.navigate("QuoteActivity")}
              />
            </>
          ) : null
        ) : null} */}

        {/** personal Setting option**/}
        <Text style={styles.title_text}>PERSONAL</Text>

        <Optioncomp
          image={Images.Notification}
          label={"Notification"}
          onPress={() => navigation.navigate("Notification")}
        />

        <Optioncomp
          image={Images.Edit}
          label={"Edit Profile"}
          onPress={() => {
            dispatch(ReduxActions.UpdateUserNameResponse(null));
            navigation.navigate("EditProfile");
          }}
        />
        <Optioncomp
          image={Images.Password}
          label={"Password"}
          onPress={() => {
            dispatch(ReduxActions.ResetPasswordResponse(null));
            navigation.navigate("ResetPassword");
          }}
        />
        {profileDetails !== null ? (
          profileDetails.userType === "Business User" ? (
            <Optioncomp
              image={Images.SwitchingAccount}
              label={
                profileDetails !== null
                  ? profileDetails.switchedToCustomerViewApk === false
                    ? "Switch to customer view"
                    : "Switch to business view"
                  : null
              }
              onPress={() => switchingAccount()}
            />
          ) : null
        ) : null}
        {profileDetails !== null &&
        profileDetails.userType !== "Business User" ? (
          <Optioncomp
            image={Images.RegisterrMyBusiness}
            label={"Register Your Business"}
            onPress={() =>
              navigation.navigate("BussinessAccount", {
                key: "AfterLogin",
                data: profileDetails !== null ? profileDetails : null,
              })
            }
          />
        ) : null}

        {/** Business Setting option**/}
        {profileDetails !== null ? (
          profileDetails.userType === "Business User" ? (
            profileDetails.switchedToCustomerViewApk === false ? (
              <>
                <Text style={styles.title_text}>BUSINESS</Text>
                <Optioncomp
                  image={Images.Activity}
                  label={"Activity"}
                  onPress={() => navigation.navigate("QuoteActivity")}
                />
                {profileDetails.isAutoquote !== false ? (
                  <Optioncomp
                    image={Images.Auto_quotes}
                    label={"Auto quoting"}
                    onPress={() => navigation.navigate("AutoQuoting")}
                  />
                ) : null}

                <Optioncomp
                  image={Images.Search}
                  label={"Lead management"}
                  onPress={() => navigation.navigate("LeadActivity")}
                />
                {/* <Optioncomp
                  image={Images.Account_sync}
                  label={"Sync accounts"}
                  onPress={() => {}}
                /> */}
              </>
            ) : null
          ) : null
        ) : null}

        {/** General Setting option**/}
        <Text style={styles.title_text}>GENERAL</Text>
        <Optioncomp
          image={Images.HowItWork}
          label={"How it works"}
          onPress={() =>
            Linking.openURL("https://tradingseek.net/how-it-works")
          }
        />
        <Optioncomp
          image={Images.Help}
          label={"Help"}
          onPress={() => navigation.navigate("Help", { key: "setting" })}
        />
        <Optioncomp
          image={Images.Term_and_condition}
          label={"Terms and conditions"}
          onPress={() => Linking.openURL("https://tradingseek.net/policy/1")}
        />
        <Optioncomp
          image={Images.Term_and_condition}
          label={"Privacy policy"}
          onPress={() => Linking.openURL("https://tradingseek.net/policy/0")}
        />
        <Optioncomp
          image={Images.About}
          label={"About"}
          onPress={() => Linking.openURL("https://tradingseek.net/about")}
        />

        <Optioncomp
          image={Images.Delet}
          label={"Delete Account"}
          onPress={() => setDeletPopUpOpen(true)}
        />
        <Optioncomp
          image={Images.LogOut}
          label={"Log out"}
          onPress={() => setOpenLogoutPopup(true)}
        />
      </ScrollView>
      <Loader val={loaderResponse.loader} />

      <DeletPopUpCom
        deletPopUpVisibale={deletPopUpOpen}
        nodeletProfile={() => setDeletPopUpOpen(false)}
        yesDeletProfile={() => DeletAccountApicall()}
        loaderValue={loaderResponse.loader}
        DeletConfirmText={"Are you sure?"}
        DeletExclamationmarkText={"You won't be able to revert this!"}
        DeletNoButton={"No, cancel!"}
        DeletYesButton={"Yes, delete it!"}
      />
      <LogoutModalComp
        deletPopUpVisibale={openLogoutPopup}
        nodeletProfile={() => setOpenLogoutPopup(false)}
        yesDeletProfile={() => logout()}
        loaderValue={loaderResponse.loader}
        DeletConfirmText={"Are you sure?"}
        DeletExclamationmarkText={"You are logging out of your account!"}
        DeletNoButton={"No, cancel!"}
        DeletYesButton={"Yes, Logout it!"}
      />
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_WHITE,
  },

  // option style
  title_text: {
    padding: scale(12),
    fontSize: 14,
    fontWeight: "600",
    color: Color.BUTTON_LIGHTBLUE,
  },
});
