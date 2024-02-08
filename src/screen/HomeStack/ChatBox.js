import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Platform,
  SafeAreaView,
  Linking,
  ActivityIndicator,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  RefreshControl,
  FlatList,
} from "react-native";

// Constant
import Colors from "../../theme/Color";
import Images from "../../theme/Images";
import { scale } from "../../theme/Scalling";
import AsyncStorage from "../../helper/AsyncStorage";
import Fonts from "../../theme/Font";
import { complain_reason } from "../../theme/Array";

// Component
import Loader from "../../component/Loader";

import ChatFileOpenComp from "../../component/ChatFileOpen";
import StaticChatModuleComp from "../../component/StaticChatModule";

// Redux
import { useDispatch, useSelector } from "react-redux";
import ReduxActions from "../../helper/ReduxActions";

// Library
import moment from "moment";
import { io } from "socket.io-client";
import DocumentPicker from "react-native-document-picker";
import { RNS3 } from "react-native-aws3";
import Color from "../../theme/Color";
import { sendSignInLinkToEmail } from "@firebase/auth";
import DropdownComp from "../../component/DropDown";
import ImagePicker from "react-native-image-crop-picker";

// ---------- awsConfig  ---------- //

const awsConfig = {
  keyPrefix: "conversations/",
  bucket: "mediatoragetradingseek",
  region: "us-east-1",
  accessKey: "AKIAYIOFKQVACAHSK25L",
  secretKey: "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",
  successActionStatus: 201,
};

// ---------- ReceiverMessage  ---------- //

function ReceiverMessage({ message, date, seenTime }) {
  // receiver_state
  const [docModal, setDocModal] = useState(false);
  const [uri, setUri] = useState("");
  const [type, setType] = useState("");
  const [imageLoading, setImageLoading] = useState(true);

  // image_loading
  const onloading = () => {
    setImageLoading(false);
  };

  // open_Modal
  const openModal = (uri, type) => {
    if (type === "image") {
      if (!imageLoading) {
        setDocModal(true);
      }
    } else {
      setDocModal(true);
    }
    setUri(uri);
    setType(type);
  };

  // convert uri using jsonParse
  // console.log("message  ::::", message);
  var isJsonParsable = (string) => {
    // console.log("string Images :::", JSON.stringify(string));
    try {
      JSON.parse(string);
      if (JSON.parse(string).type === "image/jpeg") {
        return (
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
            }}
            onPress={() => openModal(JSON.parse(string).msg, "image")}
          >
            <View>
              <Image
                onLoadEnd={onloading}
                source={{ uri: JSON.parse(string).msg }}
                style={{ width: 100, height: 100, marginVertical: scale(5) }}
              />
              <Text style={{ color: Colors.COLOR_BLACK, width: 100 }}>
                {JSON.parse(string).msg.split("%")[1]}
              </Text>
            </View>
            <ActivityIndicator
              size="large"
              color="black"
              animating={imageLoading}
              style={styles.activityIndicator}
            />
          </TouchableOpacity>
        );
      } else if (JSON.parse(string).type === ".mp4") {
        return (
          <View>
            <StaticChatModuleComp
              openModule={() => openModal(JSON.parse(string).msg, "video")}
              type={"video"}
            />
            <Text style={{ color: Colors.BACKGROUND_WHITE, width: 100 }}>
              {JSON.parse(string).msg.split("%")[4].split("_")[1]}
              {/* {JSON.parse(string).msg.split("%")[1] +
                JSON.parse(string).msg.split("%")[2]} */}
            </Text>
          </View>
        );
      } else if (JSON.parse(string).type === "application/pdf") {
        return (
          <View>
            <StaticChatModuleComp
              openModule={() => Linking.openURL(JSON.parse(string).msg)}
              type={JSON.parse(string).type}
            />
            <Text style={{ color: Colors.COLOR_BLACK, width: 100 }}>
              {JSON.parse(string).msg.split("_")[1] +
                JSON.parse(string).msg.split("_")[2] +
                JSON.parse(string).msg.split("_")[3]}
            </Text>
          </View>
        );
      } else {
        return (
          <Text
            style={[
              styles.messageText,
              { textAlign: "justify", alignSelf: "flex-start" },
            ]}
          >
            {string}
          </Text>
        );
      }
    } catch (e) {
      // console.log("string ::", string);
      return (
        <Text style={[styles.messageText, { textAlign: "justify" }]}>
          {string}
        </Text>
      );
    }
  };

  // *** Receiver_main_return *** //

  return (
    <View style={[styles.messageContainer, { alignItems: "flex-start" }]}>
      <View
        style={[
          styles.messageView,
          {
            borderBottomRightRadius: scale(15),
            borderTopRightRadius: scale(15),
            borderTopLeftRadius: scale(15),
            marginRight: scale(20),
            backgroundColor: Colors.Dark_Grey,
          },
        ]}
      >
        {isJsonParsable(message)}
        <Text style={{ color: Colors.BACKGROUND_WHITE }}>{date}</Text>
      </View>
      <ChatFileOpenComp
        visibale={docModal}
        closeModal={() => setDocModal(false)}
        imageUri={uri}
        typeOfDocument={type}
      />
    </View>
  );
}

// ---------- SenderMessage  ---------- //

const SenderMessage = ({ message, date, seenTime }) => {
  // SenderMessage_state
  const [docModal, setDocModal] = useState(false);
  const [uri, setUri] = useState("");
  const [type, setType] = useState("");
  const [imageLoading, setImageLoading] = useState(true);

  // iamge_loading
  const onloading = () => {
    setImageLoading(false);
  };

  // openModal
  const openModal = (uri, type) => {
    // console.log("uri ::", uri);
    setDocModal(true);
    setUri(uri);
    setType(type);
  };
  var isJsonParsable = (string) => {
    // console.log("string Images :::", JSON.parse(JSON.stringify(string)));

    try {
      const uri = JSON.parse(string);
      // console.log("uri :::", uri.msg);
      JSON.parse(string);
      if (
        JSON.parse(string).type === ".jpeg" ||
        JSON.parse(string).type === ".png" ||
        JSON.parse(string).type === ".jpg"
      ) {
        return (
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: Colors.Grey,
            }}
            onPress={() => openModal(JSON.parse(string).msg, "image")}
          >
            <View>
              <Image
                onLoadEnd={onloading}
                source={{
                  uri: JSON.parse(string).msg,
                }}
                style={{ width: 100, height: 100, marginVertical: scale(5) }}
              />
              <Text style={{ color: Colors.BACKGROUND_WHITE, width: 100 }}>
                {JSON.parse(string).msg.split("%")[1]}
              </Text>
            </View>
            <ActivityIndicator
              size="large"
              color="black"
              animating={imageLoading}
              style={styles.activityIndicator}
            />
          </TouchableOpacity>
        );
      } else if (JSON.parse(string).type === ".mp4") {
        return (
          <View>
            <StaticChatModuleComp
              openModule={() => openModal(JSON.parse(string).msg, "video")}
              type={"video"}
            />
            <Text style={{ color: Colors.BACKGROUND_WHITE, width: 100 }}>
              {/* {JSON.parse(string).msg.split("%")[1] +
                JSON.parse(string).msg.split("%")[2]} */}
              {JSON.parse(string).msg.split("%")[4].split("_")[1]}
            </Text>
          </View>
        );
      } else if (JSON.parse(string).type === ".pdf") {
        const file = JSON.parse(string).msg.split("_");
        // console.log("file ::", file);
        return (
          <View>
            <StaticChatModuleComp
              openModule={() => Linking.openURL(JSON.parse(string).msg)}
              type={JSON.parse(string).type}
            />
            <Text style={{ color: Colors.BACKGROUND_WHITE, width: 100 }}>
              {JSON.parse(string).msg.split("_")[1] +
                JSON.parse(string).msg.split("_")[2] +
                JSON.parse(string).msg.split("_")[3]}
            </Text>
          </View>
        );
      } else {
        return (
          <Text
            style={[
              styles.messageText,
              { textAlign: "justify", alignSelf: "flex-start" },
            ]}
          >
            {string}
          </Text>
        );
      }
    } catch (e) {
      // console.log("string ::", string);
      return (
        <Text
          style={[
            styles.messageText,
            { textAlign: "justify", alignSelf: "flex-start" },
          ]}
        >
          {message}
        </Text>
      );
    }
  };

  // *** sender_main_return *** //
  return (
    <View style={[styles.messageContainer, { alignItems: "flex-end" }]}>
      <View
        style={[
          styles.messageView,
          {
            borderTopRightRadius: scale(15),
            borderBottomLeftRadius: scale(15),
            borderTopLeftRadius: scale(15),
            marginLeft: scale(15),
            backgroundColor: Colors.BUTTON_LIGHTBLUE,
          },
        ]}
      >
        {isJsonParsable(message)}
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
          }}
        >
          <Text style={{ color: Colors.BACKGROUND_WHITE }}>{date}</Text>
          <Image
            source={
              seenTime !== null && seenTime !== undefined
                ? Images.SeenMessage
                : Images.NotSeenMessage
            }
            style={{
              width: 20,
              height: 20,
              tintColor:
                seenTime !== null && seenTime !== undefined
                  ? Colors.BACKGROUND_WHITE
                  : Colors.BACKGROUND_WHITE,
              marginHorizontal: scale(2),
            }}
          />
        </View>
      </View>
      <ChatFileOpenComp
        visibale={docModal}
        closeModal={() => setDocModal(false)}
        imageUri={uri}
        typeOfDocument={type}
      />
    </View>
  );
};

const regex = /(<([^>]+)>)/gi;
const ChatBox = (props) => {
  // ---------- useDispatch and useSelectore  ---------- //
  const dispatch = useDispatch();
  const loaderResponse = useSelector((state) => state.loader);
  const seenMessageResponse = useSelector((state) => state.SeenMessage);
  const complainResponse = useSelector((state) => state.complaint);
  const hireduserResponse = useSelector((state) => state.hiredUser);
  const ConversationMsgResponse = useSelector((state) => state.ConversationMsg);

  // ---------- State  ---------- //
  const scrollEnd = useRef();
  const scrollRef = useRef();
  const [sendMessage, setSendMessage] = useState();
  const [messages, setMessages] = useState([]);
  const [profileDetails, setProfileDetails] = useState({});
  const [openAttachmentModal, setOpenAttachmentModal] = useState(false);
  const [callModal, setCallModal] = useState(false);
  const [complainModal, setComplainModal] = useState(false);
  const [reason, setReason] = useState(null);
  const [complain, setComplain] = useState("");
  const [complain_message, setComplain_message] = useState("");
  const [propsData, setPropsData] = useState(null);
  const [hiredUser, setHiredUser] = useState(false);
  const [hiredUserId, setHiredUserId] = useState(null);
  const [complainDocument, setComplainDocument] = useState(null);
  const [newFileComplain, setNewFileComplain] = useState();
  const [pagesize, setPagesize] = useState(10);
  const [refreshing, setRefreshing] = useState(false);
  // ---------- AsyncStorage get value   ---------- //

  useEffect(() => {
    AsyncStorage.getItem("userProfile").then((profileData) => {
      // console.log("userProfile ::", JSON.parse(profileData));
      setProfileDetails(JSON.parse(profileData));
      // console.log(
      //   "props value :::",
      //   JSON.stringify(props.route.params?.clientData)
      // );
      setPropsData(props.route.params?.clientData);
      if (hireduserResponse.data === null) {
        if (props.route.params?.clientData.jobId?.hiredDate !== null) {
          setHiredUser(true);
          setHiredUserId(props.route.params?.clientData.jobId?.hiredUser);
        } else {
          setHiredUser(false);
        }
      }
    });
  }, []);

  useEffect(() => {
    // console.log("hireduser response in screen ::", hireduserResponse.data);
    if (hireduserResponse.data !== null) {
      if (hireduserResponse.data.hiredDate !== null) {
        setHiredUser(true);
        setHiredUserId(hireduserResponse.data.hiredUser);
      } else {
        setHiredUser(false);
      }
    }
  }, [hireduserResponse.data]);

  // ---------- Socket io connection   ---------- //
  const socket = io("https://api.tradingseek.net", {
    withCredentials: true,
    forceNew: true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  });

  useEffect(() => {
    // console.log("ConversationMsgResponse :::", ConversationMsgResponse.data);
    if (ConversationMsgResponse.data !== null) {
      console.log("conversationId:", props.route.params?.clientData._id);
      console.log(
        "ConversationMsgResponse :::",
        ConversationMsgResponse.data.messages
      );
      setMessages(ConversationMsgResponse.data.messages);
      setRefreshing(false);
    } else {
      console.log("conversationId:", props.route.params?.clientData._id);
      dispatch(ReduxActions.loaderAction(true));
      dispatch(
        ReduxActions.ConversationMsgRequest(
          props.route.params.clientData._id,
          pagesize
        )
      );
    }
  }, [ConversationMsgResponse.data]);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(
      ReduxActions.ConversationMsgRequest(
        props.route.params.clientData._id,
        pagesize + 10
      )
    );
    setPagesize(pagesize + 10);
  };

  // useEffect(() => {
  //   dispatch(ReduxActions.loaderAction(true));

  // }, [scrollRef]);

  useEffect(() => {
    let newMewssage =
      ConversationMsgResponse.data !== null
        ? ConversationMsgResponse.data.messages
        : [];
    console.log("newMewssage ===", newMewssage);
    setMessages([...newMewssage]);
    socket.on("create-message", (message) => {
      console.log("message ::;", message);
      if (message.conversationId === props.route.params.clientData._id) {
        newMewssage.push(message);
        setMessages([...newMewssage]);
      }
    });
    socket.on("seen-message", (data) => {
      if (data.conversationId === props.route.params.clientData._id) {
        setMessages(data.messages);
      }
    });
  }, []);

  // ---------- Seen Message  ---------- //

  useEffect(() => {
    if (seenMessageResponse.data !== null) {
      // console.log("seenMessageResponse.data ::::", seenMessageResponse.data);
      // setMessages(seenMessageResponse.data);
    } else {
      let bodyData = {
        conversationId: props.route.params?.clientData._id,
      };
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.SeenMessageRequest(bodyData));
    }
  }, [seenMessageResponse.data]);

  const sendMessageApicall = () => {
    let bodyData = {
      conversationId: propsData._id,
      message: sendMessage,
    };
    dispatch(ReduxActions.loaderAction(true));
    dispatch(ReduxActions.SenderMessageRequest(bodyData));
    setSendMessage();
  };

  // ---------- goBackButton  ---------- //

  const goBackButton = () => {
    if (props.route.params.key === "MyJob") {
      props.navigation.goBack();
      // props.navigation.navigate("MyJob");
    } else {
      // props.navigation.navigate("MyResponses");
      props.navigation.goBack();
    }
  };

  // ---------- selectAttachmentFile  ---------- //

  const selectAttachmentFile = () => {
    setOpenAttachmentModal(true);
  };

  // ---------- complain user    ---------- //

  useEffect(() => {
    if (complainResponse.data !== null) {
      setReason(null), setComplain(""), setComplain_message("");
      setComplainModal(false);
      setComplainDocument(null);
      dispatch(ReduxActions.ComplainResponse(null));
    }
  }, [complainResponse.data]);
  // ---------- openGallery  ---------- //

  const openGallery = async () => {
    try {
      const file = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      // console.log("Gallery Image:::", JSON.stringify(file));
      file.map((image) => {
        let formData = new FormData();
        dispatch(ReduxActions.loaderAction(true));
        if (image.size <= 10000000) {
          console.log("image", image);
          let newFile = {
            uri: image.uri,
            conversationId: propsData._id,
            name: image.name,
            type: image.type,
          };

          let newFileName =
            "conversations/" +
            propsData._id +
            "_" +
            moment().format() +
            "_" +
            image.name;

          formData.append("newFile", newFile);
          formData.append("newFileName", newFileName);
          formData.append("conversationId", propsData._id);
          console.log("formData:::", JSON.stringify(formData));
          dispatch(ReduxActions.loaderAction(true));
          dispatch(ReduxActions.SendMedialRequest(formData));
        } else {
          dispatch(
            ReduxActions.ToastDisplay({
              type: "negative",
              title: "Maximum file size of 100MB is allowed.",
            })
          );
        }
      });
    } catch (e) {
      console.log("e::", e);
    }
    setOpenAttachmentModal(false);
  };

  // ---------- openVideo  ---------- //

  const openVideo = async () => {
    try {
      const file = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.video],
      });
      // console.log("Gallery video:::", JSON.stringify(file));
      let formData = new FormData();
      file.map(async (image) => {
        if (image.size <= 100000000) {
          dispatch(ReduxActions.loaderAction(true));
          let newFile = {
            uri: image.uri,
            conversationId: propsData._id,
            name: image.name,
            type: image.type,
          };
          let newFileName =
            "conversations/" +
            propsData._id +
            "_" +
            moment().format() +
            "_" +
            image.name;

          formData.append("newFile", newFile);
          formData.append("newFileName", newFileName);
          formData.append("conversationId", propsData._id);
          console.log("formData:::", JSON.stringify(formData));
          dispatch(ReduxActions.loaderAction(true));
          dispatch(ReduxActions.SendMedialRequest(formData));
        } else {
          dispatch(
            ReduxActions.ToastDisplay({
              type: "negative",
              title: "Maximum file size of 100MB is allowed.",
            })
          );
        }
      });
    } catch (e) {
      // console.log("e::", e);
    }
    setOpenAttachmentModal(false);
  };

  // ---------- opendocument  ---------- //

  const openDocumentFile = async () => {
    try {
      const file = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.pdf],
      });
      // console.log("Gallery Image:::", JSON.stringify(file));
      file.map((image) => {
        let formData = new FormData();
        dispatch(ReduxActions.loaderAction(true));
        if (image.size <= 10000000) {
          console.log("image", image);
          let newFile = {
            uri: image.uri,
            conversationId: propsData._id,
            name: image.name,
            type: image.type,
          };

          let newFileName =
            "conversations/" +
            propsData._id +
            "_" +
            moment().format() +
            "_" +
            image.name;

          formData.append("newFile", newFile);
          formData.append("newFileName", newFileName);
          formData.append("conversationId", propsData._id);
          console.log("formData:::", JSON.stringify(formData));
          // dispatch(ReduxActions.loaderAction(true));
          dispatch(ReduxActions.SendMedialRequest(formData));
        } else {
          dispatch(
            ReduxActions.ToastDisplay({
              type: "negative",
              title: "Maximum file size of 100MB is allowed.",
            })
          );
        }
      });
    } catch (e) {
      // console.log("e::", e);
    }
    setOpenAttachmentModal(false);
  };

  const callingFunction = (key) => {
    if (profileDetails.userType === "Business User") {
      if (profileDetails.switchedToCustomerViewApk === false) {
        //business users
        if (
          propsData.receiverId.phone !== null &&
          propsData.receiverId.phone !== ""
        ) {
          if (key === "phone") {
            Linking.openURL(`tel:${propsData.receiverId.phone}`)
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
            Linking.openURL(`mailto:${propsData.receiverId.email}`);
          }
        }
      } else {
        if (
          propsData.senderId.phone !== null &&
          propsData.senderId.phone !== ""
        ) {
          if (key === "phone") {
            Linking.openURL(`tel:${propsData.senderId.phone}`)
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
            Linking.openURL(`mailto:${propsData.senderId.email}`);
          }
        }
      }
    }
  };

  const hiredUserApi_call = (key) => {
    // console.log("key :::", propsData.jobId._id);

    let date = new Date();
    // console.log("new date :::", date);

    if (key === "Hired User") {
      let bodyData = {
        hiredUser: propsData.senderId._id,
        hiredDate: date,
        status: "CLOSED",
        reason: "Hired a business user from tradingseek",
      };
      // console.log("chat screen bodyData ::", bodyData);
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.HiredUserRequest(propsData.jobId._id, bodyData));
    } else if (key === "Mark Job As Won") {
      // console.log("email :::", propsData.senderId.email);
      // console.log("business user id :::", propsData.senderId._id);
      // console.log("key :::", key);
      let bodyData = {
        hiredUser: propsData.senderId._id,
        hiredDate: date,
        status: "CLOSED",
        reason: "Hired a business user from tradingseek",
      };
      // console.log("chat screen bodyData ::", bodyData);
      // console.log("email :::", propsData.senderId.email);
      // console.log("business user id :::", propsData.senderId._id);
      // console.log("key :::", key);

      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.HiredUserRequest(propsData.jobId._id, bodyData));
    }
  };

  const complain_apicall = () => {
    const formData = new FormData();
    formData.append("attachments", complainDocument);
    formData.append("newFileName", newFileComplain);
    formData.append(
      "createdBy",
      profileDetails !== null ? profileDetails._id : ""
    );
    formData.append(
      "createdAgainst",
      profileDetails !== null
        ? profileDetails.userType === "Business User"
          ? profileDetails.switchedToCustomerViewApk === false
            ? propsData.receiverId._id
            : propsData.senderId._id
          : propsData.senderId._id
        : ""
    );

    formData.append("jobId", propsData.jobId._id);
    formData.append("conversationId", propsData._id);
    formData.append(
      "createdByType",
      profileDetails !== null
        ? profileDetails.userType === "Business User"
          ? "Business"
          : "Customer"
        : "Customer"
    );
    formData.append(
      "createdAgainstType",
      profileDetails !== null
        ? profileDetails.userType === "Business User"
          ? profileDetails.switchedToCustomerViewApk === false
            ? "Business"
              ? "Customer"
              : "Customer"
            : "Customer"
          : "Customer"
        : ""
    );
    formData.append("message", complain_message);
    formData.append("subject", complain);
    formData.append("reason", reason);
    console.log("complain bodyData :::", formData);

    dispatch(ReduxActions.loaderAction(true));
    dispatch(ReduxActions.ComplainRequest(formData, props.navigation));
  };
  const select_Attachment_File = async () => {
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log("file:::", file);
      let size = file[0].size / 1000000;
      console.log("size ::", size);
      if (parseFloat(size) < 10) {
        console.log("size less then 10::");
        let newFile = {
          uri: file[0].uri,
          conversationId: propsData._id,
          name: file[0].name,
          type: file[0].type,
        };
        // console.log("newFile :::", newFile);
        setComplainDocument(newFile);
        let newFile2 =
          "complaint/" +
          propsData.jobId._id +
          "_" +
          moment().format() +
          "_" +
          file[0].name;

        console.log(
          "newFileComplain log ::",
          "complaint/" +
            propsData.jobId._id +
            "_" +
            moment().format() +
            "_" +
            file[0].name
        );
        // complaint/6381c1fb7c8ea897dcc14b87_1671544216936_HandShack.png
        setNewFileComplain(newFile2);
      } else {
        alert("hello");
        dispatch(
          ReduxActions.ToastDisplay({
            type: "negative",
            title: "Maximum file size of 10MB is allowed.",
          })
        );
        setComplainDocument(null);
      }
    } catch (e) {
      // console.log("e::", e);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* <> */}
          {/*** Header  ***/}
          <StatusBar
            translucent
            backgroundColor={"transparent"}
            barStyle="dark-content"
          />
          {propsData !== null ? (
            <>
              <View style={styles.headerView}>
                <TouchableOpacity
                  style={[styles.header_button, { flex: 0.8 }]}
                  onPress={() => goBackButton()}
                >
                  <Image
                    source={Images.BackArrow}
                    style={styles.header_button_image}
                  />
                </TouchableOpacity>
                <View style={styles.profileView}>
                  {profileDetails !== null ? (
                    profileDetails.userType === "Business User" ? (
                      profileDetails.switchedToCustomerViewApk === false ? (
                        propsData.receiverId.imageUrl !== null ? (
                          <Image
                            source={{
                              uri: propsData.receiverId.imageUrl,
                            }}
                            style={styles.profile_image}
                          />
                        ) : (
                          <Image
                            source={Images.Profile}
                            style={styles.profileImageStyle}
                          />
                        )
                      ) : propsData.senderId.imageUrl !== null ? (
                        <Image
                          source={{
                            uri: propsData.senderId.imageUrl,
                          }}
                          style={styles.profile_image}
                        />
                      ) : (
                        <Image
                          source={Images.Profile}
                          style={styles.profileImageStyle}
                        />
                      )
                    ) : propsData.senderId.imageUrl !== null ? (
                      <Image
                        source={{
                          uri: propsData.senderId.imageUrl,
                        }}
                        style={styles.profile_image}
                      />
                    ) : (
                      <Image
                        source={Images.Profile}
                        style={styles.profileImageStyle}
                      />
                    )
                  ) : null}
                  {profileDetails !== null ? (
                    profileDetails.userType === "Business User" ? (
                      profileDetails.switchedToCustomerViewApk === false ? (
                        propsData.receiverId.userName !== null ? (
                          <Text style={styles.userNameText}>
                            {propsData.receiverId.userName}
                          </Text>
                        ) : (
                          <Text style={styles.userNameText}>User Name</Text>
                        )
                      ) : propsData.senderId.userName !== null ? (
                        <Text style={styles.userNameText}>
                          {propsData.senderId.userName}
                        </Text>
                      ) : (
                        <Text style={styles.userNameText}>User Name</Text>
                      )
                    ) : propsData.senderId.userName !== null ? (
                      <Text style={styles.userNameText}>
                        {propsData.senderId.userName}
                      </Text>
                    ) : (
                      <Text style={styles.userNameText}>User Name</Text>
                    )
                  ) : null}
                </View>
                <TouchableOpacity
                  onPress={() => setCallModal(true)}
                  style={styles.header_button}
                >
                  <Image
                    source={Images.Phone}
                    style={styles.header_button_image}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => callingFunction("email")}
                  style={styles.header_button}
                >
                  <Image
                    source={Images.Email}
                    style={styles.header_button_image}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={
                    () =>
                      props.navigation.navigate("JobInformation", {
                        QuotedUSerprofileData:
                          profileDetails !== null
                            ? profileDetails.userType === "Business User"
                              ? profileDetails.switchedToCustomerViewApk ===
                                false
                                ? propsData.receiverId
                                : propsData.senderId
                              : propsData.senderId
                            : null,
                      })
                    // setOpenProfileModal(true)
                  }
                  style={styles.header_button}
                >
                  <Image
                    source={Images.Information}
                    style={styles.header_button_image}
                  />
                </TouchableOpacity>
              </View>

              {/*** ChatBox  ***/}

              <View style={styles.conversationView}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    marginBottom: scale(7),
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      borderRadius: scale(5),
                      borderWidth: 1,
                      marginRight: scale(5),
                      padding: scale(2),
                    }}
                    onPress={() => setComplainModal(true)}
                  >
                    <Image
                      source={Images.Complain}
                      style={{
                        width: 15,
                        height: 15,
                        tintColor: Color.COLOR_BLACK,
                        alignSelf: "center",
                      }}
                    />
                    <Text
                      style={{
                        marginHorizontal: scale(3),
                        color: Color.COLOR_BLACK,
                        textAlign: "center",
                      }}
                    >
                      Complaint
                    </Text>
                  </TouchableOpacity>
                  {profileDetails.userType === "Business User" &&
                  profileDetails.switchedToCustomerViewApk === false ? (
                    hiredUser === true ? (
                      hiredUserId === propsData.senderId._id ? (
                        <Text
                          style={[
                            styles.hireduser_text,
                            styles.hireduser_text_anotherstyle,
                          ]}
                        >
                          Job won
                        </Text>
                      ) : (
                        <Text
                          style={[
                            styles.hireduser_text,
                            styles.hireduser_text_anotherstyle,
                          ]}
                        >
                          Unsuccessful
                        </Text>
                      )
                    ) : (
                      <TouchableOpacity
                        style={styles.hired_button}
                        onPress={() => hiredUserApi_call("Mark Job As Won")}
                      >
                        <Text
                          style={[
                            styles.hireduser_text,
                            { color: Color.BACKGROUND_WHITE },
                          ]}
                        >
                          Mark Job As Won
                        </Text>
                      </TouchableOpacity>
                    )
                  ) : hiredUser === false ? (
                    <TouchableOpacity
                      style={styles.hired_button}
                      onPress={() => hiredUserApi_call("Hired User")}
                    >
                      <Text
                        style={[
                          styles.hireduser_text,
                          { color: Color.BACKGROUND_WHITE },
                        ]}
                      >
                        Hired Business
                      </Text>
                    </TouchableOpacity>
                  ) : hiredUserId === propsData.senderId._id ? (
                    <Text
                      style={[
                        styles.hireduser_text,
                        styles.hireduser_text_anotherstyle,
                      ]}
                    >
                      Hired
                    </Text>
                  ) : (
                    <Text
                      style={[
                        styles.hireduser_text,
                        styles.hireduser_text_anotherstyle,
                      ]}
                    >
                      Unsuccessful
                    </Text>
                  )}
                </View>
                {/* <ScrollView
                  style={styles.scrollViewStyle}
                  showsVerticalScrollIndicator={false}
                  ref={scrollEnd}
                  onContentSizeChange={() =>
                    scrollEnd.current.scrollToEnd({ animated: true })
                  }
                  refreshControl={() => (
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  )}
                > */}
                {/* {messages.length !== 0
                    ? messages.map((item) => { */}
                <View style={styles.scrollViewStyle}>
                  <FlatList
                    ref={scrollEnd}
                    onContentSizeChange={() =>
                      scrollEnd.current.scrollToEnd({ animated: true })
                    }
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    data={messages}
                    renderItem={({ item, index }) => {
                      if (profileDetails !== null) {
                        if (profileDetails.userType === "Business User") {
                          if (
                            profileDetails.switchedToCustomerViewApk === false
                          ) {
                            if (item.senderId === propsData.receiverId._id) {
                              return (
                                <ReceiverMessage
                                  message={
                                    item.message !== null
                                      ? item.message.replace(regex, "")
                                      : null
                                  }
                                  date={moment(item.updatedAt).format("hh:mmA")}
                                />
                              );
                            } else if (
                              item.senderId === propsData.senderId._id
                            ) {
                              return (
                                <SenderMessage
                                  message={
                                    item.message !== null
                                      ? item.message.replace(regex, "")
                                      : null
                                  }
                                  date={moment(item.updatedAt).format(
                                    " hh:mmA"
                                  )}
                                  seenTime={item.seenTime}
                                />
                              );
                            }
                          } else {
                            if (item.senderId === propsData.senderId._id) {
                              return (
                                <ReceiverMessage
                                  message={
                                    item.message !== null
                                      ? item.message.replace(regex, "")
                                      : null
                                  }
                                  date={moment(item.updatedAt).format("hh:mmA")}
                                />
                              );
                            } else if (
                              item.senderId === propsData.receiverId._id
                            ) {
                              return (
                                <SenderMessage
                                  message={
                                    item.message !== null
                                      ? item.message.replace(regex, "")
                                      : null
                                  }
                                  date={moment(item.updatedAt).format(
                                    " hh:mmA"
                                  )}
                                  seenTime={item.seenTime}
                                />
                              );
                            }
                          }
                        } else {
                          if (item.senderId === propsData.senderId._id) {
                            return (
                              <ReceiverMessage
                                message={
                                  item.message !== null
                                    ? item.message.replace(regex, "")
                                    : null
                                }
                                date={moment(item.updatedAt).format("hh:mmA")}
                              />
                            );
                          } else if (
                            item.senderId === propsData.receiverId._id
                          ) {
                            return (
                              <SenderMessage
                                message={
                                  item.message !== null
                                    ? item.message.replace(regex, "")
                                    : null
                                }
                                date={moment(item.updatedAt).format(" hh:mmA")}
                                seenTime={item.seenTime}
                              />
                            );
                          }
                        }
                      }
                    }}
                  />
                </View>
                {/* })
                    : null}
                </ScrollView> */}
              </View>

              {/*** FooterView  ***/}

              <View style={styles.footerView}>
                <View style={styles.textinputeView}>
                  <TextInput
                    style={styles.textInputeStyle}
                    multiline={true}
                    value={sendMessage}
                    placeholder="Write a reply"
                    placeholderTextColor={Color.Grey}
                    onChangeText={(msg) => setSendMessage(msg)}
                  />
                </View>
                <View style={{ flex: 3, flexDirection: "row" }}>
                  <TouchableOpacity
                    style={{
                      alignSelf: "center",
                      flex: 1,
                    }}
                    onPress={() => {}}
                  >
                    <Image
                      source={Images.Emoji}
                      style={styles.chatboxImageStyles}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => selectAttachmentFile()}
                    style={{ alignSelf: "center", flex: 1 }}
                  >
                    <Image
                      source={Images.ChatShare}
                      style={styles.chatboxImageStyles}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => sendMessageApicall()}
                    disabled={sendMessage !== undefined ? false : true}
                    style={{ alignSelf: "center", flex: 1 }}
                  >
                    <Image
                      source={Images.ChatMessageSend}
                      style={styles.chatboxImageStyles}
                    />
                  </TouchableOpacity>
                </View>
              </View>

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
                      {profileDetails.userType === "Business User"
                        ? profileDetails.switchedToCustomerViewApk === false
                          ? propsData.receiverId.phone !== null &&
                            propsData.receiverId.phone !== ""
                            ? "call" + propsData.receiverId.phone
                            : "number is not entered"
                          : propsData.senderId.phone !== ""
                          ? "call" + propsData.senderId.phone
                          : "number is not entered"
                        : "call" + propsData.senderId.phone}
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
            </>
          ) : (
            <Loader val={true} />
          )}

          <Modal
            visible={openAttachmentModal}
            onRequestClose={() => setOpenAttachmentModal(false)}
            transparent={true}
            animationType="slide"
          >
            <Image source={Images.Black} style={styles.modalBackground} />

            <TouchableWithoutFeedback
              onPress={() => setOpenAttachmentModal(false)}
            >
              <View
                style={{
                  flex: 1,
                  // flexDirection: "row",
                  // justifyContent: "space-between",
                }}
              >
                <View style={styles.attchmentModalContainer}>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={styles.touchabaleopacity}
                      onPress={() => openGallery()}
                    >
                      <Image
                        source={Images.Gallery}
                        style={styles.attachMentImageStyle}
                      />
                      <Text style={styles.textStyle}>Gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.touchabaleopacity}
                      onPress={() => openVideo()}
                    >
                      <Image
                        source={Images.YouTube}
                        style={styles.attachMentImageStyle}
                      />
                      <Text style={styles.textStyle}>Video</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.touchabaleopacity}
                      onPress={() => openDocumentFile()}
                    >
                      <Image
                        source={Images.File}
                        style={styles.attachMentImageStyle}
                      />
                      <Text style={styles.textStyle}>File</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.touchabaleopacity,
                      { marginHorizontal: scale(0) },
                    ]}
                    onPress={() => setOpenAttachmentModal(false)}
                  >
                    <Image
                      source={Images.ViewClose}
                      style={{ width: scale(25), height: scale(25) }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          <Modal
            visible={complainModal}
            transparent={true}
            animationType={"slide"}
          >
            <Image source={Images.Black} style={styles.modalBackground} />
            <View style={styles.complainModal_view}>
              <Loader val={loaderResponse.loader} />
              <View style={styles.complainmodal_header_view}>
                <Text style={styles.complainmodal_header_text}>
                  What is your complaint
                </Text>
                <TouchableOpacity
                  style={{ alignSelf: "center", paddingHorizontal: scale(8) }}
                  onPress={() => setComplainModal(false)}
                >
                  <Image
                    source={Images.ViewClose}
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: Color.BACKGROUND_WHITE,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.complain_fied_title}>Reason*</Text>
              <DropdownComp
                selectedValue={reason}
                placeholder="Filter Category"
                data={complain_reason}
                labelField={"title"}
                valueField={"title"}
                dropdown={styles.dropdown}
                selected={(item) => setReason(item.title)}
                placeholderStyle={{ color: Color.BorderColor }}
              />
              <Text
                style={[styles.complain_fied_title, { marginTop: scale(20) }]}
              >
                Complaint Subject*
              </Text>
              <TextInput
                placeholder="Complaint"
                placeholderTextColor={Color.Grey}
                style={[styles.complainmodal_textInpute, { height: scale(30) }]}
                onChangeText={(text) => {
                  if (text.length <= 100) {
                    setComplain(text);
                  }
                }}
                maxLength={100}
                value={complain}
              />
              <Text style={styles.subject_length}>({complain.length}/100)</Text>
              <Text
                style={[styles.complain_fied_title, { marginTop: scale(20) }]}
              >
                Message*
              </Text>
              <TextInput
                placeholder="Complaint message"
                multiline
                placeholderTextColor={Color.Grey}
                style={[styles.complainmodal_textInpute, { height: scale(50) }]}
                onChangeText={(text) => {
                  if (text.length <= 4000) {
                    setComplain_message(text);
                  }
                }}
                maxLength={4000}
                value={complain_message}
              />
              <Text style={styles.subject_length}>
                ({complain_message.length}/4000)
              </Text>
              <Text
                style={[styles.complain_fied_title, { marginTop: scale(20) }]}
              >
                Attachment
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: scale(20),
                  marginTop: scale(10),
                }}
              >
                <TouchableOpacity
                  style={{
                    borderRadius: scale(3),
                    borderWidth: 1,
                    borderColor: Color.BorderColor,
                    alignSelf: "flex-start",
                    backgroundColor: Color.LIGHT_GREY,
                  }}
                  onPress={() => select_Attachment_File()}
                >
                  <Text style={{ color: Color.COLOR_BLACK, padding: scale(3) }}>
                    Choose file
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    color: Color.COLOR_BLACK,
                    padding: scale(3),
                    marginLeft: scale(5),
                    flex: 1,
                  }}
                >
                  {complainDocument !== null
                    ? complainDocument.name
                    : "No file chosen"}
                </Text>
              </View>

              <View style={styles.complainmodal_button_view}>
                <TouchableOpacity
                  onPress={() => {
                    setComplainModal(false),
                      setReason(null),
                      setComplain(""),
                      setComplain_message("");
                  }}
                  style={styles.complain_cancel_button}
                >
                  <Text
                    style={{
                      color: Color.COLOR_BLACK,
                      alignSelf: "center",
                    }}
                  >
                    cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => complain_apicall()}
                  style={[
                    styles.complain_button,
                    {
                      opacity:
                        reason !== null &&
                        complain !== "" &&
                        complain_message !== ""
                          ? 1
                          : 0.5,
                    },
                  ]}
                  disabled={
                    reason !== null &&
                    complain !== "" &&
                    complain_message !== ""
                      ? false
                      : true
                  }
                >
                  <Text
                    style={{
                      color: Color.BACKGROUND_WHITE,
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    Register Complaint
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          {/* </> */}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default ChatBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    // height:
    //   Platform.OS === "android"
    //     ? Dimensions.get("window").height / 8
    //     : Dimensions.get("window").height / 9,
    flexDirection: "row",
    elevation: 10,
    backgroundColor: Colors.BUTTON_LIGHTBLUE,
    alignItems: "center",
    paddingBottom: Platform.OS === "android" ? 10 : 20,
    paddingTop: 40,
    justifyContent: "center",
  },
  profileView: {
    flex: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  profileImageStyle: {
    width: 50,
    height: 50,
  },
  userNameText: {
    fontSize: 15,
    textAlign: "justify",
    width: "73%",
    marginLeft: scale(10),
    color: Colors.BACKGROUND_WHITE,
    fontWeight: "600",
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    marginBottom: scale(10),
  },
  messageView: {
    justifyContent: "center",
    marginHorizontal: scale(10),
    paddingHorizontal: scale(7),
    paddingVertical: scale(5),
    elevation: 10,
  },
  messageText: {
    padding: 5,
    color: Colors.BACKGROUND_WHITE,
    fontSize: 15,
  },
  conversationView: {
    flex: 8,
    // borderWidth: 0.3,
    justifyContent: "flex-end",
    backgroundColor: Colors.BACKGROUND_WHITE,
    borderColor: Colors.BorderColor,
    paddingVertical: scale(10),
  },
  scrollViewStyle: {
    // padding: scale(10),
    paddingBottom: scale(0),
    // height: 40,
    // marginBottom: scale(10),
    height: Dimensions.get("window").height / 1.4,
    backgroundColor: Colors.BACKGROUND_WHITE,
  },
  footerView: {
    // flex: 1,
    height: Platform.OS === "ios" ? 70 : 60,
    backgroundColor: Colors.BACKGROUND_WHITE,
    flexDirection: "row",
    paddingTop: scale(5),
    paddingBottom: scale(5),
    // backgroundColor: "red",
  },
  textinputeView: {
    flex: 7,
    flexDirection: "row",
    borderRadius: scale(15),
    backgroundColor: Color.Dark_White,
    marginLeft: scale(10),
    height: Platform.OS === "ios" ? 50 : 37,
    alignItems: "center",
    borderColor: Colors.BorderColor,
    elevation: 10,
    paddingHorizontal: scale(10),
    alignSelf: "center",
    // width: Dimensions.get("window").width / 1.4,
  },
  chatboxImageStyles: {
    width: 24,
    height: 24,
    marginLeft: scale(5),
    tintColor: Colors.Grey,
  },
  textInputeStyle: {
    width: Dimensions.get("window").width / 1.52,
    color: Color.COLOR_BLACK,
    alignSelf: "center",
  },

  /// Attachment modal

  modalBackground: {
    flex: 1,
    position: "absolute",
    height: "100%",
    width: "100%",
    opacity: 0.7,
  },
  attchmentModalContainer: {
    backgroundColor: Colors.BACKGROUND_WHITE,
    marginTop: Dimensions.get("window").height / 1.3,
    marginHorizontal: scale(10),
    borderRadius: scale(10),
    elevation: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    padding: scale(15),
    justifyContent: "space-between",
  },
  touchabaleopacity: {
    marginHorizontal: scale(7),
    borderRadius: scale(5),
    alignItems: "center",
  },
  attachMentImageStyle: {
    tintColor: Colors.BUTTON_LIGHTBLUE,
    width: 40,
    height: 40,
  },
  textStyle: {
    fontFamily: Fonts.Lato_Regular,
    color: Colors.COLOR_BLACK,
  },
  pdf: {
    flex: 1,
    width: scale(200),
    height: scale(100),
    alignSelf: "center",
  },
  activityIndicator: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  // header style
  header_button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  header_button_image: {
    width: 25,
    height: 25,
    tintColor: Colors.BACKGROUND_WHITE,
  },
  profile_image: {
    borderRadius: 50,
    height: 45,
    width: 45,
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
    fontSize: scale(14),
  },

  // hired button

  hired_button: {
    marginHorizontal: scale(10),
    paddingHorizontal: scale(7),
    backgroundColor: Color.BUTTON_LIGHTBLUE,
    alignSelf: "flex-end",
    color: Color.BACKGROUND_WHITE,
    borderRadius: scale(5),
  },
  hireduser_text: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    alignSelf: "center",
  },
  hireduser_text_anotherstyle: {
    textAlign: "center",
    alignSelf: "center",
    marginRight: scale(15),
    color: Color.COLOR_BLACK,
  },

  /// complain modal

  complain_fied_title: {
    color: Color.COLOR_BLACK,
    fontWeight: "500",
    marginHorizontal: scale(15),
    marginTop: scale(10),
    fontSize: 14,
  },
  dropdown: {
    // flex: 1,
    borderBottomColor: Color.BorderColor,
    paddingLeft: 3,
    paddingHorizontal: scale(15),
    paddingTop: scale(15),
    paddingBottom: scale(5),
    borderBottomWidth: 1,
    marginHorizontal: scale(20),
  },
  complainmodal_textInpute: {
    borderWidth: 1,
    borderColor: Color.BorderColor,
    borderRadius: scale(5),
    padding: scale(5),
    marginHorizontal: scale(20),
    marginTop: scale(7),
    color: Color.COLOR_BLACK,
  },
  complainModal_view: {
    marginTop: Dimensions.get("window").height / 6,
    backgroundColor: Color.BACKGROUND_WHITE,
    marginHorizontal: scale(10),
    // padding: scale(10),
    borderRadius: scale(5),
    elevation: 10,
  },
  complainmodal_header_view: {
    backgroundColor: Color.BUTTON_LIGHTBLUE,
    borderTopLeftRadius: scale(5),
    borderTopRightRadius: scale(5),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  complainmodal_header_text: {
    padding: scale(10),
    fontWeight: "600",
    color: Color.BACKGROUND_WHITE,
    fontSize: 16,
  },
  complainmodal_button_view: {
    flexDirection: "row",
    marginVertical: scale(20),
    marginHorizontal: scale(20),
  },
  complain_cancel_button: {
    flex: 1,
    paddingHorizontal: scale(7),
    paddingVertical: Platform.OS === "ios" ? scale(5) : 0,
    borderWidth: 1,
    borderColor: Color.BorderColor,
    borderRadius: scale(5),
    marginHorizontal: scale(3),
    justifyContent: "center",
  },
  complain_button: {
    flex: 1,
    backgroundColor: Color.BUTTON_LIGHTBLUE,
    paddingHorizontal: scale(7),
    paddingVertical: Platform.OS === "ios" ? scale(5) : 0,
    borderWidth: 1,
    borderColor: Color.BUTTON_LIGHTBLUE,
    borderRadius: scale(5),
    marginHorizontal: scale(3),
  },

  subject_length: {
    marginHorizontal: scale(20),
    alignSelf: "flex-end",
    color: Color.COLOR_BLACK,
  },
});
