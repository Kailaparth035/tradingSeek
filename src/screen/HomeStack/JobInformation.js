import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
  Linking,
  Dimensions,
  StatusBar,
  Modal,
  Platform,
} from "react-native";

import Colors from "../../theme/Color";
import Font from "../../theme/Font";
import Images from "../../theme/Images";
import { scale } from "../../theme/Scalling";
import { AirbnbRating, Rating } from "react-native-ratings";
import Header from "../../component/Header";
import { useDispatch, useSelector } from "react-redux";

const JonInformation = (props) => {
  const updateProfileResponse = useSelector((state) => state.GetProfileData);
  const [propsDetails, setpropsDetails] = useState(
    props.route.params?.QuotedUSerprofileData
  );

  const [openAbout, setOpenAbout] = useState(false);
  const [callModal, setCallModal] = useState(false);
  const [openPortFolio, setOpenPortFolio] = useState(false);
  const [credential, setCredential] = useState(false);
  const [profileDetails, setProfileDetails] = useState(null);

  const sendEmail = () => {
    if (propsDetails.email !== null) {
      // console.log("props.QuotedUSerprofileData.email", propsDetails.email);
      Linking.openURL(`mailto:${propsDetails.email}`);
    }
  };

  useEffect(() => {
    if (updateProfileResponse.data !== null) {
      console.log(
        "updateProfileResponse.data ::",
        updateProfileResponse.data.user
      );
      setProfileDetails(updateProfileResponse.data.user);
    }
  }, [updateProfileResponse.data.user]);

  const callingFunction = (key, value) => {
    if (key === "phone") {
      Linking.openURL(`tel:${value}`)
        .then((resp) => {
          // console.log(resp);
        })
        .catch((error) => {
          dispatch(
            ReduxActions.ToastDisplay({
              type: "negative",
              title: error,
            })
          );
        });
    } else if (key === "email") {
      Linking.openURL(`mailto:${value}`);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle="dark-content"
      />
      <Header
        goBack={() => props.navigation.goBack()}
        header_title="Quoted User Details"
      />
      <ScrollView>
        {propsDetails.imageUrl !== null ? (
          <Image
            source={{ uri: propsDetails.imageUrl }}
            style={styles.profileImageStyles}
          />
        ) : (
          <Image source={Images.Profile} style={styles.staticProfileImage} />
        )}
        <Text
          style={[
            styles.textBlack,
            { fontWeight: "500", textAlign: "center", marginTop: scale(5) },
          ]}
        >
          {propsDetails.email !== null ? propsDetails.email : null}
        </Text>

        {propsDetails.userType === "Business User" &&
        propsDetails.switchedToCustomerViewApk !== true ? (
          <View style={styles.fieldView}>
            <View style={styles.subFieldView}>
              <Text style={styles.textBlack}>21</Text>
              <Text style={styles.textBlack}>Avg Rating</Text>
            </View>
            <View style={styles.subFieldView}>
              <Text style={styles.textBlack}>
                {propsDetails.reviews.length}
              </Text>
              <Text style={styles.textBlack}>Reviews</Text>
            </View>
            <View style={styles.subFieldView}>
              <Text style={styles.textBlack}>
                {propsDetails.wonJobs.length}
              </Text>
              <Text style={styles.textBlack}>Jobs won</Text>
            </View>
          </View>
        ) : null}

        <View style={[styles.userDetailsView, { marginTop: 10 }]}>
          <Text style={styles.textBlack}>Mobie</Text>
          <Text
            style={[
              styles.textBlack,
              {
                color: Colors.BLUE_DRESS,
              },
            ]}
            onPress={
              () => setCallModal(true)
              // callingFunction("phone", props.QuotedUSerprofileData.phone)
            }
          >
            {propsDetails.phone !== null ? propsDetails.phone : null}
          </Text>
        </View>
        <View style={styles.userDetailsView}>
          <Text style={styles.textBlack}>Email</Text>
          <Text
            style={[
              styles.textBlack,
              {
                color: Colors.BLUE_DRESS,
              },
            ]}
            onPress={() => callingFunction("email", propsDetails.email)}
          >
            {propsDetails.email !== null ? propsDetails.email : null}
          </Text>
        </View>
        <View style={styles.userDetailsView}>
          <Text style={styles.textBlack}>Location</Text>
          <Text
            style={[
              styles.textBlack,
              {
                color: Colors.BLUE_DRESS,
              },
            ]}
          >
            {propsDetails.locations.length !== 0
              ? propsDetails.locations[0].locality
              : null}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.openReviewButton, { marginTop: scale(10) }]}
          onPress={() => {
            profileDetails !== null
              ? Linking.openURL(
                  "https://tradingseek.net/business-details/" +
                    profileDetails.businessUrl
                )
              : null;
          }}
        >
          <Text
            style={[
              styles.textBlack,
              { alignSelf: "center", marginBottom: scale(0) },
            ]}
          >
            Reviews ({propsDetails.reviews.length})
          </Text>
          {/* <Image
            source={Images.Down}
            style={[
              styles.down_image,
              {
                transform: [{ rotate: openReviews ? "180deg" : "0deg" }],
              },
            ]}
          /> */}
        </TouchableOpacity>
        {/* {openReviews ? (
          <View style={styles.nodeViewstyle}>
            {propsDetails.reviews.length !== 0 ? (
              <FlatList
                data={propsDetails.reviews}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.reviewFlatlistStyle}>
                      <Text style={styles.useNameText}>
                        {item.postedUserName}
                      </Text>
                      <View style={styles.starRatingView}>
                        <AirbnbRating
                          count={5}
                          reviews=""
                          defaultRating={item.stars}
                          size={20}
                        />
                      </View>
                      {item.comment !== "" && item.comment.length !== 0 ? (
                        <Text style={styles.commentText}>{item.comment}</Text>
                      ) : null}
                    </View>
                  );
                }}
              />
            ) : null}
          </View>
        ) : null} */}
        <TouchableOpacity
          style={styles.openReviewButton}
          onPress={() => setOpenPortFolio(!openPortFolio)}
        >
          <Text
            style={[
              styles.textBlack,
              { alignSelf: "center", marginBottom: scale(0) },
            ]}
          >
            Portfolio ({propsDetails.businessPortfolio.length})
          </Text>
          <Image
            source={Images.Down}
            style={[
              styles.down_image,
              {
                transform: [{ rotate: openPortFolio ? "180deg" : "0deg" }],
              },
            ]}
          />
        </TouchableOpacity>
        {openPortFolio ? (
          <Image
            source={Images.Compare_quotes}
            style={{ width: scale(50), height: scale(50), margin: scale(15) }}
          />
        ) : null}

        <TouchableOpacity
          style={styles.openReviewButton}
          onPress={() => setOpenAbout(!openAbout)}
        >
          <Text
            style={[
              styles.textBlack,
              { alignSelf: "center", marginBottom: scale(0) },
            ]}
          >
            About
          </Text>
          <Image
            source={Images.Down}
            style={[
              styles.down_image,
              {
                transform: [{ rotate: openAbout ? "180deg" : "0deg" }],
              },
            ]}
          />
        </TouchableOpacity>
        {openAbout ? (
          propsDetails.businessDescription !== undefined ? (
            <View style={[styles.reviewFlatlistStyle, { margin: 5 }]}>
              <Text style={styles.commentText}>
                {propsDetails.businessDescription}
              </Text>
            </View>
          ) : (
            <Text
              style={[
                styles.commentText,
                { marginHorizontal: scale(10), color: Colors.RED },
              ]}
            >
              No description
            </Text>
          )
        ) : null}
        <TouchableOpacity
          style={styles.openReviewButton}
          onPress={() => setCredential(!credential)}
        >
          <Text
            style={[
              styles.textBlack,
              { alignSelf: "center", marginBottom: scale(0) },
            ]}
          >
            Credentials
          </Text>
          <Image
            source={Images.Down}
            style={[
              styles.down_image,
              {
                transform: [{ rotate: credential ? "180deg" : "0deg" }],
              },
            ]}
          />
        </TouchableOpacity>
        {credential ? (
          <Image
            source={Images.Compare_quotes}
            style={{ width: scale(50), height: scale(50), margin: scale(15) }}
          />
        ) : null}
      </ScrollView>

      <Modal
        visible={callModal}
        onRequestClose={() => setCallModal(false)}
        transparent={true}
        animationType="slide"
      >
        <Image source={Images.Black} style={styles.modalBackground} />
        <SafeAreaView style={styles.callModal_container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setCallModal(false), callingFunction("phone");
            }}
          >
            <Text style={styles.button_text}>{propsDetails.phone}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setCallModal(false)}
          >
            <Text style={styles.button_text}>cancel</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default JonInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_WHITE,

    elevation: 10,
  },
  backArrowButton: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: scale(5),
    backgroundColor: Colors.LIGHT_GREY,
    padding: scale(5),
    borderRadius: 5,
    marginTop: scale(5),
  },
  profileImageView: {
    justifyContent: "center",
    alignItems: "center",
  },
  profileImageStyles: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: scale(12),
    borderWidth: 2,
    borderColor: Colors.BUTTON_LIGHTBLUE,
  },
  staticProfileImage: {
    width: 120,
    height: 120,
    alignSelf: "center",
  },
  fieldView: {
    flexDirection: "row",
  },
  subFieldView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: scale(10),
    borderWidth: 0.2,
    borderColor: Colors.BorderColor,
  },
  userDetailsView: {
    justifyContent: "center",
    alignItems: "flex-start",
    borderBottomWidth: 0.5,
    borderColor: Colors.BorderColor,
    paddingHorizontal: scale(10),
    paddingVertical: scale(7),
  },
  textBlack: {
    marginBottom: scale(10),
    fontSize: 15,
    color: Colors.COLOR_BLACK,
  },

  openReviewButton: {
    borderBottomWidth: 0.5,
    flexDirection: "row",
    borderBottomColor: Colors.BorderColor,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(10),
    paddingVertical: scale(7),
  },

  // review View Style
  nodeViewstyle: {
    marginHorizontal: scale(5),
    marginVertical: scale(5),
  },
  reviewFlatlistStyle: {
    padding: scale(5),
    backgroundColor: Colors.LIGHT_GREY,
    marginVertical: scale(2),
    borderRadius: scale(5),
    paddingHorizontal: scale(10),
  },
  useNameText: {
    color: Colors.COLOR_BLACK,
    fontFamily: Font.Lato_Bold,
    fontSize: 15,
  },
  starRatingView: {
    marginLeft: scale(-200),
    marginTop: Platform.OS === "ios" ? scale(-25) : scale(-50),
  },
  commentText: {
    color: Colors.COLOR_BLACK,
    fontFamily: Font.Lato_Regular,
    fontSize: 15,
    marginVertical: scale(5),
  },

  //call modal
  callModal_container: {
    marginTop: Dimensions.get("window").height / 1.25,
    marginHorizontal: scale(10),
  },
  button: {
    backgroundColor: Colors.BACKGROUND_WHITE,
    borderRadius: scale(5),
    alignItems: "center",
    marginTop: scale(4),
  },
  button_text: {
    padding: scale(10),
    color: Colors.COLOR_BLACK,
    fontSize: 14,
  },
  modalBackground: {
    flex: 1,
    position: "absolute",
    height: "100%",
    width: "100%",
    opacity: 0.2,
  },
  down_image: { width: 25, height: 25 },
});
