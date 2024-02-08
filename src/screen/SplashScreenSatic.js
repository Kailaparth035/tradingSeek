import React, { useEffect } from "react";
import {
  StatusBar,
  View,
  Image,
  Animated,
  Easing,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "react-native-splash-screen";
import Images from "../theme/Images";
// ----- Assets -----
// import Colors from "../../theme/Colors";
// import Images from "../../theme/Images";
// import NavConstant from "../../theme/NavigationConstant";

const SplashScreenSatic = ({ navigation }) => {
  //   const { navigation } = props;
  // ----- Animation Values -----
  const value = new Animated.Value(0);
  // const value2 = new Animated.Value(2);
  // const value3 = new Animated.Value(3);
  // const value4 = new Animated.Value(4);
  // const value5 = new Animated.Value(5);
  // const value6 = new Animated.Value(6);

  // ----- Animation Value changes -----
  // const logoAnimate = value.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [0, 100],
  // });
  // const firstText = value2.interpolate({
  //   inputRange: [1, 2],
  //   outputRange: [0, 0],
  // });
  // const secondText = value3.interpolate({
  //   inputRange: [1, 2],
  //   outputRange: [40, 20],
  // });
  // const thirdText = value4.interpolate({
  //   inputRange: [1, 2],
  //   outputRange: [80, 50],
  // });
  // const fourText = value5.interpolate({
  //   inputRange: [1, 2],
  //   outputRange: [130, 100],
  // });
  // const fifthText = value5.interpolate({
  //   inputRange: [1, 2],
  //   outputRange: [172, 150],
  // });

  // ----- useEffects -----
  useEffect(() => {
    setTimeout(() => {
      Animated.timing(value, {
        toValue: 200,
        duration: 500,
        // useNativeDriver: true,
        // easing: Easing.ease,
      }).start();

      // Animated.timing(value2, {
      //   toValue: 1,
      //   duration: 500,
      //   useNativeDriver: true,
      // }).start();
      // Animated.timing(value3, {
      //   toValue: 0,
      //   duration: 500,
      //   useNativeDriver: true,
      // }).start();
      // Animated.timing(value4, {
      //   toValue: 0,
      //   duration: 500,
      //   useNativeDriver: true,
      // }).start();
      // Animated.timing(value5, {
      //   toValue: 0,
      //   duration: 500,
      //   useNativeDriver: true,
      // }).start();
      // Animated.timing(value6, {
      //   toValue: 0,
      //   duration: 500,
      //   useNativeDriver: true,
      // }).start();
    }, 1000);
  }, []);
  useEffect(() => {
    SplashScreen.hide();

    setTimeout(() => {
      AsyncStorage.getItem("token").then((res) => {
        if (res !== null) {
          navigation.replace("HomeNavigator");
        } else {
          navigation.replace(NavConstant.AUTH_NAV);
        }
      });
    }, 5000);
  }, []);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={style.container}>
        {/* <View style={style.animated_img_view}> */}
        <Animated.Image
          source={Images.logo}
          resizeMode="contain"
          style={{
            height:'50%',
            width:'100%',
            marginTop: value,
          }}
        />
        {/* <Animated.Image
            source={Images.Y}
            style={{
              position: "absolute",
              transform: [{ translateX: secondText }],
            }}
          />
          <Animated.Image
            source={Images.D}
            style={{
              position: "absolute",
              transform: [{ translateX: thirdText }],
            }}
          />
          <Animated.Image
            source={Images.L}
            style={{
              position: "absolute",
              marginLeft: 6,
              transform: [{ translateX: fourText }],
            }}
          />
          <Animated.View
            style={[
              style.animated_view,
              { transform: [{ translateX: fifthText }] },
            ]}
          >
            <Image source={Images.T} />

            <Image source={Images.M} />
          </Animated.View>
        </View>
        <Animated.Image
          source={Images.VYDL_LOGO}
          style={{
            transform: [{ translateX: logoAnimate }],
            position: "absolute",
          }}
        /> */}
      </View>
    </>
  );
};
export default SplashScreenSatic;

const style = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: 'white',
    // justifyContent: "center",
    // paddingHorizontal: 30,
  },
  animated_img_view: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  animated_view: {
    flex: 1,
    // alignItems: "center",
    // backgroundColor: Colors.ORAGE_DARK,
    flexDirection: "row",
    // position: "absolute",
    // right: 70,
  },
});
