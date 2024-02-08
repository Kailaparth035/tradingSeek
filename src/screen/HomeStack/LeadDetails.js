import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Linking,
} from "react-native";
import Color from "../../theme/Color";
import Header from "../../component/Header";
import { scale, width } from "../../theme/Scalling";
import Images from "../../theme/Images";
import { useDispatch, useSelector } from "react-redux";
import ReduxActions from "../../helper/ReduxActions";
import Loader from "../../component/Loader";
import Moment from "moment";
import AsyncStorage from "../../helper/AsyncStorage";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const LeadDetails = (props) => {
  const dispatch = useDispatch();
  const loaderResponse = useSelector((state) => state.loader);
  const savedraftResponse = useSelector((state) => state.Savedraft);
  const removeDraftResponse = useSelector((state) => state.RemoveDraft);

  const [openJobDetails, setOpenJobDetails] = useState(false);
  const [costEstimate, setCostEstimate] = useState("Flat");
  const [openComment, setOpenComment] = useState(false);
  const [userDetails, setUserDetails] = useState(false);
  const [budget, setBudget] = useState("");
  const [comment, setComment] = useState("");
  const [profileDetails, setProfileDetails] = useState(null);
  // console.log("props :::", props.route.params.data);

  useEffect(() => {
    console.log(props.route.params.data);
    if (props.route.params.type === "get-quoted-leads") {
      setUserDetails(true);
      setOpenJobDetails(true);
    }
    AsyncStorage.getItem("userProfile").then((profileData) => {
      setProfileDetails(JSON.parse(profileData));
      // console.log("category", JSON.parse(profileData));
    });
  }, []);

  const save_as_draft = () => {
    if (props.route.params.data.isDraft !== true) {
      let bodyData = {
        id: props.route.params.data._id,
        metadata: {
          checkbox: {
            cost: false,
            comment: openComment,
          },
          newQuote: {
            estCost: {
              type: costEstimate,
              value: budget,
            },
            comment: {
              value: comment,
            },
          },
        },
      };

      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.SaveDraftRequest(bodyData));
    } else {
      let bodyData = {
        params: {
          jobId: props.route.params.data._id,
        },
      };
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.RemoveDraftRequest(bodyData, props.navigation));
    }
  };

  useEffect(() => {
    // console.log("removeDraftSaga:::", removeDraftResponse);
    if (removeDraftResponse.data !== null) {
      dispatch(ReduxActions.RemoveDraftResponse(null));
      props.navigation.goBack();
    }
  }, [removeDraftResponse.data]);

  useEffect(() => {
    // console.log("savedraftResponse.data::", savedraftResponse.data);
    if (savedraftResponse.data !== null) {
      props.navigation.goBack();
      dispatch(ReduxActions.SaveDraftResponse(null));
    }
  }, [savedraftResponse.data]);

  const call_quoted_nowApi = () => {
    let bodyData = {
      data: {
        jobId: props.route.params.data._id,
        businessUserId: profileDetails._id,
        customerId: props.route.params.data.user._id,
        senderType: profileDetails.switchedToCustomerViewApk,
        // budget: budget,
        budgetType: costEstimate,
        // comments: comment,
        lead: props.route.params.data,
      },
    };
    if (budget !== "") {
      if (comment !== "") {
        bodyData = { ...bodyData.data, budget: budget, comments: comment };
      } else {
        bodyData = { ...bodyData.data, budget: budget };
      }
    } else if (comment !== "") {
      if (budget !== "") {
        bodyData = { ...bodyData.data, budget: budget, comments: comment };
      } else {
        bodyData = { ...bodyData.data, comment: comment };
      }
    }
    console.log("bodyData :::", JSON.stringify(bodyData));
    dispatch(ReduxActions.loaderAction(true));
    dispatch(ReduxActions.SendQuoteRequest(bodyData, props.navigation));
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
        header_title="Lead Details"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {props.route.params.type !== "get-quoted-leads" ? (
          <View style={{ padding: scale(15) }}>
            <Text style={styles.newQuote_header}>New Quote</Text>
            <Text style={styles.newQuote_description}>
              Please provide details to art which will help with their hiring
              decision. Choose at least one option to start the conversation.
            </Text>
            <Text style={styles.sub_header}>Cost estimate</Text>
            <Text style={styles.sub_header_question}>
              Please select your budget type.
            </Text>
            <TouchableOpacity
              style={styles.raddio_button_main_view}
              onPress={() => setCostEstimate("Flat")}
            >
              <TouchableOpacity
                style={[
                  styles.radioView,
                  costEstimate === "Flat"
                    ? {
                        borderColor: Color.BUTTON_LIGHTBLUE,
                      }
                    : { borderColor: Color.LIGHT_GREY },
                ]}
                onPress={() => setCostEstimate("Flat")}
              >
                <View
                  style={[
                    styles.radioinnerView,
                    costEstimate === "Flat"
                      ? {
                          backgroundColor: Color.BUTTON_LIGHTBLUE,
                        }
                      : {
                          backgroundColor: Color.LIGHT_GREY,
                        },
                  ]}
                ></View>
              </TouchableOpacity>
              <Text style={styles.radio_button_text}>Flat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.raddio_button_main_view}
              onPress={() => setCostEstimate("Hourly")}
            >
              <TouchableOpacity
                style={[
                  styles.radioView,
                  costEstimate === "Hourly"
                    ? {
                        borderColor: Color.BUTTON_LIGHTBLUE,
                      }
                    : { borderColor: Color.LIGHT_GREY },
                ]}
                onPress={() => setCostEstimate("Hourly")}
              >
                <View
                  style={[
                    styles.radioinnerView,
                    costEstimate === "Hourly"
                      ? {
                          backgroundColor: Color.BUTTON_LIGHTBLUE,
                        }
                      : {
                          backgroundColor: Color.LIGHT_GREY,
                        },
                  ]}
                ></View>
              </TouchableOpacity>
              <Text style={styles.radio_button_text}>Hourly</Text>
            </TouchableOpacity>
            <Text style={[styles.sub_header, { marginTop: scale(5) }]}>
              Budget
            </Text>
            <TextInput
              placeholderTextColor={Color.Grey}
              placeholder="Enter budget..."
              style={styles.textInpute}
              onChangeText={(text) => setBudget(text)}
              value={budget}
              keyboardType={"numeric"}
            />
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.collaps_button}
          onPress={() => setOpenJobDetails(!openJobDetails)}
          disabled={
            props.route.params.type !== "get-quoted-leads" ? false : true
          }
        >
          <Text style={styles.collaps_button_text}>Job Details</Text>
          {props.route.params.type !== "get-quoted-leads" ? (
            <Image
              source={Images.Down}
              style={[
                styles.collaps_button_image,
                {
                  transform: openJobDetails
                    ? [{ rotate: "180deg" }]
                    : [{ rotate: "0deg" }],
                },
              ]}
            />
          ) : null}
        </TouchableOpacity>
        {openJobDetails ? (
          <>
            <Text style={styles.job_header_text}>
              {props.route.params.data !== undefined
                ? props.route.params.data.questionAnswers[0].answer_radio
                : null}
            </Text>
            <FlatList
              data={props.route.params.data.questionAnswers}
              renderItem={({ item, index }) => {
                if (index !== 0) {
                  return (
                    <View style={{ flex: 1 }}>
                      {item._id !== undefined ? (
                        item.pushedQuestion !== undefined ? (
                          <>
                            <View style={styles.job_details_flatlist_View}>
                              <Image
                                source={Images.Dote}
                                style={styles.doteImage}
                              />
                              <Text style={styles.title_text}>
                                {item.pushedQuestion}
                              </Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                              <Text
                                style={[
                                  styles.answer_text,
                                  { color: Color.Grey, marginLeft: scale(45) },
                                ]}
                              >
                                {item.questionType === "textarea"
                                  ? item.answer_textarea !== undefined
                                    ? item.answer_textarea
                                    : null
                                  : item.questionType === "input"
                                  ? item.answer_input !== undefined
                                    ? item.answer_input
                                    : null
                                  : item.questionType === "radio"
                                  ? item.answer_radio !== undefined
                                    ? item.answer_radio
                                    : null
                                  : null}
                              </Text>
                              {item.questionType === "radio" ? (
                                item.answer_radio_other !== undefined ? (
                                  <Text
                                    style={[
                                      styles.answer_text,
                                      {
                                        color: Color.BLUE_DRESS,
                                      },
                                    ]}
                                  >
                                    {item.answer_radio_other}
                                  </Text>
                                ) : null
                              ) : null}
                            </View>
                            {index ===
                            props.route.params.data.questionAnswers.length -
                              1 ? (
                              <View
                                style={{
                                  height: 200,

                                  backgroundColor: "red",
                                  margin: scale(10),
                                }}
                              >
                                <MapView
                                  zoomEnabled={true}
                                  showsUserLocation={true}
                                  zoomTapEnabled
                                  // provider={PROVIDER_GOOGLE}
                                  initialRegion={{
                                    latitude: 37.78825,
                                    longitude: -122.4324,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                  }}
                                  style={{
                                    flex: 1,
                                  }}
                                >
                                  <Marker
                                    coordinate={{
                                      latitude: 37.78825,
                                      longitude: -122.4324,
                                    }}
                                  >
                                    <View>
                                      <Image
                                        source={Images.Location}
                                        style={{
                                          width: scale(20),
                                          height: scale(20),
                                          tintColor: Color.RED,
                                        }}
                                      />
                                    </View>
                                  </Marker>
                                </MapView>
                              </View>
                            ) : null}
                          </>
                        ) : null
                      ) : null}
                    </View>
                  );
                } else {
                  return (
                    <>
                      <View style={styles.job_details_flatlist_View}>
                        <Image source={Images.Dote} style={styles.doteImage} />
                        <Text style={styles.title_text}>Status</Text>
                      </View>
                      <Text
                        style={[
                          styles.answer_text,
                          { color: Color.Grey, marginLeft: scale(45) },
                        ]}
                      >
                        {props.route.params.data.status}
                      </Text>
                      <View style={styles.job_details_flatlist_View}>
                        <Image source={Images.Dote} style={styles.doteImage} />
                        <Text style={styles.title_text}>Location :</Text>
                      </View>
                      <Text
                        style={[
                          styles.answer_text,
                          { color: Color.BLUE_DRESS, marginLeft: scale(45) },
                        ]}
                        onPress={() => {}}
                      >
                        2850,Aarons Pass,New South Wales
                      </Text>
                    </>
                  );
                }
              }}
            />
          </>
        ) : null}
        <TouchableOpacity
          style={[styles.collaps_button, { marginBottom: scale(10) }]}
          onPress={() => setUserDetails(!userDetails)}
          disabled={
            props.route.params.type !== "get-quoted-leads" ? false : true
          }
        >
          <Text style={styles.collaps_button_text}>User Details</Text>
          {props.route.params.type !== "get-quoted-leads" ? (
            <Image
              source={Images.Down}
              style={[
                styles.collaps_button_image,
                {
                  transform: userDetails
                    ? [{ rotate: "180deg" }]
                    : [{ rotate: "0deg" }],
                },
              ]}
            />
          ) : null}
        </TouchableOpacity>
        {userDetails ? (
          <View style={{ marginBottom: scale(20) }}>
            <View style={{ flexDirection: "row", marginLeft: scale(15) }}>
              {props.route.params.data.user.imageUrl !== null ? (
                <Image
                  source={{ uri: props.route.params.data.user.imageUrl }}
                  style={styles.user_profile_image}
                />
              ) : (
                <Image
                  source={Images.Profile}
                  style={styles.user_profile_image}
                />
              )}

              <View style={{ alignSelf: "center", marginLeft: scale(5) }}>
                <View style={styles.details_view}>
                  <Image source={Images.Phone} style={styles.phone_image} />
                  <Text style={{ fontSize: 14, color: Color.COLOR_BLACK }}>
                    {" "}
                    :{" "}
                    {props.route.params.type === "get-quoted-leads"
                      ? props.route.params.data.user.phone !== null &&
                        props.route.params.data.user.phone !== ""
                        ? props.route.params.data.user.phone.slice(0, 8) +
                          "xxxxxx"
                        : "empty phone number"
                      : null}
                  </Text>
                  {/* <View style={styles.verifried_view}>
                    <Text style={{ color: Color.RED }}>Not verified</Text>
                  </View> */}
                </View>
                <View style={styles.details_view}>
                  <Image source={Images.Email} style={styles.phone_image} />
                  <Text style={{ fontSize: 14, color: Color.COLOR_BLACK }}>
                    {" "}
                    :{" "}
                    {props.route.params.type === "get-quoted-leads"
                      ? props.route.params.data.user.email
                      : props.route.params.data.user.email.slice(0, 4) +
                        "xxx@xxx.com"}
                    {/* hirexxxxx@xxxxx.com */}
                  </Text>
                  {/* <View style={styles.verifried_view}>
                    <Text style={{ color: Color.RED }}>Not verified</Text>
                  </View> */}
                </View>
              </View>
            </View>

            <View style={styles.job_details_flatlist_View}>
              <Image source={Images.Dote} style={styles.doteImage} />
              <Text style={styles.title_text}>Address :</Text>
            </View>
            <Text
              style={[
                styles.answer_text,
                { color: Color.BLUE_DRESS, marginLeft: 45 },
              ]}
              onPress={() => {}}
            >
              {props.route.params.data.questionAnswers[1].answer_radio}
              {/* 2850,Aarons Pass,New South Wales */}
            </Text>
            <View style={styles.job_details_flatlist_View}>
              <Image source={Images.Dote} style={styles.doteImage} />
              <Text style={styles.title_text}>Posted :</Text>
            </View>
            <Text
              style={[
                styles.answer_text,
                { color: Color.Grey, marginLeft: 45 },
              ]}
            >
              {Moment.utc(props.route.params.data.createdAt)
                .local()
                .startOf("seconds")
                .fromNow()}
            </Text>
            <View style={styles.job_details_flatlist_View}>
              <Image source={Images.Dote} style={styles.doteImage} />
              <Text style={styles.title_text}>Category :</Text>
            </View>
            <Text
              style={[
                styles.answer_text,
                { color: Color.Grey, marginLeft: 45 },
              ]}
            >
              {props.route.params.data.questionAnswers[0].answer_radio}
              {/* Antenna */}
            </Text>
          </View>
        ) : null}
        {props.route.params.type !== "get-quoted-leads" ? (
          <View style={{ paddingHorizontal: scale(15) }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.FlatlistView}>
                <TouchableOpacity
                  onPress={() => setOpenComment(!openComment)}
                  style={[
                    styles.CheckBoxView,
                    {
                      backgroundColor: openComment
                        ? Color.BLUE_DRESS
                        : Color.BACKGROUND_WHITE,
                      borderColor: openComment
                        ? Color.BLUE_DRESS
                        : Color.BorderColor,
                    },
                  ]}
                >
                  {openComment ? (
                    <Image source={Images.Check} style={styles.CheckImage} />
                  ) : null}
                </TouchableOpacity>
                <Text
                  style={[
                    styles.sub_header,
                    { padding: scale(2), marginTop: 10 },
                  ]}
                >
                  Comments
                </Text>
              </View>
            </View>
            <Text
              style={[
                styles.sub_header_question,
                { paddingHorizontal: scale(2) },
              ]}
            >
              Customers appreciate information specific to their job
            </Text>
            {openComment ? (
              <TextInput
                placeholderTextColor={Color.Grey}
                placeholder="Enter comment..."
                multiline
                style={[
                  styles.textInpute,
                  { marginTop: scale(10), height: scale(50) },
                ]}
                onChangeText={(text) => setComment(text)}
                value={comment}
              />
            ) : null}
            <Text
              style={[
                styles.sub_header,
                { marginTop: scale(5), marginLeft: scale(5) },
              ]}
            >
              Cost:{" "}
              <Text
                style={[
                  styles.sub_header_question,
                  { color: Color.BUTTON_LIGHTBLUE },
                ]}
              >
                {props.route.params.data.credits} credits
              </Text>
            </Text>

            <View
              style={{
                flexDirection: "row",
                padding: scale(10),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={[
                  styles.touchabale_button,
                  {
                    borderColor: Color.Grey,
                  },
                ]}
                onPress={() => save_as_draft()}
              >
                <Text style={{ color: Color.COLOR_BLACK, fontWeight: "600" }}>
                  {props.route.params.data.isDraft !== true
                    ? "Save As Draft"
                    : "Remove Draft"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.touchabale_button,
                  {
                    borderColor: Color.BUTTON_LIGHTBLUE,
                    backgroundColor: Color.BUTTON_LIGHTBLUE,
                  },
                ]}
                onPress={() => {
                  if (
                    profileDetails.credits <= props.route.params.data.credits
                  ) {
                    Linking.openURL("https://tradingseek.net/plans");
                  } else {
                    call_quoted_nowApi();
                  }
                }}
              >
                <Text
                  style={{ color: Color.BACKGROUND_WHITE, fontWeight: "600" }}
                >
                  {/* {} */}
                  Quote Now
                  {/* Pay and Send */}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </ScrollView>
      <Loader val={loaderResponse.loader} />
    </View>
  );
};
export default LeadDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.BACKGROUND_WHITE,
    flex: 1,
  },
  // header Text
  job_header_text: {
    fontSize: 16,
    fontWeight: "600",
    color: Color.COLOR_BLACK,
    paddingHorizontal: scale(15),
    paddingTop: scale(17),
    paddingBottom: scale(7),
    color: Color.COLOR_BLACK,
  },
  title_text: {
    paddingVertical: scale(3),
    fontSize: 16,
    color: Color.COLOR_BLACK,
  },
  answer_text: {
    fontSize: 14,
    paddingHorizontal: 8,
  },
  job_details_flatlist_View: {
    paddingHorizontal: 25,
    marginTop: 3,
    borderBottomColor: Color.BorderColor,

    flexDirection: "row",
  },
  doteImage: {
    width: 10,
    height: 10,
    alignSelf: "center",
    marginHorizontal: scale(5),
    tintColor: Color.BUTTON_LIGHTBLUE,
  },

  // collaps_button
  collaps_button: {
    padding: scale(7),
    paddingHorizontal: scale(20),
    backgroundColor: Color.BACKGROUND_WHITE,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.8,
    borderBottomColor: Color.BorderColor,
  },
  collaps_button_text: {
    color: Color.COLOR_BLACK,
    fontWeight: "500",
    fontSize: 16,
  },
  collaps_button_image: {
    width: 24,
    height: 24,
    tintColor: Color.COLOR_BLACK,
  },

  // raddio button
  raddio_button_main_view: {
    flexDirection: "row",
    paddingHorizontal: scale(15),
    marginTop: scale(5),
  },
  radioView: {
    borderWidth: 1,
    height: 15,
    width: 15,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
  radioinnerView: {
    backgroundColor: Color.BUTTON_LIGHTBLUE,
    height: 10,
    width: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignSelf: "center",
  },
  radio_button_text: {
    marginLeft: scale(5),
    fontSize: 16,
    color: Color.COLOR_BLACK,
  },

  /// new quote
  newQuote_header: {
    fontSize: 16,
    fontWeight: "600",
    color: Color.BUTTON_LIGHTBLUE,
  },
  newQuote_description: {
    padding: scale(7),
    color: Color.Grey,
  },
  sub_header: {
    padding: scale(7),
    fontSize: 14,
    color: Color.COLOR_BLACK,
  },
  sub_header_question: {
    marginLeft: scale(15),
    color: Color.Grey,
  },

  // check box view
  FlatlistView: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(12),
    flexDirection: "row",
    alignItems: "center",
  },
  CheckBoxView: {
    width: 20,
    height: 20,
    borderWidth: 1,
    marginRight: scale(10),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    marginTop: 10,
  },
  CheckImage: {
    width: 15,
    height: 15,
    tintColor: Color.BACKGROUND_WHITE,
  },
  textInpute: {
    borderWidth: 1,
    marginHorizontal: scale(15),
    padding: scale(10),
    // paddingHorizontal: scale(10),
    borderRadius: scale(5),
    borderColor: Color.BorderColor,
    color: Color.COLOR_BLACK,
  },
  touchabale_button: {
    flex: 1,
    paddingHorizontal: scale(7),
    padding: scale(5),
    borderWidth: 1,
    borderRadius: scale(5),
    alignItems: "center",
    marginHorizontal: scale(5),
  },

  //user details
  user_profile_image: {
    width: 80,
    height: 80,
    alignSelf: "center",
  },
  details_view: {
    flexDirection: "row",
    // alignSelf: "center",
    // justifyContent: "center",
    marginVertical: scale(3),
  },
  phone_image: {
    width: 20,
    height: 20,
  },
  verifried_view: {
    borderWidth: 1,
    borderRadius: scale(5),
    padding: scale(2),
    paddingHorizontal: scale(5),
    marginHorizontal: scale(5),
    borderColor: Color.RED,
  },
  address_text: {
    color: Color.COLOR_BLACK,
    alignSelf: "center",
    textAlign: "center",
    marginTop: scale(3),
    marginHorizontal: scale(25),
  },
  category_text: {
    color: Color.BLUE_DRESS,
    alignSelf: "center",
    textAlign: "center",
    marginTop: scale(3),
  },
});
