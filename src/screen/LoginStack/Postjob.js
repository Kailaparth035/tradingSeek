import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  Dimensions,
  ScrollView,
  Platform,
} from "react-native";

// json file
import AusLocation from "../../../aus.json";
import countryCode from "../../../countryCode.json";

// constant
import Color from "../../theme/Color";
import Images from "../../theme/Images";
import { scale } from "../../theme/Scalling";
import { Queston_Array, Registration_Array } from "../../theme/Array";

// Component
import Loader from "../../component/Loader";
import HeaderComp from "../../component/HeaderLogo";
import DropDownComp from "../../component/DropDown";
import RedioButton from "../../component/RadioButton";
import TextInputComp from "../../component/TextInput";
import BackButtonCom from "../../component/BackButton";
import ModalButtonCom from "../../component/ModalButton";
import RangeSelect from "../../component/RangeSelect";

// Redux
import { useDispatch, useSelector } from "react-redux";
import ReduxActions from "../../helper/ReduxActions";
import { ProfessionRequest } from "../../redux/Action/ProfessionAction";

// library
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment, { min } from "moment";
import OtpInpute from "@twotalltotems/react-native-otp-input";
import auth from "@react-native-firebase/auth";
import RNOtpVerify from "react-native-otp-verify";

const Postjob = ({ navigation }) => {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  /// useDispatch
  const dispatch = useDispatch();

  /// useSelector

  const loaderResponse = useSelector((state) => state.loader);
  const professionResponse = useSelector((state) => state.profession);
  const EmailVerifyResponse = useSelector((state) => state.EmailVerify);
  const postAJobResponse = useSelector((state) => state.PostJob);
  const otpResponse = useSelector((state) => state.Otp);
  const passwordResponse = useSelector((state) => state.Password);
  const ipinfoResponse = useSelector((state) => state.Ipinfo);
  const [icon, setIcon] = useState(false);

  /// ------------------------------------------------ state ------------------------------------------------ ///

  const [locationData, setLocationData] = useState([]);
  const [emailRes, setEmailRes] = useState("");
  const [userName, setUserName] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPasswod, setRegConfirmPasswod] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [selectedProfession, setSelectedProfession] = useState({});
  const [professiondata, setProfessiondata] = useState();
  const [selectedLocality, setSelectedLocality] = useState();
  const [showModal, setShowModal] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkLoginStatus, setCheckLoginStatus] = useState(null);
  const [arrayOfQuestion, setArrayofQuestion] = useState();
  const [openOtpModal, setOpenOtpModal] = useState(false);
  const [arrayLength, setArrayLength] = useState();
  const [mobileNumber, setMobileNumber] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [questionItem, setQuestionItem] = useState();
  const [phoneVerify, setPhoneVerify] = useState(false);
  const [defaultCountryCode, setDefaultCountryCode] = useState("");
  const [countrycode, setCountrycode] = useState({
    dial_code: "",
    combineCountycode: "",
  });
  const [otp, setOtp] = useState("");
  const [rnOtp, setRnOtp] = useState(null);
  const [onAuthStatePostJob, setOnAuthStatePostJob] = useState(false);

  const IconPress = () => {
    setIcon((icon) => !icon);
  };

  /// -----------------------------------------  SaveQuestion ----------------------------------------- ///

  const SaveQuetion = (selectedItem, val, valText, _id) => {
    // console.log("val :::", val);
    // console.log("selectedItem ====>", selectedItem);
    // console.log("valText ====>", valText);
    var temp = arrayOfQuestion;
    temp.map((tempitem, tempindex) => {
      if (selectedItem._id === 102) {
        selectedItem.ans.map((selItem, selIndex) => {
          if (temp[valText].ans[selIndex]._id === _id) {
            temp[valText].ans[selIndex] = {
              ...selItem,
              answer_radio: val,
            };
          }
        });
      } else {
        if (selectedItem.questionType === "range") {
          if (tempitem._id === selectedItem._id) {
            temp[tempindex] = { ...tempitem, answer_range: val };
          }
        } else if (selectedItem.questionType === "textarea") {
          if (tempitem._id === selectedItem._id) {
            temp[tempindex] = { ...tempitem, answer_textarea: val };
          }
        } else if (selectedItem.questionType === "input") {
          if (tempitem._id === selectedItem._id) {
            temp[tempindex] = { ...tempitem, answer_input: val };
          }
        } else if (
          selectedItem.questionType === "email" ||
          selectedItem.questionType === "password" ||
          selectedItem.questionType === "mobile"
        ) {
          if (tempitem._id === selectedItem._id) {
            temp[tempindex] = { ...tempitem, answer_radio: val };
          }
        } else if (selectedItem.questionType === "radio") {
          if (tempitem._id === selectedItem._id) {
            // console.log(
            //   "selectedItem.answer_radio :::",
            //   selectedItem.answer_radio
            // );
            if (selectedItem.answer_radio !== undefined) {
              if (
                selectedItem.answer_radio === "Other (Please specify)" ||
                selectedItem.answer_radio === "Total" ||
                selectedItem.answer_radio === "Hourly Rate"
              ) {
                temp[tempindex] = {
                  ...tempitem,
                  answer_radio: val,
                  answer_radio_other: valText,
                };
              } else if (selectedItem.answer_radio === "Specific date") {
                // console.log("else if part valText :::", valText);
                temp[tempindex] = {
                  ...tempitem,
                  answer_radio: val,
                  answer_radio_other: valText,
                };
              } else {
                if (val === "Specific date") {
                  temp[tempindex] = {
                    ...tempitem,
                    answer_radio: val,
                    answer_radio_other: moment()
                      .utcOffset("+05:30")
                      .format("YYYY-MM-DD"),
                  };
                } else {
                  temp[tempindex] = {
                    ...tempitem,
                    answer_radio: val,
                    answer_radio_other: "",
                  };
                }
              }
            } else {
              if (tempitem._id === selectedItem._id) {
                if (val === "Specific date") {
                  temp[tempindex] = {
                    ...tempitem,
                    answer_radio: val,
                    answer_radio_other: moment()
                      .utcOffset("+05:30")
                      .format("YYYY-MM-DD"),
                  };
                } else {
                  temp[tempindex] = { ...tempitem, answer_radio: val };
                }
              }
            }
          }
        }
      }
    });

    // console.log("arrayOfQuestion:::", JSON.stringify(temp));
    setArrayofQuestion([...temp]);
  };

  ///  =================================== setDefaultCountryCode  =================================== ///

  useEffect(() => {
    if (ipinfoResponse.data !== null) {
      // console.log("ipinfoResponse ::", ipinfoResponse.data.country);
      countryCode.map((item) => {
        // console.log("countryName ::", item.code);
        if (item.code === ipinfoResponse.data.country) {
          setDefaultCountryCode(item.dial_code);
          setCountrycode({
            dial_code: item.dial_code,
            combineCountycode: item.combineCountycode,
          });
        }
      });
    } else {
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.IpinfoRequest());
    }
  }, [ipinfoResponse.data]);

  ///  =================================== AusCodeLocation  =================================== ///
  useEffect(() => {
    let location = [];
    AusLocation.map((locItem) => {
      location.push({
        location:
          locItem.postcode + "," + locItem.locality + "," + locItem.territory,
      });
    });
    setLocationData([...location]);
  }, []);

  /// =================================== profession Api call =================================== ///
  useEffect(() => {
    if (professionResponse.data !== null) {
      setProfessiondata(professionResponse.data);
    } else {
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ProfessionRequest());
    }
  }, [professionResponse.data]);

  /// =================================== EmailVerify Api call =================================== ///

  useEffect(() => {
    if (EmailVerifyResponse.data !== null) {
      if (
        EmailVerifyResponse.data === "" ||
        EmailVerifyResponse.data === "User not found"
      ) {
        setSelectedQuestion(selectedQuestion + 1);
        setCheckLoginStatus(false);
      } else {
        setEmailRes(EmailVerifyResponse.data);
        setCheckLoginStatus(true);
        setSelectedQuestion(selectedQuestion + 2);
      }
    }
  }, [EmailVerifyResponse.data]);

  /// ================================ password verification api call ================================ ///

  useEffect(() => {
    if (passwordResponse.data !== null) {
      if (passwordResponse.data !== "Invalid credentials") {
        if (emailRes.isPhoneVerified === false) {
          setSelectedQuestion(selectedQuestion + 1);
        } else {
          let tempAns = arrayOfQuestion;
          tempAns.map((tempAnsItem) => {
            if (
              tempAnsItem._id !== 101 &&
              tempAnsItem._id !== 102 &&
              tempAnsItem._id !== 103 &&
              tempAnsItem._id !== 104
            ) {
              ansArray.push(tempAnsItem);
            }
            // console.log("Question Answer Array ===>", ansArray);
          });
          jobInfoObj = { ...jobInfoObj, user: emailRes._id };
          postAjJobObj = { jobInfo: jobInfoObj, userInfo: userInfoObj };
          dispatch(ReduxActions.loaderAction(true));
          dispatch(ReduxActions.PostJobRequest(postAjJobObj, navigation));
        }
      } else {
        dispatch(
          ReduxActions.ToastDisplay({
            type: "negative",
            title: " Invalid credentials",
          })
        );
        setSelectedQuestion(selectedQuestion);
      }
    }
  }, [passwordResponse.data]);

  /// =================================== Post A new Job Api call =================================== ///
  useEffect(() => {
    if (postAJobResponse.data !== null) {
      if (postAJobResponse.data === "NOT SAVE DATA") {
        setSelectedQuestion(selectedQuestion);
      } else {
        setTimeout(() => {
          setShowModal(false);
          navigation.navigate("Login");
          setRegPassword("");
          setRegConfirmPasswod("");
          setUserName("");
          setArrayofQuestion();
          setSelectedQuestion(0);
        }, 1000);
      }
      dispatch(ReduxActions.OtpResponse(null));
      dispatch(ReduxActions.PasswordResponse(null));
      dispatch(ReduxActions.EmailVerifyResponse(null));
    }
  }, [postAJobResponse.data]);

  /// ==============================  verifyPhoneNumber =============================== ///

  const verifyPhoneNumber = (item) => {
    console.log("countrycode.dial_code", countrycode.dial_code);
    let phRejex;
    if (countrycode.dial_code == "+91") {
      phRejex = /^[6-9]\d{9}$/;
    } else if (countrycode.dial_code == "+61") {
      phRejex = /^[4]\d{8}$/;
    } else if (countrycode.dial_code == "+64") {
      phRejex = /^[2]\d{8}$/;
    } else {
      phRejex = /^[0-9]/;
    }
    console.log(
      "phRejex.text(item.answer_radio)",
      phRejex.test(item.answer_radio)
    );
    // setOnAuthStatePostJob(false);
    // setOtp("");
    // setRnOtp(null);

    if (phRejex.test(item.answer_radio)) {
      let phoneNumber =
        countrycode.dial_code !== ""
          ? countrycode.dial_code + "-" + item.answer_radio
          : defaultCountryCode !== ""
          ? defaultCountryCode + "-" + item.answer_radio
          : null;
      // console.log("phoneNumber::", phoneNumber);
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.OtpRequest(phoneNumber, navigation));
    } else {
      dispatch(
        ReduxActions.ToastDisplay({
          type: "negative",
          title: "Please enter a proper phone number format",
        })
      );
      setSelectedQuestion(selectedQuestion);
    }
  };

  /// ==============================  Otp verification function =============================== ///

  useEffect(() => {
    // console.log("otpResponse ::::", otpResponse.data);
    if (otpResponse.data !== null) {
      setConfirm(otpResponse.data);
      setOpenOtpModal(true);
    }
  }, [otpResponse.data]);

  const otpVerify = async (response, otp) => {
    let tempAns = arrayOfQuestion;
    tempAns.map((tempAnsItem) => {
      if (
        tempAnsItem._id !== 101 &&
        tempAnsItem._id !== 102 &&
        tempAnsItem._id !== 103 &&
        tempAnsItem._id !== 104
      ) {
        ansArray.push(tempAnsItem);
      }
    });
    if (onAuthStatePostJob) {
      // console.log("onAuthStatePostJob :::", onAuthStatePostJob);
      if (rnOtp !== null) {
        // console.log("otp ===>", otp);
        // console.log("rnOtp ===>", rnOtp);
        if (rnOtp === otp) {
          setPhoneVerify(true);
          if (checkLoginStatus) {
            jobInfoObj = { ...jobInfoObj, user: emailRes._id };
          }
          postAjJobObj = { jobInfo: jobInfoObj, userInfo: userInfoObjVerified };
          // console.log("postAjJobObj  ===>", JSON.stringify(postAjJobObj));
          dispatch(ReduxActions.loaderAction(true));
          dispatch(ReduxActions.PostJobRequest(postAjJobObj, navigation));
        } else {
          dispatch(
            ReduxActions.ToastDisplay({
              type: "negative",
              title: "Invalid code.",
            })
          );
        }
      } else {
        setPhoneVerify(true);
        if (checkLoginStatus) {
          jobInfoObj = { ...jobInfoObj, user: emailRes._id };
        }
        postAjJobObj = { jobInfo: jobInfoObj, userInfo: userInfoObjVerified };
        // console.log("postAjJobObj  ===>", JSON.stringify(postAjJobObj));
        dispatch(ReduxActions.loaderAction(true));
        dispatch(ReduxActions.PostJobRequest(postAjJobObj, navigation));
      }
    } else {
      // console.log("else part ====>", onAuthStatePostJob);
      try {
        // console.log("otp  ===>", otp);
        const data = await response.confirm(otp);
        // console.log("Otp verified Response Data", JSON.stringify(data));
        setPhoneVerify(true);
        if (checkLoginStatus) {
          jobInfoObj = { ...jobInfoObj, user: emailRes._id };
        }
        postAjJobObj = { jobInfo: jobInfoObj, userInfo: userInfoObjVerified };
        // console.log("postAjJobObj  ===>", JSON.stringify(postAjJobObj));
        dispatch(ReduxActions.loaderAction(true));
        dispatch(ReduxActions.PostJobRequest(postAjJobObj, navigation));
      } catch (err) {
        // console.log("Error ::", err);
        setPhoneVerify(false);
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

  RNOtpVerify.addListener((val) => {
    try {
      if (val !== "Timeout Error.") {
        const messageArray = val.split("\n");
        const autoOtp = messageArray[0].split(" ")[0];
        setOtp(autoOtp);
        setRnOtp(autoOtp);
      }
    } catch (e) {
      console.log("Catch part", e);
    }
  });

  function onAuthStateChanged(user) {
    // console.log("befor user :: ", JSON.stringify(user));
    setOnAuthStatePostJob(true);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  //---------------------------------------  openQuestionModal ----------------------------------- ///

  const openQuestionModal = () => {
    let combineArray = [];
    // console.log("ansArray of Question ===>", ansArray);
    Registration_Array[1].ans[0].answer_radio = "";
    Registration_Array[1].ans[1].answer_radio = "";
    Registration_Array[1].ans[2].answer_radio = "";
    professiondata.map((professionitem) => {
      if (professionitem._id === selectedProfession._id) {
        if (professionitem.categories.length !== 0) {
          combineArray = [
            ...professionitem.categories[0].questions,
            ...Registration_Array,
          ];
          setArrayLength(professionitem.categories[0].questions.length);
        } else {
          setArrayLength(Queston_Array.length);

          combineArray = [...Queston_Array, ...Registration_Array];
        }
      }
    });

    setArrayofQuestion(combineArray);
    setShowModal(!showModal);
  };

  ///  ----------------------------------------- constatnt Array ----------------------------------------- ///
  let postAjJobObj = {};

  let ansArray = [
    {
      answer_radio: selectedProfession !== {} ? selectedProfession.name : null,
      choices: [],
      createdAt: "2022-06-29T12:18:38.957Z",
      pushedQuestion: "Category",
      question: "What service do you need?",
      questionType: "radio",
      updatedAt: "2022-06-29T12:18:38.957Z",
    },
    {
      answer_radio: selectedLocality,
      choices: [],
      createdAt: "2022-06-29T12:18:38.957Z",
      pushedQuestion: "Location",
      question: "Where do you want the job done?",
      questionType: "radio",
      updatedAt: "2022-06-29T12:18:38.957Z",
    },
  ];

  let passwordverification = {
    email: email,
    password: password,
  };

  let userInfoObj = {
    email: email !== "" ? email : "",
    new: false,
    isEmailVerified: false,
    userName: checkLoginStatus
      ? EmailVerifyResponse.data !== null
        ? emailRes.userName
        : ""
      : userName,
    password: checkLoginStatus
      ? password !== ""
        ? password
        : ""
      : regPassword !== ""
      ? regPassword
      : "",
    confirmPassword: checkLoginStatus
      ? password !== ""
        ? password
        : ""
      : regConfirmPasswod !== ""
      ? regConfirmPasswod
      : "",
    phone: phoneVerify
      ? mobileNumber !== ""
        ? countrycode.dial_code !== ""
          ? countrycode.dial_code + "-" + mobileNumber
          : defaultCountryCode !== ""
          ? defaultCountryCode + "-" + mobileNumber
          : ""
        : ""
      : "",
    isPhoneVerified: emailRes !== "" ? emailRes.isPhoneVerified : false,
    validEmailEntered: true,
  };

  let userInfoObjVerified = {
    email: email !== "" ? email : "",
    new: false,
    isEmailVerified: false,
    userName: checkLoginStatus
      ? EmailVerifyResponse.data !== null
        ? EmailVerifyResponse.data.userName
        : ""
      : userName,
    password: checkLoginStatus
      ? password !== ""
        ? password
        : ""
      : regPassword !== ""
      ? regPassword
      : "",
    confirmPassword: checkLoginStatus
      ? password !== ""
        ? password
        : ""
      : regConfirmPasswod !== ""
      ? regConfirmPasswod
      : "",
    phone:
      mobileNumber !== "" && countrycode.dial_code !== ""
        ? countrycode.dial_code + "-" + mobileNumber
        : defaultCountryCode !== "" && mobileNumber !== ""
        ? defaultCountryCode + "-" + mobileNumber
        : "",
    isPhoneVerified: true,
    validEmailEntered: true,
  };

  let jobInfoObj = {
    address: selectedLocality,
    category: selectedProfession.length !== {} ? selectedProfession._id : "",
    questionAnswers: ansArray,
  };

  /// ===================================== nextFunction ==================================== ///

  const nextFunction = (item, index) => {
    setIcon(false);
    if (item._id === 101) {
      let tempAns = arrayOfQuestion;
      tempAns.map((tempAnsItem) => {
        if (
          tempAnsItem._id !== 101 &&
          tempAnsItem._id !== 102 &&
          tempAnsItem._id !== 103 &&
          tempAnsItem._id !== 104
        ) {
          ansArray.push(tempAnsItem);
        }
        // console.log("Question Answer Array ===>", ansArray);
      });
      if (regex.test(item.answer_radio) == false) {
        dispatch(
          ReduxActions.ToastDisplay({
            type: "negative",
            title: "Enter a valid email",
          })
        );
      } else {
        dispatch(ReduxActions.loaderAction(true));
        dispatch(ReduxActions.EmailVerifyRequest(item.answer_radio));
      }
    }
    if (item._id === 102) {
      if (userName === "" || userName === undefined) {
        dispatch(
          ReduxActions.ToastDisplay({
            type: "negative",
            title: "Please enter a User Name",
          })
        );
      } else if (regPassword !== regConfirmPasswod) {
        dispatch(
          ReduxActions.ToastDisplay({
            type: "negative",
            title: "Password Does Not Match With Confirm Password",
          })
        );
      } else {
        setCheckLoginStatus(false);
        setSelectedQuestion(selectedQuestion + 2);
      }
    }
    if (item._id === 103) {
      // console.log("Email Response Api :::", emailRes.isPhoneVerified);
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.PasswordRequest(passwordverification, navigation));
    }
    if (item._id === 104) {
      if (!openOtpModal) {
        if (item.answer_radio.length > 7) {
          if (checkLoginStatus) {
            jobInfoObj = { ...jobInfoObj, user: emailRes._id };
          }

          postAjJobObj = { jobInfo: jobInfoObj, userInfo: userInfoObj };

          dispatch(ReduxActions.loaderAction(true));
          dispatch(ReduxActions.PostJobRequest(postAjJobObj, navigation));
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
    if (
      item._id !== 101 &&
      item._id !== 102 &&
      item._id !== 103 &&
      item._id !== 104
    ) {
      setSelectedQuestion(selectedQuestion + 1);
    }
  };

  /// ============================== backFunction ============================== ///

  const backFunction = (item) => {
    setIcon(false);
    setOtp("");
    dispatch(ReduxActions.OtpResponse(null));
    dispatch(ReduxActions.PasswordResponse(null));
    dispatch(ReduxActions.EmailVerifyResponse(null));
    if (item._id === 103) {
      if (checkLoginStatus !== null) {
        if (checkLoginStatus) {
          setSelectedQuestion(selectedQuestion - 2);
        } else {
          setSelectedQuestion(selectedQuestion - 1);
        }
      } else {
        setSelectedQuestion(selectedQuestion - 1);
      }
    } else if (item._id === 104) {
      setOpenOtpModal(false);
      setPhoneVerify(false);
      if (!openOtpModal) {
        if (!checkLoginStatus) {
          setSelectedQuestion(selectedQuestion - 2);
        } else {
          setSelectedQuestion(selectedQuestion - 1);
        }
      } else {
        setSelectedQuestion(selectedQuestion);
      }
    } else {
      setSelectedQuestion(selectedQuestion - 1);
    }
  };

  /// ------------------------------------- close Icon api call ---------------------------------- ///

  const closeIconCall = () => {
    let tempAns = arrayOfQuestion;
    tempAns.map((tempAnsItem) => {
      if (
        tempAnsItem._id !== 101 &&
        tempAnsItem._id !== 102 &&
        tempAnsItem._id !== 103 &&
        tempAnsItem._id !== 104
      ) {
        ansArray.push(tempAnsItem);
      }
      // console.log("Question Answer Array ===>", ansArray);
    });
    if (selectedQuestion >= arrayLength + 1) {
      if (checkLoginStatus) {
        jobInfoObj = { ...jobInfoObj, user: emailRes._id };
        postAjJobObj = { jobInfo: jobInfoObj, userInfo: userInfoObj };
        // console.log(
        //   "postAjJobObj Answer Array ===>",
        //   JSON.stringify(postAjJobObj)
        // );
        dispatch(ReduxActions.loaderAction(true));
        dispatch(ReduxActions.PostJobRequest(postAjJobObj, navigation));
      } else {
        postAjJobObj = { jobInfo: jobInfoObj, userInfo: userInfoObj };
        // console.log(
        //   "postAjJobObj Answer Array ===>",
        //   JSON.stringify(postAjJobObj)
        // );
        dispatch(ReduxActions.loaderAction(true));
        dispatch(ReduxActions.PostJobRequest(postAjJobObj, navigation));
      }
    } else {
      if (email !== "") {
        if (regex.test(email) === true) {
          postAjJobObj = { jobInfo: jobInfoObj, userInfo: userInfoObj };
          dispatch(ReduxActions.loaderAction(true));
          dispatch(ReduxActions.PostJobRequest(postAjJobObj, navigation));
        } else {
          dispatch(
            ReduxActions.ToastDisplay({
              type: "negative",
              title: "Enter a valid email",
            })
          );
          setShowModal(false);
          setSelectedQuestion(0);
          setArrayofQuestion();
          navigation.navigate("Login");
        }
      } else {
        setShowModal(false);
        setSelectedQuestion(0);
        setArrayofQuestion();
        navigation.navigate("Login");
      }
    }

    dispatch(ReduxActions.OtpResponse(null));
    dispatch(ReduxActions.PasswordResponse(null));
    dispatch(ReduxActions.EmailVerifyResponse(null));
  };

  const SkipFunction = () => {
    let tempAns = arrayOfQuestion;
    tempAns.map((tempAnsItem) => {
      if (
        tempAnsItem._id !== 101 &&
        tempAnsItem._id !== 102 &&
        tempAnsItem._id !== 103 &&
        tempAnsItem._id !== 104
      ) {
        ansArray.push(tempAnsItem);
      }
      // console.log("Question Answer Array ===>", ansArray);
    });
    if (checkLoginStatus) {
      // console.log("Email Response Api :::", jobInfoObj);
      jobInfoObj = { ...jobInfoObj, user: emailRes._id };
      postAjJobObj = { jobInfo: jobInfoObj, userInfo: userInfoObj };
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.PostJobRequest(postAjJobObj, navigation));
    } else {
      postAjJobObj = { jobInfo: jobInfoObj, userInfo: userInfoObj };
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.PostJobRequest(postAjJobObj, navigation));
    }
  };

  ///---------------------------DATE MODEL-----------------------------------///
  const showDatePicker = (item) => {
    setQuestionItem(item);
    setDatePicker(true);
  };
  const hideDatePicker = () => {
    setDatePicker(false);
  };
  const handleConfirm = (data) => {
    hideDatePicker();
    SaveQuetion(questionItem, questionItem.answer_radio, FormatDate(data));
  };
  const FormatDate = (data) => {
    // console.log("JSon Date ::", JSON.stringify(data));
    let dateTimeString =
      data.getFullYear() + "-" + (data.getMonth() + 1) + "-" + data.getDate();
    return dateTimeString;
  };

  ///  =================================== Range Pluse And mnus Function  =================================== ///

  const plus = (item) => {
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

  //--------------------------------------------------------------------------

  return (
    <SafeAreaView style={styles.containerView}>
      <Loader val={loaderResponse.loader} />
      <HeaderComp height={70} width={180} />

      {/* ***** Main Design  ***** */}

      <View style={styles.header}>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={styles.headerText}>Where to-do gets</Text>
        </View>

        <DropDownComp
          selectedValue={selectedProfession.name}
          placeholder="What service do you need ?"
          data={professiondata}
          labelField={"name"}
          valueField={"name"}
          dropdown={styles.dropdown}
          selected={(item) =>
            setSelectedProfession({ name: item.name, _id: item._id })
          }
          selectedItem={styles.selectedItem}
        />

        <DropDownComp
          selectedValue={selectedLocality}
          placeholder="What do you need the service ?"
          data={locationData}
          labelField={"location"}
          valueField={"location"}
          dropdown={styles.dropdown}
          selected={(item) => setSelectedLocality(item.location)}
          selectedItem={styles.selectedItem}
        />

        <View style={styles.signInView}>
          <TouchableOpacity
            style={[
              styles.postjobButton,
              {
                backgroundColor:
                  !selectedProfession || !selectedLocality
                    ? Color.DIABALEBUTTON_COLOR
                    : Color.BUTTON_LIGHTBLUE,
              },
            ]}
            disabled={!selectedProfession || !selectedLocality ? true : false}
            onPress={() => openQuestionModal()}
          >
            <Text style={styles.postjobText}>Get Free Quotes</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footerView}>
        <HeaderComp height={70} width={100} />
      </View>

      {/* ***** Question Modal  ***** */}

      <Modal
        transparent={true}
        visible={showModal}
        animationType={"fade"}
        onRequestClose={() => {
          setShowModal(false),
            setArrayofQuestion(),
            setSelectedQuestion(0),
            setSelectedLocality(),
            setSelectedProfession({});
          setRegConfirmPasswod("");
          setRegPassword("");
          setUserName("");
          dispatch(ReduxActions.OtpResponse(null));
          dispatch(ReduxActions.PasswordResponse(null));
          dispatch(ReduxActions.EmailVerifyResponse(null));
          navigation.navigate("Login");
        }}
      >
        <Loader val={loaderResponse.loader} />
        <Image source={Images.Black} style={styles.modalBackground} />
        <View style={styles.modalContainer}>
          <View style={styles.headerView}>
            <Text style={styles.modalheaderText}>
              FAQ's For {selectedProfession.name}
            </Text>
            <TouchableOpacity onPress={() => closeIconCall()}>
              <Image
                source={Images.ViewClose}
                style={{
                  width: Dimensions.get("window").width / 15,
                  height: Dimensions.get("window").height / 26,
                  tintColor: Color.BACKGROUND_WHITE,
                }}
              />
            </TouchableOpacity>
          </View>
          {/* <View style={styles.lineView}></View> */}

          {/* *****  Question_Component ***** */}

          {arrayOfQuestion !== undefined
            ? arrayOfQuestion.map((queItem, queIndex) => {
                if (selectedQuestion === queIndex) {
                  return (
                    <View style={styles.loopView}>
                      {!openOtpModal ? (
                        <Text style={styles.questionTitle}>
                          {queItem.question}
                        </Text>
                      ) : null}
                      <View style={{ marginBottom: scale(15) }}>
                        {queItem.questionType === "radio" ? (
                          <ScrollView
                            style={[
                              styles.loopView,
                              {
                                height:
                                  queItem.choices.length > 3
                                    ? Dimensions.get("window").height / 3
                                    : null,
                              },
                            ]}
                          >
                            {queItem.choices.map((citem, cindex) => {
                              return (
                                <View>
                                  <RedioButton
                                    answer_radio={queItem.answer_radio}
                                    choiceoption={citem.option}
                                    choiceitem={citem.option}
                                    selectRadioButton={() => {
                                      if (queItem.answer_radio > 0) {
                                        SaveQuetion(queItem, citem.option);
                                      } else {
                                        SaveQuetion(queItem, citem.option);
                                      }
                                    }}
                                  />
                                  {queItem.answer_radio !== undefined ? (
                                    queItem.answer_radio === citem.option ? (
                                      queItem.answer_radio ===
                                      "Specific date" ? (
                                        <View style={styles.showdateview}>
                                          <Text
                                            style={{ color: Color.COLOR_BLACK }}
                                          >
                                            Select Date
                                          </Text>
                                          <TouchableOpacity
                                            onPress={() =>
                                              showDatePicker(queItem)
                                            }
                                            style={styles.dateview}
                                          >
                                            <Text style={styles.datetext}>
                                              {/* {date} */}
                                              {queItem.answer_radio_other !==
                                              undefined
                                                ? queItem.answer_radio_other
                                                : null}
                                            </Text>
                                            <Image
                                              source={Images.downarry}
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
                                      ) : queItem.answer_radio === "Total" ||
                                        queItem.answer_radio ===
                                          "Hourly Rate" ? (
                                        <View style={styles.inputview}>
                                          <View
                                            style={{
                                              marginTop:
                                                Platform.OS === "android"
                                                  ? scale(-18)
                                                  : scale(-18),
                                              paddingLeft: scale(5),
                                              justifyContent: "center",
                                              alignItems: "center",
                                            }}
                                          >
                                            <Text
                                              style={{
                                                fontSize: 10,
                                                backgroundColor:
                                                  Color.LIGHT_GREY,
                                                borderRadius: 5,
                                                paddingHorizontal: 2,
                                                color: Color.COLOR_BLACK,
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
                                            style={styles.textinputView}
                                            value={queItem.answer_radio_other}
                                            keyboardType={"numeric"}
                                            onChangeText={(valText) => {
                                              SaveQuetion(
                                                queItem,
                                                queItem.answer_radio,
                                                valText
                                              );
                                            }}
                                            // textInputeStyle={{fontSize:10}}
                                          />
                                        </View>
                                      ) : queItem.answer_radio ===
                                        "Other (Please specify)" ? (
                                        <TextInputComp
                                          line={false}
                                          value={queItem.answer_radio_other}
                                          textInputeStyle={styles.textInput}
                                          onChangeText={(valText) =>
                                            SaveQuetion(
                                              queItem,
                                              queItem.answer_radio,
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

                        {queItem.questionType === "textarea" ? (
                          <TextInputComp
                            line={false}
                            value={queItem.answer_textarea}
                            textInputeStyle={styles.textInput}
                            onChangeText={(val) => SaveQuetion(queItem, val)}
                          />
                        ) : null}
                        {queItem.questionType === "input" ? (
                          <TextInputComp
                            line={false}
                            value={queItem.answer_input}
                            textInputeStyle={styles.textInput}
                            onChangeText={(val) => SaveQuetion(queItem, val)}
                          />
                        ) : null}
                        {queItem.questionType === "range" ? (
                          <RangeSelect
                            selectRange={(val) => SaveQuetion(queItem, val)}
                            range={
                              queItem.answer_range !== undefined
                                ? queItem.answer_range
                                : 0
                            }
                            minus={() => minus(queItem)}
                            plus={() => plus(queItem)}
                          />
                        ) : null}
                        {queItem.questionType === "email" ? (
                          <TextInputComp
                            line={false}
                            value={queItem.answer_radio}
                            textInputeStyle={styles.textInput}
                            autoCapitalize={"none"}
                            onChangeText={(val) => {
                              setEmail(val);
                              SaveQuetion(queItem, val);
                            }}
                          />
                        ) : null}
                        {queItem.questionType === "password" ? (
                          <View
                            style={{
                              // height: 40,
                              borderRadius: 5,
                              borderWidth: 1,
                              marginRight: scale(15),
                              borderColor: Color.ModalBorder,
                              justifyContent: "space-between",
                              marginTop: scale(10),
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <TextInput
                              style={{
                                width: "90%",
                                fontSize: 12,
                                // marginBottom: scale(-3),
                                color: Color.COLOR_BLACK,
                              }}
                              value={queItem.answer_radio}
                              autoCapitalize={"none"}
                              onChangeText={(val) => {
                                setPassword(val);
                                SaveQuetion(queItem, val);
                              }}
                              secureTextEntry={!icon ? true : false}
                            ></TextInput>
                            <TouchableOpacity onPress={() => IconPress()}>
                              <Image
                                source={
                                  !icon ? Images.CloseEye : Images.OpenEye
                                }
                                style={styles.eyeImage}
                              />
                            </TouchableOpacity>
                          </View>
                        ) : null}
                        {queItem.questionType === "mobile" ? (
                          <View>
                            {!openOtpModal ? (
                              <>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}
                                >
                                  <View style={{ flex: 1 }}>
                                    <DropDownComp
                                      selectedValue={
                                        countrycode !== undefined
                                          ? countrycode.combineCountycode
                                          : null
                                      }
                                      placeholder={
                                        defaultCountryCode !== ""
                                          ? defaultCountryCode
                                          : null
                                      }
                                      data={countryCode}
                                      labelField={"combineCountycode"}
                                      valueField={"combineCountycode"}
                                      dropdown={{
                                        borderBottomColor: Color.BorderColor,
                                        marginHorizontal: scale(-3),
                                        paddingLeft: 3,
                                        borderBottomColor: Color.BorderColor,
                                        borderBottomWidth: 1,
                                        marginTop: scale(7),
                                        marginHorizontal: scale(3),
                                      }}
                                      selected={(item) =>
                                        setCountrycode({
                                          dial_code: item.dial_code,
                                          combineCountycode:
                                            item.combineCountycode,
                                        })
                                      }
                                      key={"countryCode"}
                                      selectedItem={styles.selectedItem}
                                    />
                                  </View>
                                  <View style={{ flex: 3 }}>
                                    <TextInputComp
                                      line={false}
                                      placeholder={"Phone Number"}
                                      value={queItem.answer_radio}
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
                                          queItem,
                                          val.replace(/[^0-9]/g, "")
                                        );
                                      }}
                                    />
                                  </View>
                                </View>
                                <View
                                  style={{
                                    marginRight: scale(170),
                                    marginTop: scale(10),
                                  }}
                                >
                                  <ModalButtonCom
                                    selectedAnswer={
                                      queItem.answer_radio !== undefined
                                        ? queItem.answer_radio !== ""
                                          ? queItem.answer_radio.length > 7
                                            ? true
                                            : false
                                          : false
                                        : false
                                    }
                                    onPressButoon={() =>
                                      verifyPhoneNumber(queItem)
                                    }
                                    VerifyButton={false}
                                    disabled={
                                      queItem.answer_radio !== undefined
                                        ? queItem.answer_radio !== ""
                                          ? queItem.answer_radio.length > 7
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
                              <View>
                                <Text
                                  style={[
                                    styles.otpText,
                                    {
                                      fontSize: 18,
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
                                      fontSize: 15,
                                    },
                                  ]}
                                >
                                  Please enter the OTP sent on your registered
                                  phone number.
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
                        {queItem.questionType === "registration"
                          ? queItem.ans.map((registeritem) => {
                              return (
                                <View
                                  style={{
                                    flexDirection: "column",
                                    marginTop: -40,
                                    paddingVertical: 20,
                                  }}
                                >
                                  <Text style={styles.questionTitle}>
                                    {registeritem.option}
                                  </Text>

                                  <TextInputComp
                                    autoCapitalize={"none"}
                                    line={false}
                                    value={
                                      registeritem._id === 0
                                        ? registeritem.answer_radio
                                        : registeritem._id === 1
                                        ? registeritem.answer_radio
                                        : registeritem.answer_radio
                                    }
                                    textInputeStyle={styles.textInput}
                                    onChangeText={(val) => {
                                      if (registeritem._id == 0) {
                                        SaveQuetion(
                                          queItem,
                                          val,
                                          queIndex,
                                          registeritem._id
                                        );
                                        setUserName(val);
                                      }
                                      if (registeritem._id == 1) {
                                        SaveQuetion(
                                          queItem,
                                          val,
                                          queIndex,
                                          registeritem._id
                                        );
                                        setRegPassword(val);
                                      }
                                      if (registeritem._id == 2) {
                                        SaveQuetion(
                                          queItem,
                                          val,
                                          queIndex,
                                          registeritem._id
                                        );
                                        setRegConfirmPasswod(val);
                                      }
                                    }}
                                  />
                                </View>
                              );
                            })
                          : null}
                      </View>
                    </View>
                  );
                }
              })
            : null}

          <View style={styles.lineView}></View>

          {/* *****  Button View ***** */}
          <View>
            {arrayOfQuestion !== undefined
              ? arrayOfQuestion.map((mapItem, mapIndex) => {
                  if (selectedQuestion === mapIndex) {
                    if (mapItem._id === 102) {
                      return mapItem.ans.map((ansItem) => {
                        return ansItem._id === 2 ? (
                          <View style={styles.bottomView}>
                            <BackButtonCom
                              selectedQuestion={selectedQuestion}
                              backFunction={() => backFunction(mapItem)}
                              buttonText={"Back"}
                            />
                            <ModalButtonCom
                              selectedAnswer={
                                ansItem.answer_radio !== undefined
                                  ? ansItem.answer_radio !== ""
                                    ? true
                                    : false
                                  : false
                              }
                              onPressButoon={() =>
                                nextFunction(mapItem, mapIndex)
                              }
                              VerifyButton={false}
                              disabled={
                                ansItem.answer_radio !== undefined
                                  ? ansItem.answer_radio !== ""
                                    ? false
                                    : true
                                  : true
                              }
                              text={"Next"}
                            />
                          </View>
                        ) : null;
                      });
                    } else {
                      return (
                        <View style={styles.bottomView}>
                          {mapItem._id === 104 ? (
                            !openOtpModal ? (
                              <View
                                style={{
                                  flex: 1,
                                  alignSelf: "flex-start",
                                  marginLeft: scale(5),
                                  alignItems: "center",
                                }}
                              >
                                <Text
                                  onPress={() => SkipFunction()}
                                  style={{
                                    alignSelf: "flex-start",
                                    // marginRight: scale(115),
                                    color: Color.BUTTON_LIGHTBLUE,
                                    fontWeight: "600",
                                  }}
                                >
                                  Skip
                                </Text>
                              </View>
                            ) : null
                          ) : null}

                          <BackButtonCom
                            selectedQuestion={selectedQuestion}
                            backFunction={() => backFunction(mapItem)}
                            buttonText={"Back"}
                          />
                          <ModalButtonCom
                            onPressButoon={() =>
                              nextFunction(mapItem, mapIndex)
                            }
                            text={
                              mapItem._id === 103
                                ? emailRes.isPhoneVerified === false
                                  ? "Next"
                                  : "Submit"
                                : mapItem._id === 104
                                ? openOtpModal
                                  ? "Submit"
                                  : "Submit"
                                : "Next"
                            }
                            disabled={
                              !openOtpModal
                                ? mapItem._id === 104
                                  ? mapItem.answer_radio !== undefined &&
                                    mapItem.answer_radio !== ""
                                    ? mapItem.answer_radio.length > 7
                                      ? false
                                      : true
                                    : true
                                  : mapItem._id === 101
                                  ? regex.test(mapItem.answer_radio) === true
                                    ? false
                                    : true
                                  : mapItem.questionType === "textarea"
                                  ? mapItem.answer_textarea !== undefined &&
                                    mapItem.answer_textarea !== ""
                                    ? false
                                    : true
                                  : mapItem.questionType === "input"
                                  ? mapItem.answer_input !== undefined &&
                                    mapItem.answer_input !== ""
                                    ? false
                                    : true
                                  : mapItem.questionType === "range"
                                  ? mapItem.answer_range !== undefined &&
                                    mapItem.answer_range !== ""
                                    ? false
                                    : true
                                  : mapItem.questionType === "password"
                                  ? mapItem.answer_radio !== undefined &&
                                    mapItem.answer_radio !== ""
                                    ? false
                                    : true
                                  : mapItem.questionType === "radio"
                                  ? mapItem.answer_radio !== undefined &&
                                    mapItem.answer_radio !== ""
                                    ? mapItem.answer_radio ===
                                        "Other (Please specify)" ||
                                      mapItem.answer_radio === "Total" ||
                                      mapItem.answer_radio === "HoDurly Rate" ||
                                      mapItem.answer_radio === "Specific date"
                                      ? mapItem.answer_radio_other !==
                                          undefined &&
                                        mapItem.answer_radio_other !== ""
                                        ? false
                                        : true
                                      : false
                                    : true
                                  : true
                                : otp.length === 6
                                ? false
                                : true
                            }
                            VerifyButton={false}
                            selectedAnswer={
                              !openOtpModal
                                ? mapItem._id === 104
                                  ? mapItem.answer_radio !== undefined &&
                                    mapItem.answer_radio !== ""
                                    ? mapItem.answer_radio.length > 7
                                      ? true
                                      : false
                                    : false
                                  : mapItem._id === 101
                                  ? regex.test(mapItem.answer_radio) === true
                                    ? true
                                    : false
                                  : mapItem.questionType === "textarea"
                                  ? mapItem.answer_textarea !== undefined &&
                                    mapItem.answer_textarea !== ""
                                    ? true
                                    : false
                                  : mapItem.questionType === "input"
                                  ? mapItem.answer_input !== undefined &&
                                    mapItem.answer_input !== ""
                                    ? true
                                    : false
                                  : mapItem.questionType === "range"
                                  ? mapItem.answer_range !== undefined &&
                                    mapItem.answer_range !== ""
                                    ? true
                                    : false
                                  : mapItem.questionType === "password"
                                  ? mapItem.answer_radio !== undefined &&
                                    mapItem.answer_radio !== ""
                                    ? true
                                    : false
                                  : mapItem.questionType === "radio"
                                  ? mapItem.answer_radio !== undefined &&
                                    mapItem.answer_radio !== ""
                                    ? mapItem.answer_radio ===
                                        "Other (Please specify)" ||
                                      mapItem.answer_radio === "Total" ||
                                      mapItem.answer_radio === "Hourly Rate" ||
                                      mapItem.answer_radio === "Specific date"
                                      ? mapItem.answer_radio_other !==
                                          undefined &&
                                        mapItem.answer_radio_other !== ""
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
                      );
                    }
                  }
                })
              : null}
          </View>
        </View>

        <Loader val={loaderResponse.loader} />
      </Modal>
    </SafeAreaView>
  );
};
export default Postjob;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_WHITE,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    color: Color.COLOR_BLACK,
  },
  header: {
    borderWidth: 0.5,
    padding: scale(10),
    marginHorizontal: scale(20),
    borderRadius: 10,
    marginTop: Dimensions.get("window").height / 12,
  },
  footerView: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: Platform.OS === "android" ? 0 : -42,
  },
  signInView: {
    marginTop: scale(40),
    marginHorizontal: scale(10),
  },
  postjobButton: {
    borderRadius: 5,
    justifyContent: "center",
    alignSelf: "flex-start",
    padding: scale(7),
  },
  postjobText: {
    color: Color.BACKGROUND_WHITE,
    fontSize: 14,
    paddingLeft: 10,
  },
  modalContainer: {
    backgroundColor: "#FFF",
    marginHorizontal: scale(10),
    marginTop:
      Platform.OS === "android"
        ? Dimensions.get("window").height / 5
        : Dimensions.get("window").height / 4,
    borderRadius: 5,
    borderColor: Color.COLOR_BLACK,
    borderWidth: 0.5,
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: scale(10),
    alignItems: "center",
    paddingHorizontal: scale(10),
    backgroundColor: Color.BUTTON_LIGHTBLUE,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  modalheaderText: {
    fontSize: 18,
    fontWeight: "400",
    color: Color.COLOR_BLACK,
  },
  lineView: {
    borderBottomColor: Color.ModalBorder,
    borderBottomWidth: 0.7,
    marginVertical: scale(5),
  },
  loopView: {
    paddingLeft: scale(10),
    // paddingBottom: scale(40),
  },
  bottomView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: scale(10),
  },
  button: {
    paddingHorizontal: scale(15),
    paddingVertical: scale(5),
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  textinput: {
    borderRadius: 5,
    borderColor: Color.ModalBorder,
    borderWidth: 0.7,
    height: scale(40),
    marginRight: scale(100),
    marginTop: scale(8),
  },
  questionTitle: {
    fontSize: 16,
    color: Color.COLOR_BLACK,
    fontWeight: "500",
    marginTop: scale(15),
  },
  showdateview: {
    marginTop: scale(10),
    borderRadius: 5,
    borderColor: Color.ModalBorder,
    borderBottomWidth: 0.7,
    width: scale(195),
    // paddingBottom: scale(5),
    paddingHorizontal: scale(5),
  },
  dateview: {
    marginTop: scale(5),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  datetext: {
    fontSize: 16,
    paddingLeft: scale(2),
    paddingTop: scale(3),
    color: Color.COLOR_BLACK,
  },
  dateimage: {
    height: scale(10),
    width: scale(10),
    marginTop: scale(12),
  },
  inputview: {
    marginTop: scale(15),
    paddingHorizontal: scale(5),
    width: scale(200),
    height: scale(40),
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    borderColor: Color.ModalBorder,
    borderWidth: scale(0.7),
  },
  mainImage: {
    height: scale(10),
    width: scale(10),
    marginTop: Platform.OS === "android" ? scale(5) : scale(10),
    marginLeft: scale(5),
  },
  textinputView: {
    borderRadius: 5,
    borderColor: Color.ModalBorder,
    // height: scale(40),
    // width: scale(150),
    width: Dimensions.get("window").width / 2.5,
    height: Dimensions.get("window").height / 20,
    fontSize: 10,
    color: Color.COLOR_BLACK,
  },

  verifybutton: {
    width: scale(110),
    alignItems: "center",
    justifyContent: "center",
    marginTop: scale(7),
    marginLeft: scale(5),
    height: scale(25),
    borderRadius: scale(5),
    height: scale(28),
  },
  dropdown: {
    borderBottomColor: Color.BorderColor,
    borderBottomWidth: 1,
    marginHorizontal: scale(10),
    marginTop: scale(15),
    padding: scale(5),
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    padding: scale(5),
    borderRadius: 5,
    borderWidth: 1,
    marginRight: scale(15),
    borderColor: Color.ModalBorder,
    color: Color.COLOR_BLACK,
  },
  modalBackground: {
    position: "absolute",
    height: "100%",
    width: "100%",
    opacity: 0.8,
  },
  buttonStyle: {
    flex: 1,
    marginTop: 10,
    height: 38,
    borderBottomWidth: 0.7,
    // paddingVertical: Platform.OS === "ios" ? 13 : 0,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: Color.BorderColor,
  },
  buttonTextstyle: {
    textAlign: "center",
    fontSize: 14,
    marginLeft: 5,
    fontWeight: "500",
    color: Color.COLOR_BLACK,
  },
  triangleShapeCSS: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 9,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    transform: [{ rotateX: "180deg" }],
  },
  iconView: {
    backgroundColor: "transparent",
  },
  eyeImage: {
    height: 20,
    width: 20,
    marginRight: 7,
  },

  // otp
  otpText: {
    marginVertical: scale(5),
    color: Color.COLOR_BLACK,
    fontWeight: "500",
  },
  InputSubContainer: {
    width: Dimensions.get("window").width / 1.2,
    height: Dimensions.get("window").height / 9,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  underlineStyleBase: {
    // width: 30,
    // height: 35,
    borderWidth: 0,
    borderBottomWidth: 1.5,
    color: Color.Grey,
    fontSize: 10,
  },
  underlineStyleHighLighted: {
    borderColor: Color.BLUE_DRESS,
    color: Color.Grey,
  },
  selectedItem: {
    color: Color.COLOR_BLACK,
    fontSize: 12,
  },
});
