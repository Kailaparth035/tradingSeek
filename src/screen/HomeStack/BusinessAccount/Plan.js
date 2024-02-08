import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";

// Constant

import Images from "../../../theme/Images";
import { scale } from "../../../theme/Scalling";
import AsyncStorage from "../../../helper/AsyncStorage";
import ReduxActions from "../../../helper/ReduxActions";

// Component
import Header from "../../../component/Header";

import DeletPopupCom from "../../../component/DeletPopUpCom";
import Loader from "../../../component/Loader";
import LogoutModalComp from "../../../component/DeletPopUpCom";

// Redux
import { useDispatch, useSelector } from "react-redux";

const Plan = (props) => {
  // ---------- dispatch and useSelectors ---------- //
  const dispatch = useDispatch();
  const loaderResponse = useSelector((state) => state.loader);

  // ---------- state ---------- //
  const [openProfile, setOpenProfile] = useState(false);
  const [deletPopUpOpen, setDeletPopUpOpen] = useState(false);
  const [profileDetails, setProfileDetails] = useState({});
  const [userType, setUserType] = useState();
  const [openLogoutPopup, setOpenLogoutPopup] = useState(false);

  // ---------- Asyncstorage ---------- //

  useEffect(() => {
    AsyncStorage.getItem("userProfile").then((profileData) => {
      // console.log("userProfile  Data ===>", JSON.stringify(profileData));
      setProfileDetails(JSON.parse(profileData));
    });
    AsyncStorage.getItem("userType").then((userType) => {
      // console.log("asyncStorage gate Value ===>", userType);
      setUserType(userType);
    });
  }, []);

  // ---------- switchingAccount ---------- //

  const switchingAccount = () => {
    let switchAccountkey = "switchAccount";
    let switchingData = {
      value: profileDetails.switchedToCustomerViewApk === false ? "true" : "false",
      field: "switchedToCustomerViewApk",
    };
    setOpenProfile(false);
    dispatch(ReduxActions.loaderAction(true));
    dispatch(
      ReduxActions.UpadateUserInfoRequest(
        switchingData,
        switchAccountkey,
        props.navigation
      )
    );
  };
  // ---------- DeletAccountApicall ---------- //

  const DeletAccountApicall = () => {
    dispatch(ReduxActions.loaderAction(true));
    dispatch(ReduxActions.DeletAccountRequest(props.navigation));
    // setDeletPopUpOpen(false);
  };
  // ---------- logout ---------- //
  const logout = () => {
    AsyncStorage.removeItem("login");
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("userId");
    AsyncStorage.removeItem("userType");
    AsyncStorage.removeItem("userProfile");
    props.navigation.replace("LoginStack");
    setOpenProfile(false);
    dispatch(ReduxActions.LoginResponse(null));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        openDrawer={() => props.navigation.goBack()}
        profileOnPress={() => setOpenProfile(true)}
        leftSideIcon={Images.BackArrow}
        profileDetails={profileDetails !== null ? profileDetails : null}
        userType={userType !== null ? userType : null}
      />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ fontSize: 30, textAlign: "center" }}>Plan</Text>
      </View>

      <DeletPopupCom
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
      <Loader val={loaderResponse.loader} />
    </SafeAreaView>
  );
};
export default Plan;
