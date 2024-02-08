import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  TextInput,
  Dimensions,
  ScrollView,
  StatusBar,
  Platform,
} from "react-native";

import SplashScreen from "react-native-splash-screen";

// Json file
import AusCodeLocation from "../../../aus.json";
import countryCodeJson from "../../../countryCode.json";

// constatnt
import Color from "../../theme/Color";
import Images from "../../theme/Images";
import { scale } from "../../theme/Scalling";
import AsyncStorage from "../../helper/AsyncStorage";
import {
  Queston_Array,
  Registration_Array,
  FilterStatusData,
  closeJobReason,
  UnRead,
  ActionBuyersHasTaken,
  SubOptionForbuyers,
  Actionnottaken,
  PurchaseDate,
} from "../../theme/Array";

// Component
import Loader from "../../component/Loader";
import DropDownComp from "../../component/DropDown";
import ModalButtonCom from "../../component/ModalButton";
import BackButtonCom from "../../component/BackButton";
import TextInputComp from "../../component/TextInput";
import RedioButton from "../../component/RadioButton";
import RangeSelect from "../../component/RangeSelect";
import UpdateStatusCom from "../../component/UpdateStatus";
import MyJobListFilterComp from "../../component/MyJobListFilter";
// Redux
import { useDispatch, useSelector } from "react-redux";
import ReduxActions from "../../helper/ReduxActions";
import { ProfessionRequest } from "../../redux/Action/ProfessionAction";

// Library
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import OtpInpute from "@twotalltotems/react-native-otp-input";
import RNOtpVerify from "react-native-otp-verify";
import auth from "@react-native-firebase/auth";
import SimpleHeader from "../../component/SimpleHeader";
import Moment from "moment";

const MyJob = (props) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const dispatch = useDispatch();

  /// ======================================= useSelector ============================================== ///

  const userJobResponse = useSelector((state) => state.GetJobUser);
  const loaderResponse = useSelector((state) => state.loader);
  const updateStatusResponse = useSelector((state) => state.UpdateStatus);
  // const deletAccountResponse = useSelector((state) => state.DeletAccount);
  const otpResponse = useSelector((state) => state.Otp);
  const postAJobResponse = useSelector((state) => state.PostJob);
  const updateProfileResponse = useSelector((state) => state.GetProfileData);

  // const conversationResponse = useSelector((state) => state.Conversation);
  const ipinfoResponse = useSelector((state) => state.Ipinfo);
  const upadateUserInfodResponse = useSelector((state) => state.UpdateUserInfo);

  /// ======================================= state  ============================================== ///

  const [datePicker, setDatePicker] = useState(false);
  const professionResponse = useSelector((state) => state.profession);
  const [selectedProfession, setSelectedProfession] = useState({});
  const [selectedpostAjobProfession, setSelectedpostAjobProfession] = useState(
    {}
  );
  const [postAjobLocation, setPostAjobLocation] = useState("");
  const [filterCategory, setFilterCategory] = useState();
  const [filterStatus, setFilterStatus] = useState("");
  const [updateStatusModal, setUpdateStatusModal] = useState(false);
  const [userJobSave, setUserJobSave] = useState();
  const [searchVal, setSearchVal] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [jobId, setJobId] = useState();
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [openQuestion, setOpenQuestion] = useState(false);
  const [question, setQuestion] = useState();
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [confirm, setConfirm] = useState(null);
  const [openOtpModal, setOpenOtpModal] = useState(false);
  const [userId, setUserId] = useState();
  const [locationData, setLocationData] = useState([]);
  const [questionItem, setQuestionItem] = useState();
  const [openJobDetailsModal, setOpenJobDetailsModal] = useState(false);
  const [openDescriptionModal, setOpenDescriptionModal] = useState(false);
  const [jobDetails, setJobDetails] = useState({});
  const [description, setDescription] = useState("");

  const [somethingSelected, setSomethingSelected] = useState(false);

  const [quotedUserItem, setQuotedUserItem] = useState();
  const [profileDetails, setProfileDetails] = useState(null);
  const [userType, setUserType] = useState();
  const [selectedCountryCode, setSelectedCountryCode] = useState({
    dial_code: "",
    combineCountycode: "",
  });
  const [defaultCountryCode, setDefaultCountryCode] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [openLogoutPopup, setOpenLogoutPopup] = useState(false);
  const [otp, setOtp] = useState("");
  const [rnOtp, setRnOtp] = useState(null);
  const [onAuthStateMyjob, setOnAuthStateMyjob] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [typesofJob, setTypesofJob] = useState("get-jobs-by-user-id");
  const [pageSize, setPageSize] = useState(10);

  // new design state
  const [openFilterModal, setOpenFilterModal] = useState(false);

  // CheckBox
  const [unRead, setUnRead] = useState(UnRead);
  const [actionBuyersHasTaken, setActionBuyersHasTaken] = useState(
    ActionBuyersHasTaken
  );
  const [subOptionForbuyers, setSubOptionForbuyers] = useState(
    SubOptionForbuyers
  );
  const [actionnottaken, setActionnottaken] = useState(Actionnottaken);
  const [purchaseDate, setPurchaseDate] = useState(PurchaseDate);
  ///---------------------------  PostAjob BodyData Array  -----------------------------------///

  let postAjJobObj = {};
  var bodyData;
  let ansArray = [
    {
      answer_radio:
        selectedpostAjobProfession.length !== {}
          ? selectedpostAjobProfession.name
          : null,
      choices: [],

      pushedQuestion: "Category",
      question: "What service do you need?",
      questionType: "radio",
      createdAt: moment().utcOffset("+05:30").format("MMMM do, yyyy H:mma"),
      updatedAt: moment().utcOffset("+05:30").format("MMMM do, yyyy H:mma"),
    },
    {
      answer_radio: postAjobLocation,
      choices: [],

      pushedQuestion: "Location",
      question: "Where do you want the job done?",
      questionType: "radio",
      createdAt: moment().utcOffset("+05:30").format("MMMM do, yyyy H:mma"),
      updatedAt: moment().utcOffset("+05:30").format("MMMM do, yyyy H:mma"),
    },
  ];

  let jobInfoObj = {
    address: postAjobLocation,
    category:
      selectedpostAjobProfession.length !== {}
        ? selectedpostAjobProfession._id
        : "",
    questionAnswers: ansArray,
  };

  /// -------------------- SaveQuetion -------------------- ///

  const SaveQuetion = (item, val, valText) => {
    // console.log("val :::", val);
    // console.log("valText :::", valText);
    let temp = question;
    temp.map((tempItem, tempIndex) => {
      if (tempItem._id === item._id) {
        if (item.questionType === "textarea") {
          if (tempItem._id === item._id) {
            temp[tempIndex] = { ...tempItem, answer_textarea: val };
          }
        } else if (item.questionType === "input") {
          if (tempItem._id === item._id) {
            temp[tempIndex] = { ...tempItem, answer_input: val };
          }
        } else if (item.questionType === "range") {
          if (tempItem._id === item._id) {
            temp[tempIndex] = { ...tempItem, answer_range: val };
          }
        } else if (item.questionType === "mobile") {
          if (tempItem._id === item._id) {
            temp[tempIndex] = { ...tempItem, answer_radio: val };
          }
        } else if (item.questionType === "radio") {
          if (
            item.answer_radio === "Other (Please specify)" ||
            item.answer_radio === "Total" ||
            item.answer_radio === "Hourly Rate"
          ) {
            temp[tempIndex] = {
              ...tempItem,
              answer_radio: val,
              answer_radio_other: valText,
            };
          } else if (item.answer_radio === "Specific date") {
            if (item.answer_radio !== undefined) {
              temp[tempIndex] = {
                ...tempItem,
                answer_radio: val,
                answer_radio_other: valText,
              };
            } else {
              temp[tempIndex] = {
                ...tempItem,
                answer_radio: val,
                answer_radio_other: moment()
                  .utcOffset("+05:30")
                  .format("YYYY-MM-DD"),
              };
            }
          } else {
            if (val === "Specific date") {
              temp[tempIndex] = {
                ...tempItem,
                answer_radio: val,
                answer_radio_other: moment()
                  .utcOffset("+05:30")
                  .format("YYYY-MM-DD"),
              };
            } else {
              temp[tempIndex] = { ...tempItem, answer_radio: val };
            }
          }
        }
      }
    });
    // console.log("temp ::", JSON.stringify(temp));
    setQuestion([...temp]);
  };

  /// *********************** USEEFFECT CALL  *********************** ///

  useEffect(() => {
    if (upadateUserInfodResponse.data !== null) {
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.GetProfileDataRequest());
      setOpenOtpModal(false);
      dispatch(ReduxActions.OtpResponse(null));
      setOtp("");
    }
  }, [upadateUserInfodResponse.data]);

  /// ===================== setDefaultCountryCode  ===================== ///

  useEffect(() => {
    if (ipinfoResponse.data !== null) {
      countryCodeJson.map((item) => {
        if (item.code === ipinfoResponse.data.country) {
          setDefaultCountryCode(item.dial_code);
        }
      });
    } else {
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.IpinfoRequest());
    }
  }, [ipinfoResponse.data]);

  /// ===================== creat Location Array  ===================== ///

  useEffect(() => {
    let location = [];
    AusCodeLocation.map((locItem) => {
      location.push({
        location:
          locItem.postcode + "," + locItem.locality + "," + locItem.territory,
      });
    });
    setLocationData([...location]);
  }, []);

  /// ===================== Profession DropDown Api ===================== ///

  useEffect(() => {
    if (professionResponse.data !== null) {
      setFilterCategory(professionResponse.data);
    } else {
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ProfessionRequest());
    }
  }, [professionResponse.data]);

  /// =====================  Update Profile Api call ===================== ///

  useEffect(() => {
    if (updateProfileResponse.data !== null) {
      AsyncStorage.getItem("userProfile").then((profileData) => {
        setProfileDetails(JSON.parse(profileData));
      });
      AsyncStorage.getItem("userType").then((userType) => {
        setUserType(userType);
      });
    } else {
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.GetProfileDataRequest());
    }
  }, [updateProfileResponse.data]);

  useEffect(() => {
    if (updateStatusResponse.data !== null) {
      if (updateStatusResponse.data === "Status Updated Successfully") {
        // UserJobApicall(typesofJob);
        setSomethingSelected(false);
        setUpdateStatusModal(false);
      }
    }
  }, [updateStatusResponse.data]);

  /// ============================== GetUserJob Api call ============================== ///

  const UserJobApicall = (jobType) => {
    // console.log("jobType :::", jobType);
    setTypesofJob(jobType);
    AsyncStorage.getItem("userId").then((value) => {
      setUserId(value);
      bodyData = {
        userId: value,
        searchStatus: filterStatus !== undefined ? filterStatus : "",
        searchProfession:
          Object.keys(selectedProfession).length !== 0
            ? selectedProfession._id
            : "",
        all: searchVal !== "" ? searchVal : "",
        perPage: pageSize,
      };
      console.log("Get bodyData :::", bodyData);
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.GetUserJobRequest(bodyData, jobType));
      dispatch(ReduxActions.UpdateStatusResponse(null));
    });
  };

  useEffect(() => {
    if (userJobResponse.data !== null && userJobResponse.data !== undefined) {
      setRefreshing(false);
      // console.log("userJobResponse ::", JSON.stringify(userJobResponse.data));
      setUserJobSave(userJobResponse.data);
    } else {
      UserJobApicall("get-jobs-by-user-id");
    }
  }, [userJobResponse.data]);

  useEffect(() => {
    getUserJob();
  }, [searchVal]);

  const getUserJob = () => {
    setOpenFilterModal(false);
    AsyncStorage.getItem("userId").then((value) => {
      setUserId(value);
      bodyData = {
        userId: profileDetails !== null ? profileDetails._id : "",
        searchStatus: filterStatus !== undefined ? filterStatus : "",
        searchProfession:
          Object.keys(selectedProfession).length !== 0
            ? selectedProfession._id
            : "",
        all: searchVal !== "" ? searchVal : "",
        perPage: pageSize,
      };
      console.log("BodyData:::", bodyData);
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.GetUserJobRequest(bodyData, typesofJob));
    });
  };
  /// ===================== postAjob Api call  ===================== ///

  useEffect(() => {
    if (postAJobResponse.data !== null) {
      if (postAJobResponse.data === "NOT SAVE DATA") {
        setSelectedQuestion(selectedQuestion);
      } else {
        setTimeout(() => {
          // UserJobApicall(typesofJob);
          setShowQuestionModal(false),
            setPostAjobLocation(""),
            setSelectedpostAjobProfession({}),
            setOpenQuestion(false);
          setSelectedQuestion(0);
          setOpenOtpModal(false);
          setOtp("");
          setRnOtp(null);
        }, 1000);
      }
      dispatch(ReduxActions.OtpResponse(null));
    }
  }, [postAJobResponse.data]);

  /// *********************** Function Part  *********************** ///

  // ------------------- Range Component ------------------- //

  const 
  plus = (item) => {
    if (item.answer_range !== undefined) {
      if (item.answer_range !== 100) {
        SaveQuetion(item, item.answer_range + 1);
      } else {
        SaveQuetion(item, item.answer_range);
      }
    } else {
      SaveQuetion(item, 1);
    }
  };
  const minus = (item) => {
    if (item.answer_range !== undefined) {
      if (item.answer_range !== 0) {
        SaveQuetion(item, item.answer_range - 1);
      } else {
        SaveQuetion(item, item.answer_range);
      }
    } else {
      SaveQuetion(item, 0);
    }
  };

  // -------------------   quotesData ------------------- //

  // const quotesData = (item) => {
  //   var temp = userJobSave;
  //   temp.map((tempitem, tempindex) => {
  //     if (tempitem._id === item._id) {
  //       if (item.check === true) {
  //         item.check = false;
  //       } else {
  //         temp[tempindex] = { ...tempitem, check: true };
  //       }
  //     }
  //   });
  //   setUserJobSave([...temp]);
  // };

  // ------------------- DATE MODEL ------------------- //

  const showDatePicker = (item) => {
    setQuestionItem(item);
    setDatePicker(true);
  };
  const hideDatePicker = () => {
    setDatePicker(false);
  };
  const handleConfirm = (data) => {
    SaveQuetion(questionItem, questionItem.answer_radio, FormatDate(data));
    hideDatePicker();
  };
  const FormatDate = (data) => {
    let dateTimeString =
      data.getFullYear() + "-" + (data.getMonth() + 1) + "-" + data.getDate();
    return dateTimeString;
  };

  // ------------------- otpVerify ------------------- //

  useEffect(() => {
    // console.log("otpResponse ::::", otpResponse.data);
    if (otpResponse.data !== null) {
      setConfirm(otpResponse.data);
      setOpenOtpModal(true);
    }
  }, [otpResponse.data]);

  const otpVerify = async (response, otp) => {
    let bodyData = {
      value: true,
      field: "isPhoneVerified",
    };
    // console.log("onAuthStateMyjob ::", onAuthStateMyjob);
    if (onAuthStateMyjob) {
      if (rnOtp !== null) {
        // console.log("rnOtp ::", rnOtp);
        // console.log("otp ::", otp);
        if (rnOtp === otp) {
          postAjJobObj = { jobInfo: { ...jobInfoObj, user: userId } };
          // console.log("postAjob Response :::", postAjJobObj);
          dispatch(ReduxActions.loaderAction(true));
          dispatch(ReduxActions.PostJobRequest(postAjJobObj, props.navigation));

          dispatch(ReduxActions.loaderAction(true));
          dispatch(ReduxActions.UpadateUserInfoRequest(bodyData));
        } else {
          dispatch(
            ReduxActions.ToastDisplay({
              type: "negative",
              title: "Invalid code.",
            })
          );
        }
      } else {
        postAjJobObj = { jobInfo: { ...jobInfoObj, user: userId } };
        // console.log("postAjob Response :::", postAjJobObj);
        dispatch(ReduxActions.loaderAction(true));
        dispatch(ReduxActions.PostJobRequest(postAjJobObj, props.navigation));

        dispatch(ReduxActions.loaderAction(true));
        dispatch(ReduxActions.UpadateUserInfoRequest(bodyData));
      }
    } else {
      // console.log("onAuthStateMyjob false elsepart ");
      try {
        const data = await response.confirm(otp);
        // console.log("Otp verified Response Data", JSON.stringify(data));
        postAjJobObj = { jobInfo: { ...jobInfoObj, user: userId } };
        // console.log("postAjob Response :::", postAjJobObj);
        dispatch(ReduxActions.loaderAction(true));
        dispatch(ReduxActions.PostJobRequest(postAjJobObj, props.navigation));

        dispatch(ReduxActions.loaderAction(true));
        dispatch(ReduxActions.UpadateUserInfoRequest(bodyData));
      } catch (err) {
        // console.log("Error ::", err);
        if (err.code == "auth/invalid-verification-code") {
          dispatch(
            ReduxActions.ToastDisplay({
              type: "negative",
              title: "Invalid code.",
            })
          );
        } else if (err.code == "auth/session-expired") {
          dispatch(
            ReduxActions.ToastDisplay({
              type: "negative",
              title:
                "The sms code has expired. Please re-send the verification code to try again.",
            })
          );
        } else {
          dispatch(
            ReduxActions.ToastDisplay({
              type: "negative",
              title: "Account linking error.",
            })
          );
        }
      }
    }
  };

  // ------------------- verifyPhoneNumber ------------------- //

  const verifyPhoneNumber = (item) => {
    // console.log("countrycode.dial_code", selectedCountryCode.dial_code);
    let phRejex;
    if (selectedCountryCode.dial_code !== "") {
      if (selectedCountryCode.dial_code == "+91") {
        phRejex = /^[6-9]\d{9}$/;
      } else if (selectedCountryCode.dial_code == "+61") {
        phRejex = /^[4]\d{8}$/;
      } else if (selectedCountryCode.dial_code == "+64") {
        phRejex = /^[2]\d{8}$/;
      } else {
        phRejex = /^[0-9]/;
      }
    } else {
      if (defaultCountryCode == "+91") {
        phRejex = /^[6-9]\d{9}$/;
      } else if (defaultCountryCode == "+61") {
        phRejex = /^[4]\d{8}$/;
      } else if (defaultCountryCode == "+64") {
        phRejex = /^[2]\d{8}$/;
      } else {
        phRejex = /^[0-9]/;
      }
    }

    // console.log(
    //   "phRejex.text(item.answer_radio)",
    //   phRejex.test(item.answer_radio)
    // );

    if (phRejex.test(item.answer_radio)) {
      setOnAuthStateMyjob(false);
      setOtp("");
      setRnOtp(null);

      let phoneNumber =
        selectedCountryCode.dial_code !== ""
          ? selectedCountryCode.dial_code + "-" + item.answer_radio
          : defaultCountryCode !== undefined
          ? defaultCountryCode + "-" + item.answer_radio
          : null;
      // console.log("Phonen number ::", phoneNumber);
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.OtpRequest(phoneNumber, props.navigation));
    } else {
      dispatch(
        ReduxActions.ToastDisplay({
          type: "negative",
          title: "Please enter a proper phone number format",
        })
      );
    }

    // console.log("selectedCountryCode::", selectedCountryCode.dial_code);
    // console.log("item.answer_radio::", item.answer_radio);
    // console.log("defaultCountryCode::", defaultCountryCode);
  };

  RNOtpVerify.addListener((val) => {
    try {
      // console.log("val ===> ", val);
      if (val !== "Timeout Error.") {
        const messageArray = val.split("\n");
        const autoOtp = messageArray[0].split(" ")[0];
        // console.log("otpResponse.data ===> ", otpResponse.data);
        setOtp(autoOtp);
        setRnOtp(autoOtp);
      }
    } catch (e) {
      // console.log("Catch part", e);
    }
  });

  function onAuthStateChanged(user) {
    // console.log("befor user :: ", JSON.stringify(user));
    setOnAuthStateMyjob(true);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // ------------------- openQuestionModal ------------------- //

  const openQuestionModal = () => {
    dispatch(ReduxActions.PostJobResponse(null));
    // console.log("openQuestionModal :::", profileDetails);

    setOpenQuestion(true);
    let combineArray = [];
    filterCategory.map((categoryItem) => {
      if (categoryItem._id === selectedpostAjobProfession._id) {
        if (categoryItem.categories.length !== 0) {
          if (profileDetails.isPhoneVerified === false) {
            Registration_Array.map((regItem) => {
              if (regItem._id === 104) {
                combineArray = [
                  ...categoryItem.categories[0].questions,
                  regItem,
                ];
              }
            });
          } else {
            combineArray = [...categoryItem.categories[0].questions];
          }
        } else {
          if (profileDetails.isPhoneVerified === false) {
            Registration_Array.map((regItem) => {
              if (regItem._id === 104) {
                combineArray = [...Queston_Array, regItem];
              }
            });
          } else {
            combineArray = [...Queston_Array];
          }
        }
      }
    });
    // console.log("combineArray :::", combineArray);
    setQuestion(combineArray);
  };

  // ------------------- NextFunction ------------------- //

  const nextFunction = (item, index) => {
    // console.log("item._id");
    if (item._id !== 104) {
      if (question.length - 1 === index) {
        let tempJobinfo = question;
        tempJobinfo.map((jobItem) => {
          if (jobItem._id !== 104) {
            ansArray.push(jobItem);
          }
        });
        postAjJobObj = { jobInfo: { ...jobInfoObj, user: userId } };
        dispatch(ReduxActions.loaderAction(true));
        dispatch(ReduxActions.PostJobRequest(postAjJobObj, props.navigation));
      } else {
        setSelectedQuestion(selectedQuestion + 1);
      }
      // console.log("question :::", question.length);
      // console.log("index :::", index);
    } else {
      let tempJobinfo = question;
      tempJobinfo.map((jobItem) => {
        if (jobItem._id !== 104) {
          ansArray.push(jobItem);
        }
      });
      if (!openOtpModal) {
        if (item.answer_radio.length > 7) {
          postAjJobObj = { jobInfo: { ...jobInfoObj, user: userId } };
          dispatch(ReduxActions.loaderAction(true));
          dispatch(ReduxActions.PostJobRequest(postAjJobObj, props.navigation));
        } else {
          dispatch(
            ReduxActions.ToastDisplay({
              type: "negative",
              title: "Please enter a proper phone number format",
            })
          );
          setSelectedQuestion(selectedQuestion);
        }
      } else {
        otpVerify(confirm, otp);
      }
    }
  };

  // ------------------- backFunction ------------------- //

  const backFunction = (item) => {
    setOtp("");
    if (item._id !== 104) {
      setSelectedQuestion(selectedQuestion - 1);
    } else {
      if (openOtpModal) {
        setOpenOtpModal(false);
        setSelectedQuestion(selectedQuestion);
      } else {
        setSelectedQuestion(selectedQuestion - 1);
      }
    }
  };

  // ------------------- closeIconCall ------------------- //

  const closeIconCall = () => {
    // console.log("AnswerArray ====>", ansArray);
    if (openQuestion) {
      let tempJobinfo = question;
      tempJobinfo.map((jobItem) => {
        if (jobItem._id !== 104) {
          ansArray.push(jobItem);
        }
      });
      if (selectedQuestion >= question.length - 1) {
        postAjJobObj = { jobInfo: { ...jobInfoObj, user: userId } };
        // console.log("postAjJobObj ====>", JSON.stringify(postAjJobObj));
        dispatch(ReduxActions.loaderAction(true));
        dispatch(ReduxActions.PostJobRequest(postAjJobObj, props.navigation));
      } else {
        setShowQuestionModal(false),
          setOpenOtpModal(false),
          setOpenQuestion(false);
        setPostAjobLocation(""),
          setSelectedpostAjobProfession({}),
          setSelectedQuestion(0),
          dispatch(ReduxActions.OtpResponse(null));
        setOtp("");
      }
    } else {
      setShowQuestionModal(false),
        dispatch(ReduxActions.OtpResponse(null)),
        setPostAjobLocation(""),
        setSelectedpostAjobProfession({});
    }
  };

  // ------------------- skipButton ------------------- //

  const skipButton = () => {
    let tempJobinfo = question;
    tempJobinfo.map((jobItem) => {
      if (jobItem._id !== 104) {
        ansArray.push(jobItem);
      }
    });
    postAjJobObj = { jobInfo: { ...jobInfoObj, user: userId } };
    // console.log("postAjob for skip ::", postAjJobObj);
    dispatch(ReduxActions.loaderAction(true));
    dispatch(ReduxActions.PostJobRequest(postAjJobObj, props.navigation));
  };

  // ------------------- editDescription ------------------- //

  const editDescription = (item) => {
    if (item.answer_textarea !== undefined) {
      // console.log("AnswerTextArea ====>", item.answer_textarea);
      setDescription(item.answer_textarea);
    } else if (item.answer_input !== undefined) {
      setDescription(item.answer_input);
    }
    setOpenDescriptionModal(true);
  };

  // ------------------- updateDescriptiom ------------------- //

  const updateDescriptiom = () => {
    // console.log(" ", JSON.stringify(jobDetails));
    let tempDescription = jobDetails;
    // console.log("tempDescription ===>", tempDescription);

    tempDescription.questionAnswers.map((desItem, desIndex) => {
      if (desItem.questionType === "textarea") {
        if (desItem.answer_textarea !== undefined) {
          // console.log("Edit =======>", desItem.questionType.answer_textarea);
          desItem.answer_textarea = description;
        } else {
          tempDescription[desIndex] = {
            ...desItem,
            answer_textarea: description,
          };
        }
        // console.log("temp data Update Job description :::", desItem);
      } else if (desItem.questionType === "input") {
        if (desItem.answer_input !== undefined) {
          // console.log("Edit =======>", desItem.questionType.answer_textarea);
          desItem.answer_input = description;
        } else {
          tempDescription[desIndex] = {
            ...desItem,
            answer_input: description,
          };
        }
      }
      // console.log("Update Data ========>", JSON.stringify(tempDescription));

      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.UpdateDescriptionRequet(tempDescription));
    });
  };

  // ------------------- onRefresh ------------------- //

  const onRefresh = () => {
    setRefreshing(true);
    AsyncStorage.getItem("userId").then((value) => {
      setUserId(value);
      bodyData = {
        userId: value,
        searchStatus: filterStatus !== undefined ? filterStatus : "",
        searchProfession:
          Object.keys(selectedProfession).length !== 0
            ? selectedProfession._id
            : "",
        all: searchVal !== "" ? searchVal : "",
        perPage: pageSize,
      };
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.GetUserJobRequest(bodyData, typesofJob));
      dispatch(ReduxActions.UpdateStatusResponse(null));
    });
  };

  const pagination = () => {
    AsyncStorage.getItem("userId").then((value) => {
      setUserId(value);
      bodyData = {
        userId: value,
        searchStatus: filterStatus !== undefined ? filterStatus : "",
        searchProfession:
          Object.keys(selectedProfession).length !== 0
            ? selectedProfession._id
            : "",
        all: searchVal !== "" ? searchVal : "",
        perPage: pageSize + 5,
      };
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.GetUserJobRequest(bodyData, typesofJob));
      dispatch(ReduxActions.UpdateStatusResponse(null));
      setPageSize(pageSize + 5);
    });
  };

  // new Design Function

  const CheckBox = (val, key) => {
    if (key === "UnRead") {
      let temp = unRead;
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
        } else {
          if (tempItem.check !== undefined) {
            tempItem.check = false;
          }
        }
      });
      setUnRead([...temp]);
    } else if (key === "actionBuyersHasTaken") {
      let temp = actionBuyersHasTaken;
      temp.map((tempItem, tempIndex) => {
        if (tempItem.id === val.id) {
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
      setActionBuyersHasTaken([...temp]);
    } else if (key === "subOptionForbuyers") {
      let temp = subOptionForbuyers;
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
      setSubOptionForbuyers([...temp]);
    } else if (key === "actionnottaken") {
      let temp = actionnottaken;
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
      setActionnottaken([...temp]);
    } else if (key === "purchaseDate") {
      let temp = purchaseDate;
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
      setPurchaseDate([...temp]);
    }
  };

  /// reset Filter

  const reset_filter = () => {
    setSelectedProfession({});
    setFilterStatus("");
    let temp_unread = unRead;
    let temp_actionBuyersHasTaken = actionBuyersHasTaken;
    let temp_subOptionForbuyers = subOptionForbuyers;
    let temp_actionnottaken = actionnottaken;
    let temp_purchaseDate = purchaseDate;
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

  // update Status

  const updateStatusApicall = () => {
    dispatch(ReduxActions.loaderAction(true));
    dispatch(ReduxActions.UpdateStatusRequest(jobId, updateStatus, ""));
    // dispatch(ReduxActions.GetUserJobResponse(null));
  };

  // ======================================= return ============================================== //
  return (
    <View
      style={[
        styles.container,
        {
          flex: openJobDetailsModal === false ? 1 : null,
        },
      ]}
    >
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle="dark-content"
      />
      <SimpleHeader title={"My Jobs"} rightbutton={false} />

      <View style={styles.searchbar_main_view}>
        <View style={styles.searchBarView}>
          <TextInput
            placeholder="Search"
            style={styles.search_textInpute}
            onChangeText={(val) => setSearchVal(val)}
            placeholderTextColor={Color.Grey}
          />
          <TouchableOpacity style={{ flex: 0.3, alignItems: "flex-end" }}>
            <Image source={Images.Search} style={styles.searchImage} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.postAjobButton, { marginLeft: scale(5) }]}
          onPress={() => setShowQuestionModal(true)}
        >
          <Image
            source={Images.CreatJob}
            style={[
              styles.searchbar_icon,
              {
                tintColor: Color.Light_Green,
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.postAjobButton}
          onPress={() => setOpenFilterModal(true)}
        >
          <Image
            source={Images.Filter}
            style={[
              styles.searchbar_icon,
              {
                tintColor: Color.BUTTON_LIGHTBLUE,
              },
            ]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.header_button}>
        <TouchableOpacity
          style={[
            styles.header_button_touchabale,
            {
              borderBottomColor:
                typesofJob === "get-jobs-by-user-id"
                  ? Color.BUTTON_LIGHTBLUE
                  : Color.BACKGROUND_WHITE,
            },
          ]}
          onPress={() => UserJobApicall("get-jobs-by-user-id")}
        >
          <Image
            source={Images.OpenJob}
            style={[
              styles.openJob_image,
              {
                tintColor:
                  typesofJob === "get-jobs-by-user-id"
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
                  typesofJob === "get-jobs-by-user-id"
                    ? Color.BUTTON_LIGHTBLUE
                    : Color.COLOR_BLACK,
              },
            ]}
          >
            Open Jobs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.header_button_touchabale,
            {
              borderBottomColor:
                typesofJob === "get-hired-jobs-by-user-id"
                  ? Color.BUTTON_LIGHTBLUE
                  : Color.BACKGROUND_WHITE,
            },
          ]}
          onPress={() => UserJobApicall("get-hired-jobs-by-user-id")}
        >
          <Image
            source={Images.HandShack}
            style={[
              styles.openJob_image,
              {
                tintColor:
                  typesofJob === "get-hired-jobs-by-user-id"
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
                  typesofJob === "get-hired-jobs-by-user-id"
                    ? Color.BUTTON_LIGHTBLUE
                    : Color.COLOR_BLACK,
              },
            ]}
          >
            Hired Jobs
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={userJobSave}
        onRefresh={onRefresh}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        onEndReached={pagination}
        renderItem={({ item, index }) => {
          // console.log("item :::", item);
          return (
            <TouchableOpacity
              style={styles.footerFlatlistView}
              onPress={() =>
                props.navigation.navigate("JobDetails", { data: item })
              }
            >
              <View style={styles.mainView}>
                <View
                  style={[styles.twoPartView, { justifyContent: "flex-start" }]}
                >
                  <Text style={styles.title_text}>{item.user[0].userName}</Text>
                </View>
                <View
                  style={[styles.twoPartView, { justifyContent: "flex-end" }]}
                >
                  <Text style={[styles.details_text, { textAlign: "right" }]}>
                    {Moment.utc(item.createdAt)
                      .local()
                      .startOf("seconds")
                      .fromNow()}
                  </Text>
                </View>
              </View>
              <View style={[styles.mainView, { alignItems: "flex-start" }]}>
                <View
                  style={[
                    styles.twoPartView,
                    {
                      justifyContent: "flex-start",
                      flexDirection: "row",
                      marginLeft: scale(8),
                    },
                  ]}
                >
                  <View>
                    <Image
                      source={Images.MobilePhone}
                      style={[styles.backgroundImageforVerified]}
                    />
                    {item.user[0].isPhoneVerified !== false ? (
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
                    {item.user[0].isEmailVerified !== false ? (
                      <Image
                        source={Images.Verifiedcredential}
                        style={styles.verifirdImage}
                      />
                    ) : null}
                  </View>
                </View>
                <View
                  style={[styles.twoPartView, { justifyContent: "flex-end" }]}
                >
                  <Text style={[styles.details_text, { textAlign: "right" }]}>
                    {item.address.length > 15 &&
                      item.address.slice(0, 15) + "..."}
                  </Text>
                </View>
              </View>
              <View style={styles.mainView}>
                <View
                  style={[
                    styles.twoPartView,
                    { justifyContent: "flex-start", marginLeft: scale(7) },
                  ]}
                >
                  <Text style={[styles.details_text, { textAlign: "right" }]}>
                    {item.questionAnswers[0].answer_radio}
                  </Text>
                </View>
              </View>
              {item.questionAnswers.map((mapItem) => {
                if (mapItem.pushedQuestion === "Description") {
                  return (
                    <View style={styles.mainView}>
                      <View
                        style={[
                          styles.twoPartView,
                          {
                            justifyContent: "flex-start",
                            marginLeft: scale(7),
                          },
                        ]}
                      >
                        <Text
                          style={[styles.details_text, { textAlign: "right" }]}
                        >
                          {mapItem.answer_textarea !== undefined
                            ? mapItem.answer_textarea.slice(0, 15) + "..."
                            : ""}
                        </Text>
                      </View>
                    </View>
                  );
                }
              })}
              {/* <View style={styles.mainView}>
                <View
                  style={[styles.twoPartView, { justifyContent: "flex-start" }]}
                >
                  <Text
                    style={[
                      styles.details_text,
                      {
                        fontSize: scale(16),
                        textAlign: "right",
                        fontWeight: "600",
                        marginLeft: scale(7),
                      },
                    ]}
                  >
                    {item.user[0].credits} credits
                  </Text>
                </View>
              </View> */}

              <View style={styles.flatlistFooterBittonView}>
                <TouchableOpacity
                  onPress={() => {
                    setUpdateStatusModal(true), setJobId(item._id);
                  }}
                  style={[
                    styles.flatlistFooterUpdateStatus.alignItems,
                    { marginLeft: scale(8) },
                  ]}
                >
                  <Text
                    style={[
                      styles.blueText,
                      {
                        fontSize: 14,
                        textAlign: "center",
                        borderBottomColor: Color.BUTTON_LIGHTBLUE,
                      },
                    ]}
                  >
                    Update Job Status
                  </Text>
                </TouchableOpacity>
                <View
                  // onPress={() => quotesData(item)}
                  style={styles.flatlistFooterQuotedUser}
                >
                  <Text
                    style={{
                      color: Color.Grey,
                      fontSize: 14,
                    }}
                  >
                    No of Quotes :
                  </Text>
                  <Text
                    style={{
                      color: Color.BUTTON_LIGHTBLUE,
                      fontSize: 14,
                    }}
                  >
                    {item.quotedUsers.length}/{item.quoteLimit}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <Loader val={loaderResponse.loader} />
      {/* *****  PostAJob Question  Modal ***** */}
      <Modal
        visible={showQuestionModal}
        transparent={true}
        onRequestClose={() => {
          setShowQuestionModal(false),
            setPostAjobLocation(""),
            setSelectedpostAjobProfession({}),
            setOpenQuestion(false),
            setSelectedQuestion(0),
            setOpenOtpModal(false),
            dispatch(ReduxActions.OtpResponse(null));
        }}
        animationType="slide"
      >
        <Image source={Images.Black} style={styles.modalBackground} />
        {/* <View style={{ flex: 1 }}> */}
        <View style={styles.modalContainer}>
          {openQuestion === false ? (
            <View style={styles.postAjobFirstPageView}>
              <View style={styles.postAjobHeader}>
                <Text
                  style={[
                    styles.headerText,
                    {
                      fontSize: 20,
                      fontWeight: "500",
                      color: Color.BACKGROUND_WHITE,
                    },
                  ]}
                >
                  Where to-do gets done
                </Text>
                <TouchableOpacity onPress={() => closeIconCall()}>
                  <Image
                    source={Images.ViewClose}
                    style={{
                      width: scale(23),
                      height: scale(23),
                      tintColor: Color.BACKGROUND_WHITE,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={[
                  styles.headerText,
                  {
                    fontSize: scale(17),
                    marginTop: scale(12),
                    marginHorizontal: scale(12),
                  },
                ]}
              >
                What service do you need?
              </Text>
              <DropDownComp
                selectedValue={selectedpostAjobProfession.name}
                placeholder="select category"
                data={filterCategory}
                labelField={"name"}
                valueField={"name"}
                dropdown={styles.dropdown2}
                selected={(item) => {
                  setSelectedpostAjobProfession({
                    name: item.name,
                    _id: item._id,
                  });
                }}
              />
              <Text
                style={[
                  styles.headerText,
                  {
                    fontSize: scale(17),
                    marginTop: scale(12),
                    marginHorizontal: scale(12),
                  },
                ]}
              >
                What do you need the service?
              </Text>
              <DropDownComp
                selectedValue={postAjobLocation}
                placeholder="select location"
                data={locationData}
                labelField={"location"}
                valueField={"location"}
                dropdown={styles.dropdown2}
                selected={(item) => setPostAjobLocation(item.location)}
              />

              <View
                style={{
                  alignItems: "flex-start",
                  margin: scale(12),
                  marginTop: scale(20),
                }}
              >
                <ModalButtonCom
                  onPressButoon={() => openQuestionModal()}
                  disabled={
                    postAjobLocation !== "" &&
                    selectedpostAjobProfession !== undefined
                      ? false
                      : true
                  }
                  selectedAnswer={
                    postAjobLocation !== "" &&
                    selectedpostAjobProfession !== undefined
                      ? true
                      : false
                  }
                  text={"Get free Qoutes"}
                />
              </View>
            </View>
          ) : (
            <>
              <View style={styles.modalHeaderView}>
                <Text style={styles.modalheaderText}>
                  FAQ's For {selectedpostAjobProfession.name}
                </Text>
                <TouchableOpacity
                  // style={{
                  //   backgroundColor: Color.LIGHT_GREY,
                  //   padding: scale(5),
                  //   borderRadius: scale(3),
                  //   alignSelf: "center",
                  //   justifyContent: "center",
                  // }}
                  onPress={() => closeIconCall()}
                >
                  <Image
                    source={Images.ViewClose}
                    style={{
                      width: scale(23),
                      height: scale(23),
                      tintColor: Color.BACKGROUND_WHITE,
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View>
                {question !== undefined ? (
                  <FlatList
                    data={question}
                    renderItem={({ item, index }) => {
                      return (
                        <View style={{ flex: 1 }}>
                          {selectedQuestion === index ? (
                            <View style={{ paddingLeft: scale(10) }}>
                              {!openOtpModal ? (
                                <Text style={styles.questionTitle}>
                                  {item.question}
                                </Text>
                              ) : null}
                              <View style={{ marginBottom: scale(10) }}>
                                {item.questionType === "radio" ? (
                                  <ScrollView
                                    style={{
                                      height:
                                        item.choices.length > 3
                                          ? Dimensions.get("window").height / 4
                                          : null,
                                    }}
                                  >
                                    {item.choices.map((citem, cindex) => {
                                      return (
                                        <View>
                                          <RedioButton
                                            answer_radio={item.answer_radio}
                                            choiceoption={citem.option}
                                            choiceitem={citem.option}
                                            selectRadioButton={() => {
                                              if (item.answer_radio > 0) {
                                                SaveQuetion(item, citem.option);
                                              } else {
                                                SaveQuetion(item, citem.option);
                                              }
                                            }}
                                          />
                                          {item.answer_radio !== undefined ? (
                                            item.answer_radio ===
                                            citem.option ? (
                                              item.answer_radio ===
                                              "Specific date" ? (
                                                <View
                                                  style={styles.showdateview}
                                                >
                                                  <Text>Select Date</Text>
                                                  <TouchableOpacity
                                                    onPress={() =>
                                                      showDatePicker(item)
                                                    }
                                                    style={styles.dateview}
                                                  >
                                                    <Text
                                                      style={styles.datetext}
                                                    >
                                                      {item.answer_radio_other !==
                                                      undefined
                                                        ? item.answer_radio_other
                                                        : null}
                                                    </Text>
                                                    <Image
                                                      source={Images.Down}
                                                      style={styles.dateimage}
                                                    />
                                                  </TouchableOpacity>
                                                  <DateTimePickerModal
                                                    isVisible={datePicker}
                                                    mode="date"
                                                    onConfirm={handleConfirm}
                                                    onCancel={hideDatePicker}
                                                  />
                                                </View>
                                              ) : item.answer_radio ===
                                                  "Total" ||
                                                item.answer_radio ===
                                                  "Hourly Rate" ? (
                                                <View style={styles.inputview}>
                                                  <View
                                                    style={{
                                                      marginTop: -16,
                                                      paddingLeft: scale(5),
                                                    }}
                                                  >
                                                    <Text
                                                      style={{
                                                        fontSize: 10,
                                                        backgroundColor:
                                                          Color.LIGHT_GREY,
                                                        borderRadius: 5,
                                                        paddingHorizontal: 2,
                                                      }}
                                                    >
                                                      Amount
                                                    </Text>
                                                    <Image
                                                      source={Images.Dollar}
                                                      style={styles.mainImage}
                                                    />
                                                  </View>
                                                  <TextInput
                                                    style={[
                                                      styles.textInput,
                                                      { borderWidth: 0 },
                                                    ]}
                                                    value={
                                                      item.answer_radio_other
                                                    }
                                                    keyboardType={"numeric"}
                                                    onChangeText={(valText) =>
                                                      SaveQuetion(
                                                        item,
                                                        item.answer_radio,
                                                        valText
                                                      )
                                                    }
                                                  />
                                                </View>
                                              ) : item.answer_radio ===
                                                "Other (Please specify)" ? (
                                                <TextInputComp
                                                  line={false}
                                                  value={
                                                    item.answer_radio_other
                                                  }
                                                  textInputeStyle={
                                                    styles.textInput
                                                  }
                                                  onChangeText={(valText) =>
                                                    SaveQuetion(
                                                      item,
                                                      item.answer_radio,
                                                      valText
                                                    )
                                                  }
                                                />
                                              ) : null
                                            ) : null
                                          ) : null}
                                        </View>
                                      );
                                    })}
                                  </ScrollView>
                                ) : null}

                                {item.questionType === "textarea" ? (
                                  <TextInputComp
                                    line={false}
                                    value={item.answer_textarea}
                                    textInputeStyle={styles.textInput}
                                    onChangeText={(val) =>
                                      SaveQuetion(item, val)
                                    }
                                  />
                                ) : null}
                                {item.questionType === "input" ? (
                                  <TextInputComp
                                    line={false}
                                    value={item.answer_input}
                                    textInputeStyle={styles.textInput}
                                    onChangeText={(val) =>
                                      SaveQuetion(item, val)
                                    }
                                  />
                                ) : null}

                                {item.questionType === "range" ? (
                                  <RangeSelect
                                    selectRange={(val) =>
                                      SaveQuetion(item, val)
                                    }
                                    range={
                                      item.answer_range !== undefined
                                        ? item.answer_range
                                        : 0
                                    }
                                    minus={() => minus(item)}
                                    plus={() => plus(item)}
                                  />
                                ) : null}
                                {item.questionType === "mobile" ? (
                                  <View>
                                    {!openOtpModal ? (
                                      // <View>
                                      <>
                                        <View style={{ flexDirection: "row" }}>
                                          <View
                                            style={{
                                              flex: 1,
                                              justifyContent: "center",
                                            }}
                                          >
                                            <DropDownComp
                                              selectedValue={
                                                selectedCountryCode.combineCountycode
                                              }
                                              placeholder={
                                                defaultCountryCode !== undefined
                                                  ? defaultCountryCode
                                                  : null
                                              }
                                              data={countryCodeJson}
                                              labelField={"combineCountycode"}
                                              valueField={"combineCountycode"}
                                              dropdown={{
                                                borderBottomColor:
                                                  Color.BorderColor,
                                                marginTop: scale(5),
                                                padding: scale(4),
                                                borderBottomWidth: 1,
                                              }}
                                              selected={(item) =>
                                                setSelectedCountryCode({
                                                  dial_code: item.dial_code,
                                                  combineCountycode:
                                                    item.combineCountycode,
                                                })
                                              }
                                              key={"countryCode"}
                                            />
                                          </View>
                                          <View style={{ flex: 3 }}>
                                            <TextInputComp
                                              line={false}
                                              value={item.answer_radio}
                                              placeholder={"Phone Number"}
                                              textInputeStyle={[
                                                styles.textInput,
                                                {
                                                  borderWidth: 0,
                                                  borderBottomWidth: 1,
                                                },
                                              ]}
                                              keyboardType={"phone-pad"}
                                              onChangeText={(val) => {
                                                setMobileNumber(val);
                                                SaveQuetion(
                                                  item,
                                                  val.replace(/[^0-9]/g, "")
                                                );
                                              }}
                                            />
                                          </View>
                                        </View>
                                        <View
                                          style={{
                                            marginRight: scale(160),
                                            marginTop: scale(10),
                                          }}
                                        >
                                          <ModalButtonCom
                                            selectedAnswer={
                                              item.answer_radio !== undefined
                                                ? item.answer_radio !== ""
                                                  ? item.answer_radio.length > 7
                                                    ? true
                                                    : false
                                                  : false
                                                : false
                                            }
                                            onPressButoon={() =>
                                              verifyPhoneNumber(item)
                                            }
                                            VerifyButton={false}
                                            disabled={
                                              item.answer_radio !== undefined
                                                ? item.answer_radio !== ""
                                                  ? item.answer_radio.length > 7
                                                    ? false
                                                    : true
                                                  : true
                                                : true
                                            }
                                            text={"Verify Phone"}
                                          />
                                        </View>
                                      </>
                                    ) : (
                                      // </View>
                                      <View>
                                        <Text
                                          style={[
                                            styles.otpText,
                                            {
                                              fontSize: scale(18),
                                            },
                                          ]}
                                        >
                                          Verification Code
                                        </Text>
                                        <Text
                                          style={[
                                            styles.otpText,
                                            ,
                                            {
                                              fontSize: scale(15),
                                            },
                                          ]}
                                        >
                                          Please enter the OTP sent on your
                                          registered phone number.
                                        </Text>
                                        <OtpInpute
                                          pinCount={6}
                                          code={otp}
                                          onCodeChanged={(code) => setOtp(code)}
                                          style={styles.InputSubContainer}
                                          autoFocusOnLoad={false}
                                          codeInputFieldStyle={
                                            styles.underlineStyleBase
                                          }
                                          codeInputHighlightStyle={
                                            styles.underlineStyleHighLighted
                                          }
                                          keyboardType={"number-pad"}
                                        />
                                      </View>
                                    )}
                                  </View>
                                ) : null}
                              </View>
                            </View>
                          ) : null}
                        </View>
                      );
                    }}
                  />
                ) : null}
              </View>
              <View style={styles.lineView}></View>
              {/* *****  Button View ***** */}
              <View>
                {question !== undefined ? (
                  <FlatList
                    data={question}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                      return (
                        <View style={{ flex: 1 }}>
                          {selectedQuestion === index ? (
                            <View style={styles.modalButtonView}>
                              {item._id === 104 ? (
                                !openOtpModal ? (
                                  <View
                                    style={{
                                      marginHorizontal: scale(10),
                                      flex: 1,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        color: Color.BLUE_DRESS,
                                      }}
                                      onPress={() => skipButton()}
                                    >
                                      Skip
                                    </Text>
                                  </View>
                                ) : null
                              ) : null}

                              <BackButtonCom
                                selectedQuestion={selectedQuestion}
                                backFunction={() => backFunction(item)}
                                buttonText={"Back"}
                              />
                              <ModalButtonCom
                                onPressButoon={() => nextFunction(item, index)}
                                text={
                                  profileDetails !== null
                                    ? profileDetails.isPhoneVerified === false
                                      ? item._id === 104
                                        ? openOtpModal
                                          ? "Submit"
                                          : "Submit"
                                        : "Next"
                                      : index === question.length - 1
                                      ? "Submit"
                                      : "Next"
                                    : null
                                }
                                disabled={
                                  !openOtpModal
                                    ? item._id === 104
                                      ? item.answer_radio !== undefined &&
                                        item.answer_radio !== "" &&
                                        item.answer_radio.length > 7
                                        ? false
                                        : true
                                      : item.questionType === "textarea"
                                      ? item.answer_textarea !== undefined &&
                                        item.answer_textarea !== ""
                                        ? false
                                        : true
                                      : item.questionType === "range"
                                      ? item.answer_range !== undefined &&
                                        item.answer_radio !== ""
                                        ? false
                                        : true
                                      : item.questionType === "input"
                                      ? item.answer_input !== undefined &&
                                        item.answer_input !== ""
                                        ? false
                                        : true
                                      : item.questionType === "radio"
                                      ? item.answer_radio !== undefined &&
                                        item.answer_radio !== ""
                                        ? item.answer_radio ===
                                            "Other (Please specify)" ||
                                          item.answer_radio ===
                                            "Specific date" ||
                                          item.answer_radio === "Total" ||
                                          item.answer_radio === "Hourly Rate"
                                          ? item.answer_radio_other !==
                                              undefined &&
                                            item.answer_radio_other !== ""
                                            ? false
                                            : true
                                          : false
                                        : true
                                      : true
                                    : otp.length === 6
                                    ? false
                                    : true
                                }
                                selectedAnswer={
                                  !openOtpModal
                                    ? item._id === 104
                                      ? item.answer_radio !== undefined &&
                                        item.answer_radio !== "" &&
                                        item.answer_radio.length > 7
                                        ? true
                                        : false
                                      : item.questionType === "textarea"
                                      ? item.answer_textarea !== undefined &&
                                        item.answer_textarea !== ""
                                        ? true
                                        : false
                                      : item.questionType === "range"
                                      ? item.answer_range !== undefined &&
                                        item.answer_radio !== ""
                                        ? true
                                        : false
                                      : item.questionType === "input"
                                      ? item.answer_input !== undefined &&
                                        item.answer_input !== ""
                                        ? true
                                        : false
                                      : item.questionType === "radio"
                                      ? item.answer_radio !== undefined &&
                                        item.answer_radio !== ""
                                        ? item.answer_radio ===
                                            "Other (Please specify)" ||
                                          item.answer_radio ===
                                            "Specific date" ||
                                          item.answer_radio === "Total" ||
                                          item.answer_radio === "Hourly Rate"
                                          ? item.answer_radio_other !==
                                              undefined &&
                                            item.answer_radio_other !== ""
                                            ? true
                                            : false
                                          : true
                                        : false
                                      : false
                                    : otp.length === 6
                                    ? true
                                    : false
                                }
                              />
                            </View>
                          ) : null}
                        </View>
                      );
                    }}
                  />
                ) : null}
              </View>
            </>
          )}
        </View>
        {/* </View> */}
        <Loader val={loaderResponse.loader} />
      </Modal>
      {/* *****  Component ***** */}

      <UpdateStatusCom
        headerText="Update job status"
        buttonText="Submit"
        labelField="status"
        valueField="status"
        loaderValue={loaderResponse.loader}
        InstructionText="Please select a Status"
        visibale={updateStatusModal}
        data={FilterStatusData}
        selectedValue={updateStatus}
        closeModal={() => {
          setUpdateStatusModal(false), setUpdateStatus("");
        }}
        selectValue={(val) => setUpdateStatus(val)}
        functionCall={() => updateStatusApicall()}
        somethingselect={false}
      />
      {openJobDetailsModal ? (
        <>
          <Image source={Images.Black} style={styles.blackBackground}></Image>

          <View
            style={[
              styles.menuItemModal,
              { marginTop: Dimensions.get("window").height / 4 },
            ]}
          >
            <JobDetailsModalComp
              jobDetails={jobDetails}
              openDescriptionModal={openDescriptionModal}
              CloseModal={() => {
                setOpenJobDetailsModal(false),
                  setOpenDescriptionModal(false),
                  setDescription("");
              }}
              editDescription={(item) => editDescription(item)}
              description={description}
              Description={(val) => {
                // console.log("values :::", val), setDescription(val);
              }}
              CloeDescriptionModal={() => setOpenDescriptionModal(false)}
              updateDescriptiom={() => updateDescriptiom()}
              loaderResponse={loaderResponse.loader}
            />
          </View>
        </>
      ) : null}

      <MyJobListFilterComp
        profileDetails={profileDetails !== null ? profileDetails : null}
        visibale={openFilterModal}
        filterCategorydata={filterCategory}
        selectProfession={(item) =>
          setSelectedProfession({ name: item.name, _id: item._id })
        }
        selectedProfessionValue={selectedProfession.name}
        selectedfilterStatusvalue={filterStatus}
        FilterStatusData={FilterStatusData}
        selectFilterstatus={(item) => setFilterStatus(item)}
        closeFilter={() => setOpenFilterModal(false)}
        applyFilter={() => getUserJob()}
        cancelProfession={() => setSelectedProfession({})}
        cancelFilterStatus={() => setFilterStatus("")}
        unreadData={unRead}
        selectCheckBox={(val, key) => CheckBox(val, key)}
        actionBuyersHasTaken={actionBuyersHasTaken}
        subOptionForbuyers={subOptionForbuyers}
        actionnottaken={actionnottaken}
        purchaseDate={purchaseDate}
        reset={() => reset_filter()}
      />
    </View>
  );
};
export default MyJob;

const styles = StyleSheet.create({
  // Container
  container: {
    backgroundColor: Color.BACKGROUND_WHITE,
  },

  // new Design

  mainView: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: scale(7),
    padding: scale(3),
  },
  twoPartView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  title_text: {
    fontSize: 16,
    fontWeight: "600",
    color: Color.COLOR_BLACK,
  },
  details_text: {
    color: Color.Grey,
    fontSize: 14,
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

  // Search View
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
  searchbar_main_view: {
    flexDirection: "row",
    marginHorizontal: scale(14),
    marginBottom: 10,
    marginTop: scale(10),
  },
  search_textInpute: {
    width: Dimensions.get("window").width / 1.8,
    fontSize: 14,
    color: Color.COLOR_BLACK,
    alignSelf: "center",
  },
  searchbar_icon: {
    width: 27,
    height: 27,
  },

  searchImage: {
    tintColor: Color.Grey,
    width: 20,
    height: 20,
  },
  postAjobText: {
    color: Color.BACKGROUND_WHITE,
    fontSize: 14,
    paddingVertical: scale(5),
  },

  // DropDown View

  categoryDropDown: {
    paddingHorizontal: scale(21),
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(7),
  },
  dropdown: {
    flex: 1,
    borderBottomColor: Color.BorderColor,
    paddingLeft: 3,
    padding: scale(5),
  },
  dropdownUnderline: {
    borderTopWidth: 1,
    marginHorizontal: scale(21),
    borderTopColor: Color.BorderColor,
    marginBottom: scale(5),
  },

  // User JobList View

  footerFlatlistView: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_WHITE,
    // marginHorizontal: 10,
    // marginVertical: 5,
    borderRadius: 5,
    padding: 10,
    elevation: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: Color.BorderColor,
  },

  flatlistHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 14,
    color: Color.COLOR_BLACK,
  },

  detailsView: {
    flex: 6,
  },
  detailsViewInFlatlist: {
    flex: 1,
    flexDirection: "row",
    marginTop: scale(10),
    justifyContent: "space-between",
  },
  flatlistFooterBittonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: scale(5),
  },
  flatlistFooterUpdateStatus: {
    flex: 1,
    alignItems: "flex-start",
  },
  flatlistFooterQuotedUser: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  // PostAJob Question  Modal

  modalBackground: {
    position: "absolute",
    height: "100%",
    width: "100%",
    opacity: 0.8,
  },
  modalContainer: {
    backgroundColor: "#FFF",
    marginHorizontal: scale(20),
    marginTop: Dimensions.get("window").height / 5,
    borderRadius: 5,
    borderColor: Color.COLOR_BLACK,
    borderWidth: 0.5,
  },
  hraderText: {
    color: Color.COLOR_BLACK,
    fontSize: 22,
    fontWeight: "500",
    marginVertical: scale(2),
  },
  blackText: {
    flex: 1,
    color: Color.COLOR_BLACK,
    marginVertical: scale(2),
  },
  blueText: {
    color: Color.BUTTON_LIGHTBLUE,
    marginVertical: scale(2),
  },

  closeTouchabaleOpacity: {
    marginLeft: 10,
    height: 22,
    width: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  postAjobFirstPageView: {
    borderRadius: 10,
  },
  postAjobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Color.BUTTON_LIGHTBLUE,
    padding: scale(12),
    borderTopLeftRadius: scale(5),
    borderTopRightRadius: scale(5),
  },
  headerText: {
    color: Color.COLOR_BLACK,
  },
  postAjobCloseIcon: {
    backgroundColor: Color.LIGHT_GREY,
    padding: scale(5),
    borderRadius: scale(3),
  },
  dropdown2: {
    borderColor: Color.BorderColor,
    borderWidth: 1,
    borderRadius: 5,
    padding: 3,
    color: Color.COLOR_BLACK,
    marginHorizontal: scale(12),
    marginTop: scale(5),
  },
  selectedItem: {
    color: Color.COLOR_BLACK,
    fontSize: 9,
  },

  // Question Modal
  modalHeaderView: {
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",
    padding: scale(12),
    backgroundColor: Color.BUTTON_LIGHTBLUE,
    borderTopLeftRadius: scale(5),
    borderTopRightRadius: scale(5),
  },
  modalheaderText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: Color.BACKGROUND_WHITE,
  },
  lineView: {
    borderBottomColor: Color.ModalBorder,
    borderBottomWidth: 0.7,
    marginVertical: scale(5),
  },

  questionTitle: {
    fontSize: 16,
    color: Color.COLOR_BLACK,
    fontWeight: "500",
    marginTop: scale(7),
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? scale(16) : scale(10),
    fontSize: 15,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    marginRight: scale(15),
    borderColor: Color.ModalBorder,
  },
  mainImage: {
    height: scale(20),
    width: scale(20),
    marginTop: scale(5),
    marginLeft: scale(5),
  },
  modalButtonView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: scale(10),
  },
  showdateview: {
    marginTop: scale(10),
    borderRadius: 5,
    borderColor: Color.ModalBorder,
    borderBottomWidth: 0.7,
    width: scale(195),
    paddingHorizontal: scale(5),
  },
  dateview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: scale(5),
  },
  datetext: {
    fontSize: 16,
    paddingLeft: scale(2),
    color: Color.COLOR_BLACK,
  },
  dateimage: {
    height: scale(20),
    width: scale(20),
  },
  inputview: {
    marginTop: scale(15),
    paddingHorizontal: scale(5),
    width: scale(250),
    height: scale(40),
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    borderColor: Color.ModalBorder,
    borderWidth: 0.7,
  },

  dropDownCloseIcon: {
    tintColor: Color.Grey,
    height: 10,
    width: 10,
  },

  // otp
  otpText: {
    marginVertical: scale(5),
    color: Color.COLOR_BLACK,
    fontWeight: "500",
  },
  InputSubContainer: {
    width: Dimensions.get("window").width / 4,
    height: Dimensions.get("window").height / 9,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  underlineStyleBase: {
    marginHorizontal: scale(2),
    borderWidth: 0,
    borderBottomWidth: 1.5,
    color: Color.Grey,
    height: scale(50),
  },
  underlineStyleHighLighted: {
    borderColor: Color.BLUE_DRESS,
    color: Color.Grey,
  },
  text: {
    fontSize: 20,
    color: Color.COLOR_BLACK,
  },
  blackBackground: {
    flex: 1,
    height: "100%",
    width: "100%",
    opacity: 0.7,
    position: "absolute",
  },
  menuItemModal: {
    position: "absolute",
    width: "100%",
    marginHorizontal: scale(15),
    justifyContent: "center",
    alignSelf: "center",
  },
  postAjobButton: {
    alignSelf: "center",
    padding: 4,
    borderRadius: scale(5),
    justifyContent: "center",
    // marginLeft: scale(10),
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
    paddingVertical: scale(4),
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
});
