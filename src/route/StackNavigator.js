import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "../helper/AsyncStorage";

// LoginStack
import Login from "../screen/LoginStack/Login";
import Forget from "../screen/LoginStack/Forget";
import SignUp from "../screen/LoginStack/SignUp";
import Postjob from "../screen/LoginStack/Postjob";
import BussinesAccount from "../screen/LoginStack/BussinesAcoount";

// HomeStack
// import SplashScreenSatic from "../screen/SplashScreenSatic";
import CustomeTab from "./CustomeTab";
import BusinessTab from "./BusinessTab";
import ChatBox from "../screen/HomeStack/ChatBox";
import Profile from "../screen/HomeStack/Profile";
import Setting from "../screen/HomeStack/Setting";
import EditProfile from "../screen/HomeStack/EditProfile";
import ResetPassword from "../screen/HomeStack/ResetPassword";
import MyJob from "../screen/HomeStack/MyJob";
import JobDetails from "../screen/HomeStack/JobDetails";
import LeadDetails from "../screen/HomeStack/LeadDetails";
import JobInformation from "../screen/HomeStack/JobInformation";
import Notification from "../screen/HomeStack/Notification";
import QuoteActivity from "../screen/HomeStack/QuoteActivity";
import LeadActivity from "../screen/HomeStack/LeadActivity";
import Help from "../screen/HomeStack/Help";
import AutoQuoting from "../screen/HomeStack/AutoQuoting";

const Stack = createStackNavigator();

const StackNav = () => {
  const [initRoute, setInitRoute] = useState(null);
  const [homeStackInitialRoute, setHomeStackInitialRoute] = useState(null);
  const sessionInfo = async () => {
    AsyncStorage.getItem("login").then((value) => {
      if (value === null) {
        setInitRoute("LoginStack");
      } else {
        setInitRoute("HomeStack");
      }
    });
  };
  useEffect(() => {
    sessionInfo();
  }, [initRoute]);

  // horizontal animation navigation swipe
  const horizontalAnimation = {
    gestureDirection: "horizontal",
    cardStyleInterpolator: ({ current, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
  };

  // --------- HomeStack --------- //
  const HomeStack = () => {
    const chooseTab = async () => {
      AsyncStorage.getItem("UserType").then((val) => {
        if (val === "Business User") {
          setHomeStackInitialRoute("BusinessTab");
        } else {
          setHomeStackInitialRoute("CustomeTab");
        }
      });
    };

    useEffect(() => {
      chooseTab();
    }, [homeStackInitialRoute]);

    return (
      homeStackInitialRoute && (
        <Stack.Navigator
          initialRouteName={homeStackInitialRoute}
          screenOptions={(horizontalAnimation, { headerShown: false })}
        >
          <Stack.Screen name="CustomeTab" component={CustomeTab} />
          <Stack.Screen name="BusinessTab" component={BusinessTab} />
          <Stack.Screen name={"BussinessAccount"} component={BussinesAccount} />
          <Stack.Screen name={"ChatBox"} component={ChatBox} />
          <Stack.Screen name={"Profile"} component={Profile} />
          <Stack.Screen name={"MyJob"} component={MyJob} />
          <Stack.Screen name={"Setting"} component={Setting} />
          <Stack.Screen name={"EditProfile"} component={EditProfile} />
          <Stack.Screen name={"ResetPassword"} component={ResetPassword} />
          <Stack.Screen name={"JobDetails"} from component={JobDetails} />
          <Stack.Screen name={"LeadDetails"} from component={LeadDetails} />
          <Stack.Screen name={"Notification"} from component={Notification} />
          <Stack.Screen name={"QuoteActivity"} from component={QuoteActivity} />
          <Stack.Screen name={"LeadActivity"} from component={LeadActivity} />
          <Stack.Screen name={"AutoQuoting"} from component={AutoQuoting} />
          <Stack.Screen name={"Help"} from component={Help} />
          <Stack.Screen
            name={"JobInformation"}
            from
            component={JobInformation}
          />
        </Stack.Navigator>
      )
    );
  };

  // --------- AuthStack  --------- //

  const LoginStack = () => {
    return (
      <Stack.Navigator
        initialRouteName={"Login"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={"Login"} component={Login} />
        <Stack.Screen name={"Forget"} component={Forget} />
        <Stack.Screen name={"Signup"} component={SignUp} />
        <Stack.Screen name={"Postjob"} component={Postjob} />
        <Stack.Screen name={"BussinessAccount"} component={BussinesAccount} />
      </Stack.Navigator>
    );
  };

  // --------- main returm --------- //

  return (
    initRoute && (
      <Stack.Navigator
        initialRouteName={initRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={"LoginStack"} component={LoginStack} />
        <Stack.Screen name={"HomeStack"} component={HomeStack} />
      </Stack.Navigator>
    )
  );
};
export default StackNav;
