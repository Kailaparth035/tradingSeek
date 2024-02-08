import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ScrollView,
  Modal,
  Dimensions,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Linking,
} from "react-native";

import Header from "../../component/Header";
import Color from "../../theme/Color";
import { scale } from "../../theme/Scalling";
import CloseStatusComp from "../../component/CloseStatus";
import { closeJobReason, FilterStatusData } from "../../theme/Array";
import { useSelector, useDispatch } from "react-redux";
import ReduxActions from "../../helper/ReduxActions";
import Loader from "../../component/Loader";
import { Image } from "react-native";
import Images from "../../theme/Images";
import UpdateStatusCom from "../../component/UpdateStatus";
import { color } from "react-native-reanimated";

const JobDetails = (props) => {
  const dispatch = useDispatch();
  // console.log("props ::", JSON.stringify(props.route.params.data));
  const loaderResponse = useSelector((state) => state.loader);
  const updateStatusResponse = useSelector((state) => state.UpdateStatus);
  const updateDescriptionResponse = useSelector(
    (state) => state.UpdateDescription
  );

  const [jobStatusModal, setJobStatusModal] = useState(false);
  const [propsData, setPropsData] = useState(props.route.params.data);
  const [somethingReason, setSomethingReason] = useState("");
  const [selectReason, setSelectReason] = useState("");
  const [somethingSelected, setSomethingSelected] = useState(false);
  const [scrollTextInput, setScrollTextInput] = useState(false);
  const [editDescriptyionModal, setEditDescriptyionModal] = useState(false);
  const [editDescription, setEditDescription] = useState(null);
  const [updateStatus, setUpdateStatus] = useState("");
  const [callModal, setCallModal] = useState(false);
  const [quoteItem, setQuoteItem] = useState(null);

  const job_status = (status) => {
    // console.log("status ::", status);
    if (status === "close job") {
      setJobStatusModal(true);
    } else if (status === "Reopen job") {
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.UpdateStatusRequest(propsData._id, "PENDING", ""));
    }
  };

  const setReasoncall = (val) => {
    // console.log("Value =======>", val);
    if (val !== "Something else") {
      setSelectReason(val);
      setSomethingSelected(false);
    } else {
      setSomethingSelected(true);
      setSelectReason(val);
    }
  };

  const updateStatusApicall = (res) => {
    if (res !== "reason") {
      dispatch(ReduxActions.loaderAction(true));
      dispatch(
        ReduxActions.UpdateStatusRequest(propsData._id, updateStatus, "")
      );
    } else {
      dispatch(ReduxActions.loaderAction(true));
      dispatch(
        ReduxActions.UpdateStatusRequest(propsData._id, "CLOSED", selectReason)
      );
    }
    // setSelectReason("");
    // dispatch(ReduxActions.GetUserJobResponse(null));
  };

  const UpdateDescriptionRequet = () => {
    let tempDescription = propsData;
    // console.log("tempDescription ===>", tempDescription);

    tempDescription.questionAnswers.map((desItem, desIndex) => {
      if (desItem.questionType === "textarea") {
        if (desItem.answer_textarea !== undefined) {
          // console.log("Edit =======>", desItem.questionType.answer_textarea);
          desItem.answer_textarea = editDescription;
        } else {
          tempDescription[desIndex] = {
            ...desItem,
            answer_textarea: editDescription,
          };
        }
        // console.log("temp data Update Job description :::", desItem);
      } else if (desItem.questionType === "input") {
        if (desItem.answer_input !== undefined) {
          // console.log("Edit =======>", desItem.questionType.answer_textarea);
          desItem.answer_input = editDescription;
        } else {
          tempDescription[desIndex] = {
            ...desItem,
            answer_input: editDescription,
          };
        }
      }
      // console.log("Update Data ========>", JSON.stringify(tempDescription));

      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.UpdateDescriptionRequet(tempDescription));
    });
  };

  useEffect(() => {
    if (updateDescriptionResponse.data !== null) {
      if (
        updateDescriptionResponse.data.message ===
        "description updated successfully"
      ) {
        setEditDescriptyionModal(false);
      }
    }
  }, [updateDescriptionResponse.data]);

  useEffect(() => {
    if (updateStatusResponse.data !== null) {
      if (updateStatusResponse.data === "Status Updated Successfully") {
        setJobStatusModal(false);
        // setUpdateStatusModal(false);
        props.navigation.goBack();
      }
    }
  }, [updateStatusResponse.data]);

  const openViewResponse = (quoteditem) => {
    console.log("quoteditem :::", quoteditem);
    let ViewResponse = "MyjobScreen";
    dispatch(ReduxActions.loaderAction(true));
    // console.log("profile Details ::", propsData);
    dispatch(
      ReduxActions.ConversationRequest(
        30,
        ViewResponse,
        props.navigation,
        quoteditem
      )
    );
  };

  // calling function
  const callingFunction = (key, item) => {
    if (key === "phone") {
      Linking.openURL(`tel:${quoteItem.mobile}`)
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
      Linking.openURL(`mailto:${item.email}`);
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
        header_title="Job Details"
        goBack={() => props.navigation.goBack()}
      />
      <ScrollView>
        <View>
          <Text style={styles.job_header_text}>
            {propsData !== undefined
              ? propsData.questionAnswers[0].answer_radio
              : null}
          </Text>

          {propsData !== undefined ? (
            propsData.questionAnswers.length !== 0 ? (
              <FlatList
                data={propsData.questionAnswers}
                scrollEnabled={true}
                renderItem={({ item, index }) => {
                  return (
                    <>
                      {index !== 0 ? (
                        index !== propsData.questionAnswers.length - 1 ? (
                          item.pushedQuestion === "Description" ? (
                            <>
                              <View
                                style={[
                                  styles.job_details_flatlist_View,
                                  { justifyContent: "space-between" },
                                ]}
                              >
                                <View style={{ flexDirection: "row" }}>
                                  <Image
                                    source={Images.Dote}
                                    style={styles.doteImage}
                                  />
                                  <Text style={styles.title_text}>
                                    {item.pushedQuestion}
                                  </Text>
                                </View>
                                <Text
                                  style={styles.editabaleButton_text}
                                  onPress={() => {
                                    setEditDescriptyionModal(true),
                                      item.questionType === "textarea"
                                        ? item.answer_textarea !== undefined
                                          ? setEditDescription(
                                              item.answer_textarea
                                            )
                                          : null
                                        : item.questionType === "input"
                                        ? item.answer_input !== undefined
                                          ? setEditDescription(
                                              item.answer_input
                                            )
                                          : null
                                        : null;
                                  }}
                                >
                                  Edit
                                </Text>
                              </View>
                              <Text
                                style={[
                                  styles.answer_text,
                                  { color: Color.Grey },
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
                                  : null}{" "}
                              </Text>
                            </>
                          ) : (
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
                              <Text
                                style={[
                                  styles.answer_text,
                                  { color: Color.Grey },
                                ]}
                              >
                                {item.questionType === "range"
                                  ? item.answer_range
                                  : item.questionType === "radio"
                                  ? item.answer_radio
                                  : null}
                                {"  "}
                                {item.answer_radio_other !== undefined ? (
                                  <Text
                                    style={[
                                      styles.detailsResponseText,
                                      {
                                        marginHorizontal: scale(5),
                                        color: Color.BUTTON_LIGHTBLUE,
                                      },
                                    ]}
                                  >
                                    {item.answer_radio === "Specific date"
                                      ? item.answer_radio_other !== undefined
                                        ? "(" + item.answer_radio_other + ")"
                                        : null
                                      : item.answer_radio_other}
                                  </Text>
                                ) : null}
                              </Text>
                            </>
                          )
                        ) : (
                          <View style={styles.quoteduser_view}>
                            <Text
                              style={[
                                styles.another_field_button,
                                {
                                  color: Color.COLOR_BLACK,
                                },
                              ]}
                            >
                              Quoted Users
                            </Text>
                          </View>
                        )
                      ) : (
                        <>
                          <View
                            style={[
                              styles.job_details_flatlist_View,
                              { justifyContent: "space-between" },
                            ]}
                          >
                            <View style={{ flexDirection: "row" }}>
                              <Image
                                source={Images.Dote}
                                style={styles.doteImage}
                              />
                              <Text style={styles.title_text}>Status</Text>
                            </View>
                            <Text
                              style={styles.editabaleButton_text}
                              onPress={() =>
                                job_status(
                                  propsData.status !== "CLOSED"
                                    ? "close job"
                                    : "Reopen job"
                                )
                              }
                            >
                              {propsData !== undefined
                                ? propsData.status !== "CLOSED"
                                  ? "Update"
                                  : "Re-open"
                                : null}
                            </Text>
                          </View>
                          <Text
                            style={[styles.answer_text, { color: Color.Grey }]}
                          >
                            {propsData.status}
                          </Text>
                        </>
                      )}
                    </>
                  );
                }}
              />
            ) : null
          ) : null}
        </View>

        {propsData.quotedUsers.length !== 0 ? (
          <FlatList
            data={propsData.quotedUsers}
            scrollEnabled={true}
            renderItem={(quoteditem) => {
              return (
                <TouchableOpacity
                  style={styles.qutedUserView}
                  onPress={() => openViewResponse(quoteditem.item)}
                >
                  <View
                    style={{
                      flex: 0.28,
                    }}
                  >
                    {quoteditem.item.imageUrl !== null ? (
                      <Image
                        source={{ uri: quoteditem.item.imageUrl }}
                        style={[
                          styles.profileImagestyle,
                          { borderRadius: scale(40) },
                        ]}
                      />
                    ) : (
                      <Image
                        source={Images.Profile}
                        style={styles.profileImagestyle}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      flex: 1,
                      paddingHorizontal: scale(3),
                    }}
                  >
                    <Text style={styles.quoteduser_name}>
                      {quoteditem.item.userName !== null
                        ? quoteditem.item.userName
                        : null}
                    </Text>
                    <View style={styles.quoteduser_mail}>
                      <Text style={styles.qutedDetailsNumber}>
                        {quoteditem.item.mobile !== null
                          ? quoteditem.item.mobile
                          : null}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setCallModal(true), setQuoteItem(quoteditem.item);
                        }}
                      >
                        <Image
                          source={Images.Phone}
                          style={styles.quoteduser_image}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.quoteduser_mail}>
                      <Text style={styles.qutedDetailsNumber}>
                        {quoteditem.item.email !== null
                          ? quoteditem.item.email
                          : null}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          callingFunction("email", quoteditem);
                        }}
                      >
                        <Image
                          source={Images.Mail}
                          style={styles.quoteduser_image}
                        />
                      </TouchableOpacity>
                    </View>
                    {/* <TouchableOpacity
                    style={[
                      styles.postAjobButton,
                      {
                        width: "100%",
                        backgroundColor: Color.BUTTON_LIGHTBLUE,
                      },
                    ]}
                    onPress={() => openViewResponse(quoteditem.item)}
                  >
                    <Text style={styles.viewResponseText}>View Response</Text>
                  </TouchableOpacity> */}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <Text
            style={{
              color: Color.Grey,
              fontSize: 14,
              textAlign: "left",
              marginLeft: scale(45),
            }}
          >
            No quotes yet{" "}
          </Text>
        )}
      </ScrollView>

      {jobStatusModal ? (
        <>
          <CloseStatusComp
            headerText="Update job status"
            buttonText="Submit"
            labelField="status"
            valueField="status"
            InstructionText="Please select a Status"
            data={closeJobReason}
            selectedValue={selectReason}
            selectValue={(val) => setReasoncall(val)}
            closeModal={() => {
              setJobStatusModal(false),
                setSelectReason(""),
                setSomethingReason(""),
                setSomethingSelected(false);
            }}
            functionCall={() => updateStatusApicall("reason")}
            somethingselect={somethingSelected}
            something={somethingReason}
            somethingOnchange={(val) => setSomethingReason(val)}
            loaderResponse={loaderResponse.loader}
            ScrollScreen={() => setScrollTextInput(true)}
            ScrollScreen1={() => setScrollTextInput(false)}
            scrollValue={scrollTextInput}
          />
        </>
      ) : null}
      {/* <Modal> */}
      <Modal
        visible={editDescriptyionModal}
        transparent={true}
        animationType="slide"
      >
        <Image source={Images.Black} style={styles.modalBackground} />
        <View style={styles.descriptionModal_view}>
          <View style={styles.editDescription_modal_header}>
            <Text style={styles.descriptionModal_header}>Edit Description</Text>
            <TouchableOpacity onPress={() => setEditDescriptyionModal(false)}>
              <Image
                style={{
                  height: 28,
                  width: 28,
                  tintColor: Color.BACKGROUND_WHITE,
                  alignSelf: "center",
                }}
                source={Images.ViewClose}
              />
            </TouchableOpacity>
          </View>
          <TextInput
            value={editDescription}
            onChangeText={(val) => setEditDescription(val)}
            multiline={true}
            style={styles.description_textInpute}
            placeholder={"edit description"}
          />
          <View style={styles.button_view}>
            <TouchableOpacity
              style={[
                styles.button_edit,
                {
                  backgroundColor: Color.BUTTON_LIGHTBLUE,
                },
              ]}
              onPress={() => UpdateDescriptionRequet()}
            >
              <Text
                style={[styles.button_text, { color: Color.BACKGROUND_WHITE }]}
              >
                Submit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button_edit,
                {
                  backgroundColor: Color.LIGHT_GREY,
                },
              ]}
              onPress={() => setEditDescriptyionModal(false)}
            >
              <Text style={[styles.button_text, { color: Color.COLOR_BLACK }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
            <Text style={styles.button_text}>
              call {quoteItem !== null ? quoteItem.mobile : null}{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setCallModal(false)}
          >
            <Text style={styles.button_text}>cancel</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
      <Loader val={loaderResponse.loader} />
    </View>
  );
};
export default JobDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.BACKGROUND_WHITE,
    flex: 1,
  },
  job_header_text: {
    fontSize: 16,
    fontWeight: "600",
    color: Color.COLOR_BLACK,
    paddingHorizontal: scale(15),
    paddingVertical: scale(15),
  },
  another_field_button: {
    fontSize: 15,
    fontWeight: "700",
  },
  modalBackground: {
    position: "absolute",
    height: "100%",
    width: "100%",
    opacity: 0.8,
  },
  descriptionModal_view: {
    backgroundColor: Color.BACKGROUND_WHITE,
    marginTop: Dimensions.get("window").height / 4,
    marginHorizontal: scale(15),
    borderRadius: scale(5),
  },
  descriptionModal_header: {
    fontSize: 15,
    fontWeight: "600",
    color: Color.BACKGROUND_WHITE,
    borderTopRightRadius: scale(5),
    borderTopLeftRadius: scale(5),
    alignSelf: "center",
  },
  description_textInpute: {
    padding: scale(5),
    borderBottomColor: Color.Grey,
    borderBottomWidth: 0.5,
    margin: scale(15),
    color: Color.COLOR_BLACK,
  },
  button_view: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: scale(15),
  },
  button_edit: {
    flex: 1,

    alignItems: "center",
    marginHorizontal: scale(5),
    borderRadius: scale(5),
  },
  button_text: {
    fontSize: 14,
    fontWeight: "600",
  },

  //new ui
  job_details_flatlist_View: {
    paddingHorizontal: scale(25),
    borderBottomColor: Color.BorderColor,
    flexDirection: "row",
    flex: 1,
    marginTop: scale(2),
  },
  doteImage: {
    width: 10,
    height: 10,
    alignSelf: "center",
    marginHorizontal: scale(5),
    tintColor: Color.BUTTON_LIGHTBLUE,
  },
  title_text: {
    alignSelf: "center",
    fontSize: 16,
    color: Color.COLOR_BLACK,
  },
  answer_text: {
    paddingBottom: scale(5),
    fontSize: 14,
    paddingLeft: scale(8),
    marginLeft: scale(45),
    marginRight: scale(10),
    marginTop: scale(3),
  },
  editabaleButton_text: {
    color: Color.BUTTON_LIGHTBLUE,
    fontWeight: "600",
    fontSize: 16,
  },

  // Qouted Users

  qutedUserView: {
    alignItems: "center",
    paddingHorizontal: scale(12),
    paddingVertical: scale(7),
    elevation: 10,
    backgroundColor: Color.BACKGROUND_WHITE,
    flexDirection: "row",
    borderWidth: 0.4,
    borderColor: Color.BorderColor,
  },
  profileImagestyle: {
    height: scale(35),
    width: scale(35),
  },
  qutedDetailsNumber: {
    color: Color.COLOR_BLACK,
    // marginHorizontal: scale(5),
    alignSelf: "center",
  },
  postAjobButton: {
    alignSelf: "center",
    padding: scale(5),
    borderRadius: scale(5),
  },
  viewResponseText: {
    color: Color.BACKGROUND_WHITE,
    textAlign: "center",
  },
  quoteduser_name: {
    color: Color.COLOR_BLACK,
    fontWeight: "600",
    fontSize: 16,
  },
  quoteduser_image: {
    width: scale(18),
    height: scale(18),
    tintColor: Color.BUTTON_LIGHTBLUE,
  },
  quoteduser_view: {
    paddingHorizontal: scale(15),
    paddingVertical: scale(10),
    justifyContent: "space-between",
  },
  quoteduser_mail: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  //call modal
  callModal_container: {
    marginTop: Dimensions.get("window").height / 1.25,
    marginHorizontal: scale(10),
  },
  button: {
    backgroundColor: Color.BACKGROUND_WHITE,
    borderRadius: scale(5),
    alignItems: "center",
    marginTop: scale(4),
  },
  button_text: {
    padding: scale(10),
    color: Color.COLOR_BLACK,
    fontSize: 14,
  },
  editDescription_modal_header: {
    flexDirection: "row",
    backgroundColor: Color.BUTTON_LIGHTBLUE,
    justifyContent: "space-between",
    backgroundColor: Color.BUTTON_LIGHTBLUE,
    paddingHorizontal: scale(10),
    paddingVertical: scale(7),
    borderTopLeftRadius: scale(5),
    borderTopRightRadius: scale(5),
  },
});
