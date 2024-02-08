import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  TextInput,
  keyboardDidShowListener,
  Keyboard,
  keyboardDidHideListener,
  StatusBar,
  Dimensions,
} from "react-native";

// Constant
import { scale } from "../../theme/Scalling";
import Images from "../../theme/Images";
import Color from "../../theme/Color";
import AsyncStorage from "../../helper/AsyncStorage";
import {
  UnRead,
  ActionBuyersHasTaken,
  SubOptionForbuyers,
  Actionnottaken,
  PurchaseDate,
  sort_by_credit,
  verified_proof,
  credit_range_lead,
} from "../../theme/Array";

// Component
import Loader from "../../component/Loader";
import SimpleHeader from "../../component/SimpleHeader";
import MyLeadFilterComp from "../../component/MyLeadFilter";

// Redux
import ReduxActions from "../../helper/ReduxActions";
import { useDispatch, useSelector } from "react-redux";

// Library
import SplashScreen from "react-native-splash-screen";
import Moment from "moment";

const Lead = (props) => {
  var CryptoJS = require("crypto-js");
  // Splacescreen hide
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  // dispatch
  const dispatch = useDispatch();
  const updateProfileResponse = useSelector((state) => state.GetProfileData);
  const leadResponse = useSelector((state) => state.Lead);
  const loaderResponse = useSelector((state) => state.loader);

  // State
  const [profileDetails, setProfileDetails] = useState(null);
  const [lead, setLead] = useState([]);
  const [searchText, setSearchText] = useState(null);
  // FILTER STATE
  const [openFilterModal, setOpenFilterModal] = useState(false);
  // Filter CheckBox
  const [unRead, setUnRead] = useState(UnRead);
  const [actionBuyersHasTaken, setActionBuyersHasTaken] = useState(
    ActionBuyersHasTaken
  );
  const [subOptionForbuyers, setSubOptionForbuyers] = useState(
    SubOptionForbuyers
  );
  const [actionnottaken, setActionnottaken] = useState(Actionnottaken);
  const [purchaseDate, setPurchaseDate] = useState(PurchaseDate);
  const [typesofJob, setTypesofJob] = useState("get-leads");
  const [sortByCredit, setSortByCredit] = useState(sort_by_credit);
  const [verifiedProof, setVerifiedProof] = useState(verified_proof);
  const [creditRange, setCreditRange] = useState(credit_range_lead);
  const [category, setCategory] = useState([]);
  const [creditValue, setCreditValue] = useState(10);
  const [validProof, setValidProof] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  // get profile Details useEffect
  useEffect(() => {
    if (updateProfileResponse.data !== null) {
      AsyncStorage.getItem("userProfile").then((profileData) => {
        setProfileDetails(JSON.parse(profileData));
        // console.log("category", JSON.parse(profileData));
        setCategory(JSON.parse(profileData).professions);
      });
    } else {
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.GetProfileDataRequest());
    }
  }, [updateProfileResponse.data]);

  useEffect(() => {
    // console.log("leadResponse", leadResponse.data);
    if (leadResponse.data !== null) {
      // console.log("leadResponse success", leadResponse.data);
      setRefreshing(false);
      if (leadResponse.data !== undefined) {
        const SECRET_KEY = "#Tradingseek#123#Tradingseek#";
        var bytes = CryptoJS.AES.decrypt(leadResponse.data, SECRET_KEY);
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        // console.log("decryptedData ::", JSON.stringify(decryptedData));
        setLead(decryptedData.data);
      } else {
        setLead([]);
      }
    } else {
      get_leadData("get-leads");
    }
  }, [leadResponse.data]);

  const get_leadData = (leadType) => {
    // console.log("leadType ::", leadType);
    setTypesofJob(leadType);
    let bodyData = {
      params: {
        perPage: pageSize,
        age: creditValue,
        age1: validProof,
        range: [],
        category: [],
      },
    };
    dispatch(ReduxActions.loaderAction(true));
    dispatch(ReduxActions.LeadRequest(bodyData, leadType));
  };
  // Filter functionality

  const CheckBox = (val, key, type) => {
    console.log("type ==>", type);
    let temp;
    if (type === "singleselect") {
      if (key === "sort_by_credit") {
        temp = sortByCredit;
        temp.map((tempItem, tempIndex) => {
          if (tempItem._id === val._id) {
            if (tempItem.check !== undefined) {
              if (tempItem.check !== true) {
                setCreditValue(val._id);
                tempItem.check = true;
              }
            } else {
              temp[tempIndex] = { ...tempItem, check: true };
            }
          } else {
            if (tempItem.check !== undefined) {
              tempItem.check = false;
            }
          }
        });
      } else if (key === "verified_proof") {
        temp = verifiedProof;
        temp.map((tempItem, tempIndex) => {
          if (tempItem._id === val._id) {
            if (tempItem.check !== undefined) {
              if (tempItem.check !== true) {
                setValidProof(val._id);
                tempItem.check = true;
              } else {
                setValidProof("");
                tempItem.check = false;
              }
            } else {
              setValidProof(val._id);
              temp[tempIndex] = { ...tempItem, check: true };
            }
          } else {
            if (tempItem.check !== undefined) {
              tempItem.check = false;
            }
          }
        });
      }

      if (key === "sort_by_credit") {
        setSortByCredit([...temp]);
      } else if (key === "verified_proof") {
        setVerifiedProof([...temp]);
      }
    } else if (type === "multiselect") {
      if (key === "UnRead") {
        temp = unRead;
      } else if (key === "actionBuyersHasTaken") {
        temp = actionBuyersHasTaken;
      } else if (key === "subOptionForbuyers") {
        temp = subOptionForbuyers;
      } else if (key === "actionBuyersHasTaken") {
        temp = actionBuyersHasTaken;
      } else if (key === "actionnottaken") {
        temp = actionnottaken;
      } else if (key === "purchaseDate") {
        temp = purchaseDate;
      } else if (key === "credit_rang") {
        temp = creditRange;
      } else if (key === "category") {
        temp = category;
      }

      temp.map((tempItem, tempIndex) => {
        if (tempItem._id === val._id) {
          if (tempItem.check !== undefined) {
            if (tempItem.check !== true) {
              tempItem.check = true;
            } else {
              tempItem.check = false;
            }
          } else {
            temp[tempIndex] = { ...tempItem, check: true };
          }
        }
      });

      if (key === "UnRead") {
        setUnRead([...temp]);
      } else if (key === "actionBuyersHasTaken") {
        setActionBuyersHasTaken([...temp]);
      } else if (key === "subOptionForbuyers") {
        setSubOptionForbuyers([...temp]);
      } else if (key === "actionBuyersHasTaken") {
        setActionBuyersHasTaken([...temp]);
      } else if (key === "actionnottaken") {
        setActionnottaken([...temp]);
      } else if (key === "purchaseDate") {
        setPurchaseDate([...temp]);
      } else if (key === "credit_rang") {
        setCreditRange([...temp]);
      } else if (key === "category") {
        setCategory([...temp]);
      }
    }
  };

  const reset_filter = () => {
    let temp_unread = unRead;
    let temp_actionBuyersHasTaken = actionBuyersHasTaken;
    let temp_subOptionForbuyers = subOptionForbuyers;
    let temp_actionnottaken = actionnottaken;
    let temp_purchaseDate = purchaseDate;
    let temp_verified_proof = verifiedProof;
    let temp_credit_range = creditRange;
    let temp_category = category;
    let temp_sort_by_credit = sortByCredit;

    temp_sort_by_credit.map((mapItem) => {
      if (mapItem._id === 10) {
        mapItem.check = true;
      } else {
        mapItem.check = false;
      }
    });

    setSortByCredit([...temp_sort_by_credit]);
    temp_category.map((mapItem) => {
      if (mapItem.check !== undefined) {
        mapItem.check = false;
      }
    });
    setCategory([...temp_category]);
    temp_credit_range.map((mapItem) => {
      if (mapItem.check !== undefined) {
        mapItem.check = false;
      }
    });
    setCreditRange([...temp_credit_range]);
    temp_verified_proof.map((mapItem) => {
      if (mapItem.check !== undefined) {
        mapItem.check = false;
      }
    });
    setVerifiedProof([...temp_verified_proof]);

    temp_unread.map((mapItem) => {
      if (mapItem.check !== undefined) {
        mapItem.check = false;
      }
    });
    setUnRead([...temp_unread]);

    temp_actionBuyersHasTaken.map((mapItem) => {
      if (mapItem.check !== undefined) {
        mapItem.check = false;
      }
    });
    setActionBuyersHasTaken([...temp_actionBuyersHasTaken]);

    temp_subOptionForbuyers.map((mapItem) => {
      if (mapItem.check !== undefined) {
        mapItem.check = false;
      }
    });
    setSubOptionForbuyers([...temp_subOptionForbuyers]);

    temp_actionnottaken.map((mapItem) => {
      if (mapItem.check !== undefined) {
        mapItem.check = false;
      }
    });
    setActionnottaken([...temp_actionnottaken]);

    temp_purchaseDate.map((mapItem) => {
      if (mapItem.check !== undefined) {
        mapItem.check = false;
      }
    });
    setPurchaseDate([...temp_purchaseDate]);
  };

  const applyFilter = () => {
    // alert("filter apply");
    // setTypesofJob(leadType);
    let credit_value = [];
    let category_id = [];
    creditRange.map((mapItem) => {
      if (mapItem.check !== undefined) {
        if (mapItem.check === true) {
          credit_value.push(mapItem.range);
        }
      }
    });
    category.map((mapItem) => {
      if (mapItem.check !== undefined) {
        if (mapItem.check === true) {
          category_id.push(mapItem._id);
        }
      }
    });

    let bodyData = {
      params: {
        perPage: pageSize,
        age: creditValue,
        age1: validProof,
        range: credit_value,
        category: category_id,
      },
    };
    console.log("bodyData ::", bodyData);
    dispatch(ReduxActions.loaderAction(true));
    dispatch(ReduxActions.LeadRequest(bodyData, typesofJob));
    setOpenFilterModal(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    let bodyData = {
      params: {
        perPage: pageSize,
        age: creditValue,
        age1: validProof,
        range: [],
        category: [],
      },
    };
    dispatch(ReduxActions.loaderAction(true));
    dispatch(ReduxActions.LeadRequest(bodyData, typesofJob));
  };

  const pagination = () => {
    let bodyData = {
      params: {
        perPage: pageSize + 5,
        age: creditValue,
        age1: validProof,
        range: [],
        category: [],
      },
    };
    dispatch(ReduxActions.loaderAction(true));
    dispatch(ReduxActions.LeadRequest(bodyData, typesofJob));
    setPageSize(pageSize + 5);
  };

  const searchLead = (text) => {
    let filteredData = [];
    console.log("text ::", text);
    const SECRET_KEY = "#Tradingseek#123#Tradingseek#";
    var bytes = CryptoJS.AES.decrypt(leadResponse.data, SECRET_KEY);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log("decryptedData ::::", JSON.stringify(decryptedData));

    filteredData = decryptedData.data.filter((item) => {
      if (item.user.userName !== null) {
        return item.user.userName.toLowerCase().includes(text.toLowerCase());
      }
    });
    setLead([...filteredData]);
  };
  return (
    <View style={styles.container}>
      {/* Loader */}
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle="dark-content"
      />
      <SimpleHeader title={"Leads"} rightbutton={false} />
      <View
        style={{
          flexDirection: "row",
          alignSelf: "flex-end",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            marginTop: scale(12),
            fontSize: 14,
            fontWeight: "600",
            color: Color.COLOR_BLACK,
          }}
        >
          Credits :{" "}
        </Text>
        <View style={styles.credit_text_view}>
          <Text style={styles.credit_text}>
            {profileDetails !== null ? "$" + profileDetails.credits : null}
          </Text>
        </View>
      </View>
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
            onChangeText={(val) => searchLead(val)}
            // value={searchText}
            placeholderTextColor={Color.Grey}
          />
          <TouchableOpacity style={{ flex: 0.3, alignItems: "flex-end" }}>
            <Image source={Images.Search} style={styles.searchImage} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.postAjobButton}
          onPress={() => setOpenFilterModal(true)}
        >
          <Image
            source={Images.Filter}
            style={{
              width: scale(30),
              height: scale(30),
              tintColor: Color.BUTTON_LIGHTBLUE,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.header_button}>
        <TouchableOpacity
          style={[
            styles.header_button_touchabale,
            {
              borderBottomColor:
                typesofJob === "get-leads"
                  ? Color.BUTTON_LIGHTBLUE
                  : Color.BACKGROUND_WHITE,
            },
          ]}
          onPress={() => get_leadData("get-leads")}
        >
          <Image
            source={Images.Flag}
            style={[
              styles.openJob_image,
              {
                tintColor:
                  typesofJob === "get-leads"
                    ? Color.BUTTON_LIGHTBLUE
                    : Color.COLOR_BLACK,
              },
            ]}
          />
          <Text
            style={[
              styles.header_button_text,
              {
                color:
                  typesofJob === "get-leads"
                    ? Color.BUTTON_LIGHTBLUE
                    : Color.COLOR_BLACK,
              },
            ]}
          >
            Open
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.header_button_touchabale,
            {
              borderBottomColor:
                typesofJob === "get-quoted-leads"
                  ? Color.BUTTON_LIGHTBLUE
                  : Color.BACKGROUND_WHITE,
            },
          ]}
          onPress={() => get_leadData("get-quoted-leads")}
        >
          <Image
            source={Images.Quotes}
            style={[
              styles.openJob_image,
              {
                tintColor:
                  typesofJob === "get-quoted-leads"
                    ? Color.BUTTON_LIGHTBLUE
                    : Color.COLOR_BLACK,
              },
            ]}
          />
          <Text
            style={[
              styles.header_button_text,
              {
                color:
                  typesofJob === "get-quoted-leads"
                    ? Color.BUTTON_LIGHTBLUE
                    : Color.COLOR_BLACK,
              },
            ]}
          >
            Quoted
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.header_button_touchabale,
            {
              borderBottomColor:
                typesofJob === "get-draft-leads"
                  ? Color.BUTTON_LIGHTBLUE
                  : Color.BACKGROUND_WHITE,
            },
          ]}
          onPress={() => get_leadData("get-draft-leads")}
        >
          <Image
            source={Images.Draft}
            style={[
              styles.openJob_image,
              {
                tintColor:
                  typesofJob === "get-draft-leads"
                    ? Color.BUTTON_LIGHTBLUE
                    : Color.COLOR_BLACK,
              },
            ]}
          />
          <Text
            style={[
              styles.header_button_text,
              {
                color:
                  typesofJob === "get-draft-leads"
                    ? Color.BUTTON_LIGHTBLUE
                    : Color.COLOR_BLACK,
              },
            ]}
          >
            Drafts
          </Text>
        </TouchableOpacity>
      </View>

      {lead.length !== 0 ? (
        <FlatList
          data={lead}
          onRefresh={onRefresh}
          refreshing={refreshing}
          onEndReached={pagination}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={{
                  flex: 1,
                  borderBottomColor: Color.Grey,
                  borderBottomWidth: 0.5,
                  marginTop: index === 0 ? 20 : scale(0),
                }}
                onPress={() =>
                  props.navigation.navigate("LeadDetails", {
                    data: item,
                    type: typesofJob,
                  })
                }
              >
                <View
                  style={[
                    styles.flatist_item_view,
                    { paddingLeft: scale(15), paddingRight: scale(20) },
                  ]}
                >
                  <Text style={[styles.item_title_text, { flex: 1 }]}>
                    {item.user.userName}
                  </Text>
                  <Text style={styles.item_simple_text}>
                    {Moment.utc(item.createdAt)
                      .local()
                      .startOf("seconds")
                      .fromNow()}
                  </Text>
                </View>
                <View
                  style={[
                    styles.flatist_item_view,
                    { paddingHorizontal: scale(20) },
                  ]}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View>
                      <Image
                        source={Images.MobilePhone}
                        style={[styles.backgroundImageforVerified]}
                      />
                      {item.user.isPhoneVerified !== false ? (
                        <Image
                          source={Images.Verifiedcredential}
                          style={styles.verifirdImage}
                        />
                      ) : null}
                    </View>
                    <View style={{ marginLeft: scale(12) }}>
                      <Image
                        source={Images.Email}
                        style={styles.backgroundImageforVerified}
                      />
                      {item.user.isEmailVerified !== false ? (
                        <Image
                          source={Images.Verifiedcredential}
                          style={styles.verifirdImage}
                        />
                      ) : null}
                    </View>
                  </View>
                  <Text style={styles.item_simple_text}>
                    {item.address.length > 15
                      ? item.address.slice(0, 15) + "..."
                      : item.address}
                  </Text>
                </View>
                <View
                  style={[
                    styles.flatist_item_view,
                    { paddingHorizontal: scale(20) },
                  ]}
                >
                  <Text style={styles.item_simple_text}>
                    {item.questionAnswers[0].answer_radio}
                  </Text>
                </View>
                {item.questionAnswers.map((mapItem) => {
                  if (mapItem.pushedQuestion === "Description") {
                    return (
                      <View
                        style={[
                          styles.flatist_item_view,
                          { paddingHorizontal: scale(20) },
                        ]}
                      >
                        <Text style={styles.item_simple_text}>
                          {mapItem.answer_textarea !== undefined
                            ? mapItem.answer_textarea.slice(0, 15) + "..."
                            : " "}
                        </Text>
                      </View>
                    );
                  }
                })}

                <View
                  style={[
                    styles.flatist_item_view,
                    { paddingHorizontal: scale(20) },
                  ]}
                >
                  <Text style={[styles.item_title_text, { color: Color.Grey }]}>
                    {item.credits} credits
                  </Text>
                  {item.isDraft === true ? (
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        style={{
                          width: 16,
                          height: 16,
                          tintColor: Color.Grey,
                        }}
                        source={Images.Edit}
                      />
                      <Text
                        style={[
                          styles.item_title_text,
                          { color: Color.Grey, textAlign: "right" },
                        ]}
                      >
                        Draft
                      </Text>
                    </View>
                  ) : null}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <View style={styles.emptyArray_view}>
          <Text style={styles.emptyArray_text}>Not Found Any Drafted Lead</Text>
        </View>
      )}
      <Loader val={loaderResponse.loader} />
      <MyLeadFilterComp
        visibale={openFilterModal}
        profileDetails={profileDetails !== null ? profileDetails : null}
        closeFilter={() => setOpenFilterModal(false)}
        cancelButton={() => {
          setOpenFilterModal(false), reset_filter();
        }}
        applyFilter={() => applyFilter()}
        reset={() => reset_filter()}
        unreadData={unRead}
        selectCheckBox={(val, key, type) => CheckBox(val, key, type)}
        actionBuyersHasTaken={actionBuyersHasTaken}
        subOptionForbuyers={subOptionForbuyers}
        actionnottaken={actionnottaken}
        purchaseDate={purchaseDate}
        sort_by_credit={sortByCredit}
        verifiedproof={verifiedProof}
        credit_range={creditRange}
        category={category}
      />
    </View>
  );
};
export default Lead;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_WHITE,
  },
  header_image: {
    width: scale(22),
    height: scale(22),
    tintColor: Color.BUTTON_LIGHTBLUE,
    alignSelf: "center",
  },
  flatist_item_view: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: scale(4),
  },
  item_title_text: {
    fontSize: 16,
    fontWeight: "600",
    color: Color.COLOR_BLACK,
  },
  item_simple_text: {
    fontSize: 14,
    color: Color.Grey,
  },
  backgroundImageforVerified: {
    width: 16,
    height: 16,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    tintColor: Color.Grey,
  },
  verifirdImage: {
    width: 12,
    height: 12,
    bottom: -5,
    right: -5,
    position: "absolute",
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
  postAjobButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: Platform.OS === "android" ? 5 : 10,
    borderRadius: 5,
    paddingBottom: Platform.OS === "android" ? 5 : 0,
  },

  // header button
  header_button: {
    flexDirection: "row",
    paddingHorizontal: scale(20),
    justifyContent: "center",
  },
  header_button_touchabale: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    borderBottomWidth: 2,
    paddingVertical: 4,
  },
  openJob_image: {
    height: 20,
    width: 20,
    marginVertical: scale(2),
  },
  header_button_text: {
    fontWeight: "500",
    fontSize: 13,
  },
  credit_text_view: {
    alignSelf: "flex-end",
    backgroundColor: Color.BUTTON_LIGHTBLUE,
    marginTop: scale(12),
    marginRight: scale(12),
    paddingHorizontal: scale(5),
    paddingVertical: scale(2),
    borderRadius: scale(5),
  },
  credit_text: {
    color: Color.BACKGROUND_WHITE,
    fontWeight: "700",
  },
  emptyArray_view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyArray_text: {
    fontSize: 18,
    fontWeight: "600",
    color: Color.Grey,
  },
});
