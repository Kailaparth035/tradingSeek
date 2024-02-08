import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  StatusBar,
  Modal,
  Dimensions,
  TextInput,
} from "react-native";

// Constant
import Header from "../../component/Header";
import Images from "../../theme/Images";
import { scale } from "../../theme/Scalling";
import AsyncStorage from "../../helper/AsyncStorage";

// Component

import DeletPopupCom from "../../component/DeletPopUpCom";
import Loader from "../../component/Loader";
import LogoutModalComp from "../../component/DeletPopUpCom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import ReduxActions from "../../helper/ReduxActions";
import Color from "../../theme/Color";
import SimpleHeader from "../../component/SimpleHeader";
import DocumentPicker from "react-native-document-picker";

const Help = (props) => {
  // ---------- dispatch and useSelectors ---------- //
  const dispatch = useDispatch();
  const loaderResponse = useSelector((state) => state.loader);
  const AskQuestionResponse = useSelector((state) => state.AskQuestion);

  // ---------- state ---------- //

  const [profileDetails, setProfileDetails] = useState({});
  const [userType, setUserType] = useState();
  const [openQuestionModal, setOpenQuestionModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [helpRequest, setHelpRequest] = useState("");
  const [attachmentDoc, setAttachmentDoc] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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

  // console.log("props ::::", props.route.params.key);

  const select_Attachment_File = async () => {
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      // console.log("size:::", file[0].size / 1000000);
      let size = file[0].size / 1000000;
      if (parseFloat(size) < 10) {
        let newFile = {
          uri: file[0].uri,
          name: file[0].name,
          type: file[0].type,
        };
        // console.log("file :::", JSON.stringify(file));
        // console.log("newFile :::", JSON.stringify(newFile));
        setAttachmentDoc(newFile);
      } else {
        dispatch(
          ReduxActions.ToastDisplay({
            type: "negative",
            title: "Maximum file size of 10MB is allowed.",
          })
        );
        setAttachmentDoc(null);
      }
    } catch (e) {
      // console.log("e::", e);
    }
  };

  const ask_question_Apicall = () => {
    if (userName === "") {
      setErrorMessage("username");
    } else if (emailAddress === "") {
      setErrorMessage("email");
    } else if (helpRequest === "") {
      setErrorMessage("helprequest");
    } else {
      const formData = new FormData();
      formData.append(
        "attachments",
        attachmentDoc !== null ? attachmentDoc.uri : ""
      );
      formData.append("userEmail", emailAddress);
      formData.append("userName", userName);
      formData.append("userMessage", helpRequest);

      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.AskQuestionRequest(formData));
    }
  };

  useEffect(() => {
    if (AskQuestionResponse.data !== null) {
      dispatch(ReduxActions.AskQuestionRespons(null));
      setTimeout(() => {
        setOpenQuestionModal(false);
      }, 1000);

      setUserName(""), setEmailAddress(""), setHelpRequest("");
      setAttachmentDoc(null);
    }
  }, [AskQuestionResponse.data]);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle="dark-content"
      />

      <SimpleHeader title={"Help"} rightbutton={false} />

      <ScrollView style={styles.container}>
        <View style={styles.headerLogoView}>
          <TouchableOpacity style={styles.logoButton}>
            <Text style={styles.logoText}>TradingSeek </Text>
          </TouchableOpacity>
          <Text style={styles.logoText}>|</Text>
          <TouchableOpacity style={styles.logoButton}>
            <Text style={styles.logoText}>Help Center</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            styles.register_button,
            { backgroundColor: Color.BUTTON_LIGHTBLUE, marginTop: 20 },
          ]}
          onPress={() => setOpenQuestionModal(true)}
        >
          <Text
            style={{ letterSpacing: scale(1), color: Color.BACKGROUND_WHITE }}
          >
            ASK QUESTION
          </Text>
        </TouchableOpacity>
        <Text
          style={[
            styles.content_text,
            { fontSize: 18, marginTop: 28, fontWeight: "500" },
          ]}
        >
          Welcome to the Help Center
        </Text>
        <Text style={[styles.content_text, { marginTop: scale(2) }]}>
          Browse through our topics or ask TradingSeek{" "}
        </Text>
        <Text style={[styles.content_text, { marginTop: scale(2) }]}>
          support a new question
        </Text>
        <View style={styles.populartopic_view}>
          <Text style={{ textAlign: "center", color: Color.COLOR_BLACK }}>
            popular topics for customer:
            <Text style={styles.description_text}>
              Requesting a service,Complaint Handling,Review Quotes,Determine if
              a busines is right for you
            </Text>
          </Text>
          <Text style={styles.viewAll_text}>View All</Text>
        </View>
        <Text
          style={[
            styles.content_text,
            {
              fontSize: 18,
              marginVertical: scale(15),
              fontWeight: "500",
            },
          ]}
        >
          How does TradingSeek Work ?
        </Text>
        <View style={styles.workflow_view}>
          <Image source={Images.Our_Service} style={styles.working_images} />
          <Text
            style={[
              styles.content_text,
              {
                fontSize: 18,
                marginVertical: scale(15),
              },
            ]}
          >
            Tell us what you need done
          </Text>
          <Text style={styles.work_description}>
            Answer a few simple question about your job to receive competitive
            quotes
          </Text>
          <Image source={Images.Compare_quotes} style={styles.working_images} />
          <Text
            style={[
              styles.content_text,
              {
                fontSize: 18,
                marginVertical: scale(15),
              },
            ]}
          >
            Compare your quotes
          </Text>
          <Text style={styles.work_description}>
            up to three experts will responds with a detailed quote and a link
            to their profile
          </Text>
          <Image source={Images.Hireperson} style={styles.working_images} />
          <Text
            style={[
              styles.content_text,
              {
                fontSize: 18,
                marginVertical: scale(15),
              },
            ]}
          >
            Higher the right expert
          </Text>
          <Text style={styles.work_description}>
            Compare quotes,profiles and read reviews to connect with the right
            expert Can't find the answer you need?
          </Text>
        </View>
        <Text
          style={[
            styles.content_text,
            {
              marginTop: scale(20),
              fontSize: 17,
              marginHorizontal: scale(40),
            },
          ]}
        >
          Can't find the answer you need? Our TradingSeek support Advisors are
          here to help
        </Text>
        <TouchableOpacity
          style={[
            styles.register_button,
            {
              marginTop: scale(25),
              borderWidth: 1,
              paddingHorizontal: scale(12),
              paddingVertical: scale(12),
              marginBottom: scale(10),
            },
          ]}
          onPress={() => setOpenQuestionModal(true)}
        >
          <Text style={{ letterSpacing: scale(1), color: Color.COLOR_BLACK }}>
            ASK A QUESTION
          </Text>
        </TouchableOpacity>

        <Loader val={loaderResponse.loader} />
      </ScrollView>

      <Modal
        visible={openQuestionModal}
        transparent={true}
        onRequestClose={() => {
          setOpenQuestionModal(false),
            setUserName(""),
            setEmailAddress(""),
            setHelpRequest("");
          setAttachmentDoc(null);
        }}
        animationType={"slide"}
      >
        <Image source={Images.Black} style={styles.blackImage} />
        <View style={styles.otpModalView}>
          <View style={styles.add_question_modal_view}>
            <Text style={styles.add_question_header}>Leave us a message</Text>
            <TouchableOpacity
              onPress={() => {
                setOpenQuestionModal(false),
                  setUserName(""),
                  setEmailAddress(""),
                  setHelpRequest("");
                setAttachmentDoc(null);
              }}
            >
              <Image source={Images.ViewClose} style={styles.closeImage} />
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="Your Name (Optional)"
            placeholderTextColor={Color.Grey}
            style={styles.question_textinpute}
            value={userName}
            onChangeText={(text) => {
              setUserName(text), setErrorMessage(null);
            }}
          />
          {errorMessage === "username" ? (
            <Text style={{ color: Color.RED, marginHorizontal: scale(20) }}>
              please enter username correct username
            </Text>
          ) : null}

          <TextInput
            placeholder="Email address"
            placeholderTextColor={Color.Grey}
            style={styles.question_textinpute}
            value={emailAddress}
            onChangeText={(text) => {
              setEmailAddress(text), setErrorMessage(null);
            }}
          />
          {errorMessage === "email" ? (
            <Text style={{ color: Color.RED, marginHorizontal: scale(20) }}>
              please enter username correct emailaddress
            </Text>
          ) : null}
          <TextInput
            placeholder="How can we help you?"
            placeholderTextColor={Color.Grey}
            multiline
            style={[styles.question_textinpute, { height: scale(50) }]}
            value={helpRequest}
            onChangeText={(text) => {
              {
                setHelpRequest(text), setErrorMessage(null);
              }
            }}
          />
          {errorMessage === "helprequest" ? (
            <Text style={{ color: Color.RED, marginHorizontal: scale(20) }}>
              please enter hepl request
            </Text>
          ) : null}
          <Text style={[styles.complain_fied_title, { marginTop: scale(20) }]}>
            Attachment
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: scale(20),
              marginTop: scale(5),
            }}
          >
            <TouchableOpacity
              style={styles.choose_button}
              onPress={() => select_Attachment_File()}
            >
              <Text style={styles.choose_button_text}>Choose file</Text>
            </TouchableOpacity>
            <Text style={styles.attachment_file_text}>
              {attachmentDoc !== null ? attachmentDoc.name : "No file chosen"}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.send_button}
            onPress={() => ask_question_Apicall()}
          >
            <Text style={styles.send_text}>Send</Text>
          </TouchableOpacity>
        </View>
        <Loader val={loaderResponse.loader} />
      </Modal>
    </View>
  );
};
export default Help;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_WHITE,
  },
  headerLogoView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "flex-start",
    marginTop: scale(10),
  },
  logoButton: {
    flex: 1,
    alignItems: "center",
  },
  logoText: {
    fontSize: 15,
    color: Color.COLOR_BLACK,
  },
  register_button: {
    alignSelf: "center",
    borderRadius: scale(3),
    paddingHorizontal: scale(7),
    padding: scale(5),
  },
  content_text: {
    textAlign: "center",
    color: Color.COLOR_BLACK,
  },

  populartopic_view: {
    backgroundColor: Color.LIGHT_GREY,
    alignSelf: "center",
    padding: scale(15),
    marginHorizontal: scale(5),
  },
  description_text: {
    color: Color.BLUE_DRESS,
    textAlign: "center",
  },
  viewAll_text: {
    color: Color.BLUE_DRESS,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  workflow_view: {
    backgroundColor: Color.LIGHT_GREY,
    marginHorizontal: scale(29),
    alignItems: "center",
  },
  working_images: {
    width: scale(290),
    height: scale(190),
  },
  work_description: {
    textAlign: "center",
    paddingBottom: scale(20),
    paddingHorizontal: scale(20),
    color: Color.COLOR_BLACK,
  },

  // question modal
  blackImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.7,
  },
  otpModalView: {
    marginTop: Dimensions.get("window").height / 4,
    backgroundColor: Color.BACKGROUND_WHITE,
    marginHorizontal: scale(20),
    padding: scale(0),
    borderRadius: 5,
  },
  closeImage: {
    width: scale(25),
    height: scale(25),
    tintColor: Color.BACKGROUND_WHITE,
  },
  add_question_header: {
    color: Color.BACKGROUND_WHITE,
    fontWeight: "600",
    fontSize: 14,
    alignSelf: "center",
  },
  add_question_modal_view: {
    backgroundColor: Color.BUTTON_LIGHTBLUE,
    flexDirection: "row",
    borderTopLeftRadius: scale(3),
    borderTopRightRadius: scale(3),
    padding: scale(10),
    justifyContent: "space-between",
  },
  question_textinpute: {
    borderWidth: 1,
    borderColor: Color.BorderColor,
    marginHorizontal: scale(15),
    marginTop: scale(15),
    padding: scale(10),
    borderRadius: scale(5),
    color: Color.COLOR_BLACK,
  },
  complain_fied_title: {
    color: Color.COLOR_BLACK,
    fontWeight: "500",
    marginHorizontal: scale(15),
    marginTop: scale(10),
    fontSize: 14,
  },
  send_button: {
    padding: scale(10),
    backgroundColor: Color.BUTTON_LIGHTBLUE,
    alignSelf: "flex-end",
    borderRadius: scale(5),
    marginHorizontal: scale(15),
    marginBottom: scale(10),
    paddingHorizontal: scale(15),
  },
  send_text: {
    fontSize: 14,
    color: Color.BACKGROUND_WHITE,
    fontWeight: "600",
  },
  attachment_file_text: {
    color: Color.COLOR_BLACK,
    padding: scale(3),
    marginLeft: scale(5),
    flex: 1,
  },
  choose_button_text: {
    color: Color.COLOR_BLACK,
    padding: scale(3),
  },
  choose_button: {
    borderRadius: scale(3),
    borderWidth: 1,
    borderColor: Color.BorderColor,
    alignSelf: "flex-start",
    backgroundColor: Color.LIGHT_GREY,
  },
});
