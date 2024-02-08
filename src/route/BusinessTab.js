import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from "react-native";

// #Constant
import Color from "../theme/Color";
import { scale } from "../theme/Scalling";
import Images from "../theme/Images";
import AsyncStorage from "../helper/AsyncStorage";
import ReduxActions from "../helper/ReduxActions";

// #Vectore Icon
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// #Library
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { Badge } from "react-native-elements";

// #Screen
import Lead from "../screen/HomeStack/Lead";
import MyResponses from "../screen/HomeStack/MyResponses";
import Help from "../screen/HomeStack/Help";

import Profile from "../screen/HomeStack/Profile";
import { color } from "react-native-reanimated";

const Tab = createBottomTabNavigator();
const BusinessTab = () => {
  // UseSelectore and usedispatch
  const dispatch = useDispatch();
  const conversationResponse = useSelector((state) => state.Conversation);

  // state
  const [pendingMsg, setPendingMsg] = useState(0);
  const [profileDetails, setProfileDetails] = useState({});

  // Connect To socket
  const socket = io("https://api.tradingseek.net", {
    transports: ["websocket"],
  });
  // useEffect(() => {
  //   socket.on("connect", () => {
  //     // console.log("Socket connected");
  //   });
  //   socket.on("create-message", (message) => {
  //     // AsyncStorage.getItem("userId").then((value) => {
  //     dispatch(ReduxActions.ConversationRequest(3));
  //     // });
  //   });

  //   AsyncStorage.getItem("userProfile").then((profileData) => {
  //     setProfileDetails(JSON.parse(profileData));
  //   });
  // }, []);

  let countMsg;
  useEffect(() => {
    // alert("business tab");
    if (
      conversationResponse.data !== null &&
      conversationResponse.data !== undefined
    ) {
      let temp = conversationResponse.data.conversations;
      countMsg = 0;
      temp.map((tempItem, tempIndex) => {
        if (tempItem.messages.length !== 0) {
          if (tempItem.receiverId !== null) {
            tempItem.messages.map((msgItem) => {
              if (msgItem.seenTime === null) {
                // console.log("msgItem.seenTime ::", msgItem.seenTime);
                if (profileDetails !== null) {
                  // console.log(
                  //   "profileDetails.userType ::",
                  //   profileDetails.userType
                  // );
                  if (profileDetails.userType === "Business User") {
                    // console.log(
                    //   "profileDetails.switchedToCustomerViewApk ::",
                    //   profileDetails.switchedToCustomerViewApk
                    // );
                    if (profileDetails.switchedToCustomerViewApk === false) {
                      if (msgItem.senderId === tempItem.receiverId._id) {
                        countMsg = countMsg + 1;
                      }
                    }
                  }
                }
              }
            });
          }
        }
        // console.log("countMsg ::", countMsg);
        setPendingMsg(countMsg);
      });
    } else {
      countMsg = 0;
      // AsyncStorage.getItem("userId").then((value) => {
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.ConversationRequest(10));
      // });
      AsyncStorage.getItem("userProfile").then((profileData) => {
        setProfileDetails(JSON.parse(profileData));
      });
    }
  }, [conversationResponse.data]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          // console.log("route :::", route.name);
          if (route.name === "Leads") {
            iconName = "shopping-bag";
          } else if (route.name === "My Responses") {
            iconName = "message-processing";
          } else if (route.name === "Help") {
            iconName = "help-circle";
          } else if (route.name === "Profile") {
            iconName = "user-circle";
          }
          return (
            <>
              {route.name === "Leads" ? (
                <MaterialIcons
                  name={iconName}
                  size={22}
                  color={
                    focused ? Color.BACKGROUND_WHITE : Color.BUTTON_LIGHTBLUE
                  }
                />
              ) : route.name === "My Responses" ? (
                <MaterialCommunityIcons
                  name={iconName}
                  size={22}
                  color={
                    focused ? Color.BACKGROUND_WHITE : Color.BUTTON_LIGHTBLUE
                  }
                />
              ) : route.name === "Help" ? (
                <MaterialCommunityIcons
                  name={iconName}
                  size={22}
                  color={
                    focused ? Color.BACKGROUND_WHITE : Color.BUTTON_LIGHTBLUE
                  }
                />
              ) : (
                <FontAwesome5
                  name={iconName}
                  size={22}
                  color={
                    focused ? Color.BACKGROUND_WHITE : Color.BUTTON_LIGHTBLUE
                  }
                />
              )}
            </>
          );
        },

        tabBarActiveBackgroundColor: Color.BUTTON_LIGHTBLUE,
        tabBarActiveTintColor: Color.BACKGROUND_WHITE,
        tabBarInactiveTintColor: Color.BUTTON_LIGHTBLUE,
      })}
    >
      <Tab.Screen
        name="Leads"
        component={Lead}
        options={{
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: "500",
            marginHorizontal: 3,
          },
        }}
      />
      <Tab.Screen
        name="My Responses"
        component={MyResponses}
        options={{
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: "500",
            marginHorizontal: 3,
          },
        }}
      />
      <Tab.Screen
        name="Help"
        component={Help}
        options={{
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: "500",
            marginHorizontal: 3,
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: "500",
            marginHorizontal: 3,
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default BusinessTab;
