import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

// Constant
import Images from "../../theme/Images";
import AsyncStorage from "../../helper/AsyncStorage";
import { scale } from "../../theme/Scalling";
import Color from "../../theme/Color";
// Component
import Loader from "../../component/Loader";
import HeaderComp from "../../component/Header";

import DeletPopUpCom from "../../component/DeletPopUpCom";
import ButtonComp from "../../component/Button";
import BusinessDetailsComp from "../../component/MenuComponent/BusinessDetails";
import CredentialsComp from "../../component/MenuComponent/Credentials";
import PortfolioComp from "../../component/MenuComponent/Portfolio";
import FaqsComp from "../../component/MenuComponent/FAQ's";
import AnalyticsComp from "../../component/MenuComponent/Analytics";
import LogoutModalComp from "../../component/DeletPopUpCom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import ReduxActions from "../../helper/ReduxActions";

const menuItem = [
  {
    id: 0,
    menuName: "Business Details",
  },
  {
    id: 1,
    menuName: "Credentials",
  },
  {
    id: 2,
    menuName: "Portfolio",
  },
  {
    id: 3,
    menuName: "FAQ's",
  },
  {
    id: 4,
    menuName: "Analytics",
  },
];

const BusinessProfile = (props) => {
  // ------- UseSelectore ------- //
  const dispatch = useDispatch();
  const loaderResponse = useSelector((state) => state.loader);

  // -------  State ------- //
  const [openProfile, setOpenProfile] = useState(false);
  const [deletPopUpOpen, setDeletPopUpOpen] = useState(false);
  const [selectedMenu, setselectedMenu] = useState("Business Details");
  const [profileDetails, setProfileDetails] = useState({});
  const [userType, setUserType] = useState();
  const [openLogoutPopup, setOpenLogoutPopup] = useState(false);
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

  /// ---------- DeletAccountApicall ---------- ///

  const DeletAccountApicall = () => {
    dispatch(ReduxActions.loaderAction(true));
    dispatch(ReduxActions.DeletAccountRequest(props.navigation));
  };

  /// ---------- logout ---------- ///
  const logout = () => {
    AsyncStorage.removeItem("login");
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("userId");
    props.navigation.replace("LoginStack");
    setOpenProfile(false);
    dispatch(ReduxActions.LoginResponse(null));
  };

  return (
    <SafeAreaView style={styles.safeareacontainer}>
      <Loader val={loaderResponse.loader} />
      <HeaderComp
        openDrawer={() => props.navigation.goBack()}
        profileOnPress={() => setOpenProfile(true)}
        leftSideIcon={Images.BackArrow}
        profileDetails={profileDetails !== null ? profileDetails : null}
        userType={userType !== null ? userType : null}
      />
      <ScrollView scrollIndicatorInsets={false}>
        <View style={styles.headerImageView}>
          {profileDetails !== null ? (
            profileDetails.imageUrl !== null ? (
              <Image
                source={{ uri: profileDetails.imageUrl }}
                style={styles.profileImageStyle}
              />
            ) : (
              <Image
                source={Images.Profile}
                style={styles.staticProfileImage}
              />
            )
          ) : null}
          <ButtonComp
            disabled={false}
            paddingHorizontal={10}
            marginHorizontal={0}
            onPress={() => {}}
            text={"Public Profile"}
          />
        </View>
        <View style={styles.menuItemView}>
          <TouchableOpacity style={{ justifyContent: "center" }}>
            <Image
              source={Images.LeftArrow}
              style={{ height: 24, width: 24 }}
            />
          </TouchableOpacity>
          <FlatList
            data={menuItem}
            horizontal
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => setselectedMenu(item.menuName)}
                  style={styles.selectmenuItem}
                >
                  <Text
                    style={[
                      styles.menuItemFont,
                      {
                        color:
                          selectedMenu === item.menuName
                            ? Color.BUTTON_LIGHTBLUE
                            : null,
                        borderBottomWidth:
                          selectedMenu === item.menuName ? 1 : null,
                        borderBottomColor:
                          selectedMenu === item.menuName
                            ? Color.BUTTON_LIGHTBLUE
                            : null,
                      },
                    ]}
                  >
                    {item.menuName}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
          <TouchableOpacity style={{ justifyContent: "center" }}>
            <Image
              source={Images.RightArrow}
              style={{ height: 28, width: 28 }}
            />
          </TouchableOpacity>
        </View>
        {selectedMenu === "Business Details" ? (
          <BusinessDetailsComp
            profileData={profileDetails !== null ? profileDetails : null}
          />
        ) : selectedMenu === "Credentials" ? (
          <CredentialsComp />
        ) : selectedMenu === "Portfolio" ? (
          <PortfolioComp />
        ) : selectedMenu === "FAQ's" ? (
          <FaqsComp />
        ) : selectedMenu === "Analytics" ? (
          <AnalyticsComp />
        ) : null}
      </ScrollView>

      {/*** Modal Part ***/}

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
    </SafeAreaView>
  );
};
export default BusinessProfile;

const styles = StyleSheet.create({
  safeareacontainer: {
    flex: 1,
    backgroundColor: Color.LIGHT_GREY,
  },
  headerImageView: {
    // backgroundColor: "pink",
    padding: scale(12),
    marginTop: scale(5),
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  profileImageStyle: {
    height: 80,
    width: 80,
    borderRadius: scale(50),
  },
  staticProfileImage: {
    height: 80,
    width: 80,
    borderRadius: scale(50),
  },
  menuItemView: {
    elevation: 8,
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(10),
    backgroundColor: Color.BACKGROUND_WHITE,
    padding: scale(2),
    marginHorizontal: scale(13),
  },
  selectmenuItem: {
    justifyContent: "center",
    marginHorizontal: scale(5),
    borderBottomColor: Color.LIGHT_GREY,
  },
  menuItemFont: {
    fontSize: 17,
  },
});
