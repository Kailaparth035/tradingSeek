import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TouchableHighlight,
  Animated,
  StatusBar,
  Dimensions,
  Platform,
} from "react-native";

// Constant
import Color from "../../theme/Color";
import Images from "../../theme/Images";
import { scale } from "../../theme/Scalling";
import AsyncStorage from "../../helper/AsyncStorage";
// Component
import Header from "../../component/Header";
import Loader from "../../component/Loader";
import DeletPopupCom from "../../component/DeletPopUpCom";
import LogoutModalComp from "../../component/DeletPopUpCom";
import MyResponseFilter from "../../component/MyResponseFilter";

// Redux
import { useDispatch, useSelector } from "react-redux";
import ReduxActions from "../../helper/ReduxActions";

// Library
import Moment from "moment";
import { io } from "socket.io-client";
import { SwipeListView } from "react-native-swipe-list-view";
// import { Swipeable } from "react-native-gesture-handler";
import SimpleHeader from "../../component/SimpleHeader";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const MyResponse_filter_Array = [
  {
    id: 1,
    title: "Unread",
  },
  {
    id: 2,
    title: "Direct message",
  },
  {
    id: 3,
    title: "Won",
  },
  {
    id: 4,
    title: "Mark as a won ",
  },
  {
    id: 5,
    title: "Unsuccessful",
  },
  {
    id: 6,
    title: "Refunded",
  },
  {
    id: 7,
    title: "Cancelled",
  },
  {
    id: 8,
    title: "Archived",
  },
  {
    id: 9,
    title: "Quote invites",
  },
  {
    id: 10,
    title: "Declined",
  },
];

const Notifications = [
  {
    title: "parth",
    details: "parth kaila",
  },
  {
    title: "hitul",
    details: "hitul nayakpara",
  },
  {
    title: "raj",
    details: "bhadaniya raj",
  },
];
const regex = /(<([^>]+)>)/gi;

const MyResponses = (props) => {
  // ---------- Socket Connection -------- //
  const socket = io("https://api.tradingseek.net", {
    transports: ["websocket"],
  });

  // ---------- dispatch and useSelector-------- //
  const dispatch = useDispatch();
  const loaderResponse = useSelector((state) => state.loader);
  const ConversationResponse = useSelector((state) => state.Conversation);

  // ---------- state --------- //

  const [conversationData, setConversationData] = useState([]);
  const [profileDetails, setProfileDetails] = useState({});
  const [userType, setUserType] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [filterArray, setFilterArray] = useState(MyResponse_filter_Array);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    AsyncStorage.getItem("userProfile").then((profileData) => {
      // console.log("profileData::", JSON.parse(profileData));
      setProfileDetails(JSON.parse(profileData));
    });
    AsyncStorage.getItem("userType").then((userType) => {
      setUserType(userType);
    });
  }, []);

  useEffect(() => {
    // console.log("conversation api call in myresponse screen");
    socket.on("connect", () => {
      // AsyncStorage.getItem("userId").then((value) => {
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.ConversationRequest(pageSize));
      // });
    });
    socket.on("create-message", (message) => {
      // AsyncStorage.getItem("userId").then((value) => {
      console.log("conversation api call in drawer Screen");
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.ConversationRequest(pageSize));
      // });
    });
  }, []);
  const conversation = () => {
    if (ConversationResponse.data !== null) {
      setRefreshing(false);

      let temp = ConversationResponse.data.conversations;
      let countMsg = 1;
      temp.map((tempItem, tempIndex) => {
        if (tempItem.messages.length !== 0) {
          if (tempItem.receiverId !== null) {
            tempItem.messages.map((msgItem, msgIndex) => {
              if (msgItem.seenTime === null) {
                if (userType === "Business User") {
                  if (profileDetails.switchedToCustomerViewApk === false) {
                    if (msgItem.senderId === tempItem.receiverId._id) {
                      if (temp[tempIndex].pendingMessage !== undefined) {
                        countMsg = countMsg + 1;
                        temp[tempIndex].pendingMessage = countMsg;
                      } else {
                        temp[tempIndex] = {
                          ...tempItem,
                          pendingMessage: countMsg,
                        };
                      }
                    }
                  } else if (msgItem.senderId === tempItem.senderId._id) {
                    if (temp[tempIndex].pendingMessage !== undefined) {
                      countMsg = countMsg + 1;
                      temp[tempIndex].pendingMessage = countMsg;
                    } else {
                      temp[tempIndex] = {
                        ...tempItem,
                        pendingMessage: countMsg,
                      };
                    }
                  }
                } else if (msgItem.senderId === tempItem.senderId._id) {
                  if (temp[tempIndex].pendingMessage !== undefined) {
                    countMsg = countMsg + 1;
                    temp[tempIndex].pendingMessage = countMsg;
                  } else {
                    temp[tempIndex] = { ...tempItem, pendingMessage: countMsg };
                  }
                }
              }

              if (tempItem.messages.length - 1 === msgIndex) {
                temp[tempIndex] = {
                  ...tempItem,
                  last_message: {
                    last_message: msgItem.message,
                    seenTime: msgItem.seenTime,
                  },
                  key: tempIndex,
                };
              }
            });
          }
        }
      });
      setConversationData([...temp]);
    }
  };
  useEffect(() => {
    // setConversationData([]);
    setTimeout(() => {
      conversation();
    }, 1000);
  }, [ConversationResponse.data]);

  const onRefresh = () => {
    setRefreshing(true);
    AsyncStorage.getItem("userId").then((value) => {
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.ConversationRequest(pageSize));
    });
  };

  const pagination = () => {
    console.log("pagination:::");
    dispatch(ReduxActions.loaderAction(true));
    dispatch(ReduxActions.ConversationRequest(pageSize + 5));
    setPageSize(pageSize + 5);
  };

  // ---------- searchFunction ---------- //

  const searchFunction = (val) => {
    let filteredData = [];
    let conData = ConversationResponse.data.conversations;

    if (val !== "") {
      if (profileDetails !== null) {
        if (profileDetails.userType === "Business User") {
          if (profileDetails.switchedToCustomerViewApk === false) {
            filteredData = conData.filter((item) => {
              return item.receiverId.userName
                .toLowerCase()
                .includes(val.toLowerCase());
            });
            setConversationData([...filteredData]);
          } else {
            filteredData = conData.filter((item) => {
              return item.senderId.userName
                .toLowerCase()
                .includes(val.toLowerCase());
            });
            setConversationData([...filteredData]);
          }
        } else {
          filteredData = conData.filter((item) => {
            return item.senderId.userName
              .toLowerCase()
              .includes(val.toLowerCase());
          });
          setConversationData([...filteredData]);
        }
      }
    } else {
      setConversationData(ConversationResponse.data);
    }
  };

  var isJsonParsable = (string) => {
    // console.log("string ::", string);
    try {
      JSON.parse(string);
      if (
        JSON.parse(string).type === ".jpeg" ||
        JSON.parse(string).type === ".png" ||
        JSON.parse(string).type === ".jpg"
      ) {
        return <Text>image</Text>;
      } else if (JSON.parse(string).type === ".mp4") {
        return <Text>Video</Text>;
      } else if (JSON.parse(string).type === ".pdf") {
        return <Text>Pdf file</Text>;
      } else {
        return (
          <Text
            numberOfLines={1}
            style={{
              textAlign: "justify",
              fontSize: 16,
            }}
          >
            {string.length > 10 ? string.slice(0, 10) + "..." : string}
          </Text>
        );
      }
    } catch (e) {
      // console.log("string.length ::", string.length);
      return (
        <Text
          numberOfLines={1}
          style={{
            textAlign: "justify",
            fontSize: 16,
            // color: Color.BorderColor,
          }}
        >
          {string.length > 15 ? string.slice(0, 15) + "..." : string}
        </Text>
      );
    }
  };

  ///

  const closeRow = (rowMap, rowKey, data) => {
    // console.log("rowMap ::", rowMap);
    // console.log("rowKey ::", rowKey);
    // console.log("data.item", data.item);

    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
    props.navigation.navigate("ChatBox", {
      clientData: data.item,
      key: "MyResponse",
    });
    dispatch(ReduxActions.MessagesResponse(null));
    dispatch(ReduxActions.SeenMessageResponse(null));
    dispatch(ReduxActions.ConversationMsgResponse(null));
  };

  const renderItem = (data, rowMap) => {
    const rowHeightAnimatedValue = new Animated.Value(60);
    // console.log("data ::", JSON.stringify(data));
    return (
      <VisibleItem
        data={data}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        rowMap={rowMap}
      />
    );
  };

  const VisibleItem = (props) => {
    const {
      data,
      rowHeightAnimatedValue,
      leftActionState,
      rightActionState,
      rowMap,
    } = props;
    // console.log("data ===>:::", JSON.stringify(data.item.messages[0].seenTime));
    if (rightActionState) {
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        // console.log("remove");
      });
    }

    return (
      <Animated.View style={styles.rowFront}>
        <TouchableOpacity
          style={styles.fletListView}
          onPress={() => {
            closeRow(rowMap, data.item.key, data);
          }}
        >
          <View style={styles.fletListView}>
            <View style={styles.profileView}>
              {profileDetails !== null ? (
                profileDetails.userType === "Business User" ? (
                  profileDetails.switchedToCustomerViewApk === false ? (
                    data.item.receiverId !== null ? (
                      data.item.receiverId.imageUrl !== null ? (
                        <Image
                          source={{
                            uri: data.item.receiverId.imageUrl,
                          }}
                          style={styles.profileImageStyle}
                        />
                      ) : (
                        <Image
                          source={Images.Profile}
                          style={styles.profileImage}
                        />
                      )
                    ) : (
                      <Image
                        source={Images.Profile}
                        style={styles.profileImage}
                      />
                    )
                  ) : data.item.senderId.imageUrl !== null ? (
                    <Image
                      source={{
                        uri: data.item.senderId.imageUrl,
                      }}
                      style={styles.profileImageStyle}
                    />
                  ) : (
                    <Image
                      source={Images.Profile}
                      style={styles.profileImage}
                    />
                  )
                ) : data.item.senderId.imageUrl !== null ? (
                  <Image
                    source={{
                      uri: data.item.senderId.imageUrl,
                    }}
                    style={styles.profileImageStyle}
                  />
                ) : (
                  <Image source={Images.Profile} style={styles.profileImage} />
                )
              ) : null}
            </View>
            <View style={styles.profileNameView}>
              <Text
                style={[
                  styles.details_text,
                  {
                    color: Color.COLOR_BLACK,
                    fontWeight: "600",
                    fontSize: 16,
                  },
                ]}
              >
                {profileDetails !== null
                  ? profileDetails.userType === "Business User" &&
                    profileDetails.switchedToCustomerViewApk === false
                    ? data.item.receiverId.userName !== null
                      ? data.item.receiverId.userName.length > 15
                        ? data.item.receiverId.userName.slice(0, 15) + "..."
                        : data.item.receiverId.userName
                      : "Unknown person"
                    : data.item.senderId.userName !== null
                    ? data.item.senderId.userName.length > 15
                      ? data.item.senderId.userName.slice(0, 15) + "..."
                      : data.item.senderId.userName
                    : null
                  : null}
              </Text>
              <Text
                style={[
                  styles.details_text,
                  { color: Color.BorderColor, fontSize: 13 },
                ]}
              >
                {profileDetails !== null
                  ? profileDetails.userType === "Business User"
                    ? profileDetails.switchedToCustomerViewApk === false
                      ? data.item.receiverId.locations.length !== 0
                        ? "Category" +
                          " " +
                          "-" +
                          " " +
                          data.item.receiverId.locations[0].locality
                        : "Category" + "-" + "no_location"
                      : data.item.senderId.locations.length !== 0
                      ? "Category" +
                        " " +
                        "-" +
                        " " +
                        data.item.senderId.locations[0].locality
                      : "Category" + "-" + "no_location"
                    : data.item.senderId.locations.length !== 0
                    ? "Category" +
                      " " +
                      "-" +
                      " " +
                      data.item.senderId.locations[0].locality
                    : "Category" + "-" + "no_location"
                  : null}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={
                    data.item.messages[0].seenTime !== null
                      ? Images.SeenMessage
                      : Images.NotSeenMessage
                  }
                  style={[
                    styles.seenMessage_image,
                    {
                      tintColor:
                        data.item.messages[0].seenTime !== null
                          ? Color.BorderColor
                          : Color.BLUE_DRESS,
                    },
                  ]}
                />
                <Text
                  numberOfLines={1}
                  style={[
                    styles.details_text,
                    {
                      color:
                        data.item.messages[0].seenTime === null
                          ? Color.BLUE_DRESS
                          : Color.Grey,
                      fontSize: 16,
                    },
                  ]}
                >
                  {isJsonParsable(
                    data.item.messages[0].message.replace(regex, "")
                  )}
                </Text>
              </View>
            </View>
            <View style={styles.lastView}>
              <View style={styles.acrivestatusView}>
                {data.item.messages.length !== 0
                  ? data.item.messages.map((mapItem, mapIndex) => {
                      return (
                        <>
                          {data.item.messages.length - 1 === mapIndex ? (
                            <Text
                              style={[
                                styles.details_text,
                                {
                                  color: Color.BorderColor,
                                  fontSize: 14,
                                },
                              ]}
                            >
                              {Moment.utc(mapItem.updatedAt)
                                .local()
                                .startOf("seconds")
                                .fromNow()}
                            </Text>
                          ) : null}
                        </>
                      );
                    })
                  : null}
              </View>
              {/* <View style={styles.messageView}>
                <Text
                  style={[
                    styles.details_text,
                    { fontSize: 14, color: Color.Grey },
                  ]}
                >
                  {data.item.pendingMessage !== undefined
                    ? data.item.pendingMessage
                    : ""}
                </Text>
              </View> */}
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const [listData, setListData] = useState(
    Notifications.map((NotificationItem, index) => ({
      key: `${index}`,
      title: NotificationItem.title,
      details: NotificationItem.details,
    }))
  );

  const renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onClose={() => closeRow(rowMap, data.item.key, data)}
      />
    );
  };

  const HiddenItemWithActions = (props) => {
    const {
      swipeAnimatedValue,
      leftActionActivated,
      rightActionActivated,
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      onClose,
      onDelete,
    } = props;
    // console.log("leftActionActivated :::", leftActionActivated);
    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false,
      }).start();
    }

    return (
      <Animated.View style={[styles.rowBack]}>
        <TouchableOpacity
          onPress={() => onClose()}
          style={{
            backgroundColor: "red",
            // flex: 1,
            // height: "100%",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              padding: scale(5),
              color: Color.BACKGROUND_WHITE,
              fontWeight: "600",
            }}
          >
            Achived
          </Text>
        </TouchableOpacity>

        {leftActionActivated && (
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={() => onClose()}
          >
            <MaterialCommunityIcons
              name="close-circle-outline"
              size={25}
              style={styles.trash}
              color="#fff"
            />
          </TouchableOpacity>
        )}
        {leftActionActivated && (
          <Animated.View
            style={[
              styles.backRightBtn,
              styles.backRightBtnRight,
              {
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={() => onDelete()}
            >
              <Animated.View
                style={[
                  styles.trash,
                  {
                    transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [-90, -45],
                          outputRange: [1, 0],
                          extrapolate: "clamp",
                        }),
                      },
                    ],
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={25}
                  color="#fff"
                />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  const selectFilter = (item) => {
    // console.log("item ::::====>", item);
    let temp = filterArray;
    temp.map((tempItem, tempIndex) => {
      if (tempItem.id === item.id) {
        if (item.check !== undefined) {
          if (item.check === true) {
            item.check = false;
          } else {
            item.check = true;
          }
        } else {
          temp[tempIndex] = { ...tempItem, check: true };
        }
      }
    });
    setFilterArray([...temp]);
  };

  const resetFilter = () => {
    let temp = filterArray;
    temp.map((mapItem) => {
      if (mapItem.check !== undefined) {
        mapItem.check = false;
      }
    });
    setFilterArray([...temp]);
  };
  return (
    <>
      <View style={{ flex: 1, backgroundColor: Color.BACKGROUND_WHITE }}>
        <StatusBar
          translucent
          backgroundColor={"transparent"}
          barStyle="dark-content"
        />
        <View style={styles.container}>
          <SimpleHeader title={"My Responses"} rightbutton={false} />

          <>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: scale(14),
                marginVertical: scale(10),
              }}
            >
              <View style={styles.searchBarView}>
                <TextInput
                  placeholder="Search here..."
                  style={{
                    fontSize: 14,
                    color: Color.COLOR_BLACK,
                    width: Dimensions.get("window").width / 1.8,
                  }}
                  onChangeText={(val) => searchFunction(val)}
                  placeholderTextColor={Color.Grey}
                />
                <TouchableOpacity style={{ flex: 0.3, alignItems: "flex-end" }}>
                  <Image source={Images.Search} style={styles.searchImage} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.postAjobButton}
                onPress={() => setOpenFilter(true)}
              >
                <Image
                  source={Images.Filter}
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: Color.BUTTON_LIGHTBLUE,
                  }}
                />
              </TouchableOpacity>
            </View>
            {conversationData.length !== 0 ? (
              <SwipeListView
                onRefresh={onRefresh}
                refreshing={refreshing}
                data={conversationData}
                onEndReached={conversationData.length >= 8 ? pagination : null}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={66}
                rightOpenValue={-132}
                // disableRightSwipe
                // onRowDidOpen={onRowDidOpen}
                // leftActivationValue={100}
                // rightActivationValue={-200}
                leftActionValue={70}
                rightActionValue={-500}
                // onLeftAction={onLeftAction}
                // onRightAction={onRightAction}
                // onLeftActionStatusChange={onLeftActionStatusChange}
                // onRightActionStatusChange={onRightActionStatusChange}
              />
            ) : (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: scale(20),
                    fontWeight: "600",
                    color: Color.Grey,
                  }}
                >
                  No responses yet
                </Text>
              </View>
            )}

            {openFilter ? (
              <MyResponseFilter
                visible={openFilter}
                closeFilter={() => setOpenFilter(false)}
                data={filterArray}
                selectCheckBox={(item) => selectFilter(item)}
                reset={() => resetFilter()}
              />
            ) : null}
          </>
        </View>
        <Loader val={loaderResponse.loader} />
      </View>
    </>
  );
};
export default MyResponses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_WHITE,
  },
  header_view: {
    flexDirection: "row",
    padding: scale(15),
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Color.BUTTON_LIGHTBLUE,
  },
  header_text: {
    fontSize: 18,
    fontWeight: "600",
    color: Color.BACKGROUND_WHITE,
  },
  filter_text: {
    fontSize: 13,
    color: Color.BLUE_DRESS,
  },

  searchBarView: {
    flex: 3,
    height: 37,
    backgroundColor: Color.MyjobBackground,
    borderRadius: 7,
    elevation: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(5),
  },
  searchIcon: {
    height: 18,
    width: 18,
    tintColor: Color.Grey,
  },
  textInpute: {
    marginHorizontal: scale(5),
    width: "95%",
  },

  profileView: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    padding: scale(5),
  },
  profileNameView: {
    flex: 5,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    // marginTop: scale(8),
  },
  lastView: {
    flex: 3.5,
  },
  acrivestatusView: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginRight: scale(13),
  },
  messageView: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: scale(13),
    justifyContent: "flex-end",
  },
  profileImageStyle: {
    height: 45,
    width: 45,
    borderRadius: scale(20),
    borderWidth: 2,
    borderColor: Color.BLUE_DRESS,
  },
  profileImage: {
    height: 45,
    width: 45,
  },
  text: {
    fontSize: 14,
    padding: scale(3),
  },
  seenMessage_image: {
    width: 17,
    height: 17,
    marginRight: 5,
  },
  pending_message: {
    color: Color.COLOR_BLACK,
    fontSize: 12,
  },

  hiddenitem_image: {
    width: scale(28),
    height: scale(28),
  },
  details_text: {
    padding: scale(2),
  },

  // styles

  rowFront: {
    backgroundColor: Color.BACKGROUND_WHITE,
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    flex: 1,
  },
  fletListView: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Color.BACKGROUND_WHITE,
    paddingVertical: scale(4),
  },

  rowBack: {
    // flex: 1,
    alignItems: "center",
    backgroundColor: Color.BACKGROUND_WHITE,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: scale(25),
  },
  backRightBtn: {
    alignItems: "flex-end",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    paddingHorizontal: scale(17),
  },
  backRightBtnLeft: {
    backgroundColor: "#1f65ff",
    right: 66,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
  trash: {
    height: scale(25),
    width: scale(25),
  },
  header_image: {
    width: scale(22),
    height: scale(22),
    tintColor: Color.BUTTON_LIGHTBLUE,
  },

  searchImage: {
    tintColor: Color.Grey,
    width: 20,
    height: 20,
  },
  postAjobButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: Platform.OS === "android" ? 5 : 10,
    borderRadius: 5,
  },
});
