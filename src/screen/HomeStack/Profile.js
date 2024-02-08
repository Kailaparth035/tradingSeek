import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  Dimensions,
  FlatList,
  StatusBar,
  ScrollView,
  RefreshControl,
  TextInput,
  Linking,
} from "react-native";

// Constant
import Color from "../../theme/Color";
import Images from "../../theme/Images";
import { scale } from "../../theme/Scalling";
import AsyncStorage from "../../helper/AsyncStorage";
import {
  menuItemdata,
  analytic_date_range,
  chart_type,
  payment_method,
  opening_hours,
} from "../../theme/Array";
import countryCodeJson from "../../../countryCode.json";

// Redux
import { useDispatch, useSelector } from "react-redux";
import ReduxActions from "../../helper/ReduxActions";

// Component
import Loader from "../../component/Loader";
import ButtonCom from "../../component/Button";
import Business_Details_Comp from "../../Preofile_Details_Component/Business_Details";
import ButtonComp from "../../component/Button";
import Credentials from "../../Preofile_Details_Component/Credentials";
import Portfolio from "../../Preofile_Details_Component/Portfolio";
import Faqs from "../../Preofile_Details_Component/Faqs";
import Analytics from "../../Preofile_Details_Component/Analytics";
import DropDownComp from "../../component/DropDown";
import RemoveProfileImage from "../../component/DeletPopUpCom";

// Library
import ImagePicker from "react-native-image-crop-picker";
import RNOtpVerify from "react-native-otp-verify";
import OtpInpute from "@twotalltotems/react-native-otp-input";
import auth from "@react-native-firebase/auth";
import { AirbnbRating, Rating } from "react-native-ratings";
import SimpleHeader from "../../component/SimpleHeader";
import { useIsFocused } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DocumentPicker from "react-native-document-picker";
import moment from "moment";

var urlMatch = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
const not_allowed_char = /([a-zA-Z][a-zA-Z])+$/;
const regex = /[0-9][()+][0-9]/;

const Profile = (props) => {
  // ---------------------------------  UseSelector --------------------------------- //

  const dispatch = useDispatch();
  const useFocuse = useIsFocused();
  const loaderResponse = useSelector((state) => state.loader);
  const updateProfileResponse = useSelector((state) => state.GetProfileData);
  const uploadProfileImageRes = useSelector((state) => state.ProfileImg);
  const otpResponse = useSelector((state) => state.Otp);
  const upadateUserInfodResponse = useSelector((state) => state.UpdateUserInfo);
  const getFaqsResponse = useSelector((state) => state.GetFaqs);
  const getAddQuestionResponse = useSelector((state) => state.AddQuestion);
  const ipinfoResponse = useSelector((state) => state.Ipinfo);
  const paymentMethodRespone = useSelector((state) => state.PaymentMethod);
  const businessHoursResponse = useSelector(
    (state) => state.UpdateBusinessHours
  );
  const deletPortfolioleResponse = useSelector((state) => state.DeletPortfolio);
  const removeprofileimageResponse = useSelector(
    (state) => state.RemoveProfileImg
  );

  // ---------------------------------  State  --------------------------------- //

  const [openImageModal, setopenImageModal] = useState(false);
  const [imageResponse, setImageResponse] = useState({});
  const [imageName, setImageName] = useState("");
  const [userId, setUserId] = useState();
  const [profileDetails, setProfileDetails] = useState({});
  const [openOtpModal, setOpenOtpModal] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [otp, setOtp] = useState("");
  const [onAuthState, setOnAuthState] = useState(false);
  const [rnOtp, setRnOtp] = useState(null);
  const [menuItem, setMenuItem] = useState(menuItemdata);
  const [selectField, setselectFied] = useState("Business Details");
  const [dateRange, setDateRange] = useState(null);
  const [chartType, setChartType] = useState(null);
  const [otpSendModal, setOtpSendModal] = useState(false);
  const [refreshProfile, setRefreshProfile] = useState(false);
  const hoursMinSecs = { minutes: 0, seconds: 30 };
  const { minutes = 0, seconds = 60 } = hoursMinSecs;
  const [[mins, secs], setTime] = useState([minutes, seconds]);
  const [faqsQestion, setFaqsQestion] = useState([]);
  const [addQuestionModal, setAddQuestionModal] = useState(false);
  const [question, setQuestion] = useState("");
  const [question_answer, setQuestion_answer] = useState("");
  const [opeEditModal, setOpeEditModal] = useState(false);
  const [modalHeader, setModalHeader] = useState("");
  const [editText, setEditText] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState({
    dial_code: "",
    combineCountycode: "",
  });
  const [openpaymentView, setOpenpaymentView] = useState(false);
  const [paymentArray, setpaymentArray] = useState(null);
  // const [defaultCountryCode, setDefaultCountryCode] = useState("");
  const [openHoursEditView, setOpenHoursEditView] = useState(false);
  const [openingHoursData, setOpeningHoursData] = useState(null);
  const [hollidayOpen, setHollidayOpen] = useState(false);
  const [open24Hourse, setOpen24Hourse] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [saveTimeItem, setSaveTimeItem] = useState(null);
  const [key, setKey] = useState(null);
  const [error, setError] = useState("");
  const [newFilename, setNewFilename] = useState();
  const [openDeletPortfolioModal, setOpenDeletPortfolioModal] = useState(false);
  const [portfolioData, setPortfolioData] = useState([]);
  const [deletPortfolio, setDeletPortfolio] = useState(null);
  const [conditionModal, setConditionModal] = useState(false);
  const [socialMedialModal, setSocialMedialModal] = useState(false);

  useEffect(() => {
    if (ipinfoResponse.data !== null) {
      countryCodeJson.map((item) => {
        if (item.code === ipinfoResponse.data.country) {
          // console.log("itemitemitem:", item.dial_code);
          // setDefaultCountryCode(item.dial_code);
          setSelectedCountryCode({
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

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  }, [mins, secs, openOtpModal]);

  const tick = () => {
    if (openOtpModal === true) {
      if (secs !== 0) {
        setTime([mins, secs - 1]);
      }
    }
  };

  // -------- Get Value from asyncstorage -------- //

  useEffect(() => {
    // console.log(
    //   "profile response ::",
    //   JSON.stringify(updateProfileResponse.data)
    // );
    if (updateProfileResponse.data !== null) {
      setProfileDetails(updateProfileResponse.data.user);
      setRefreshProfile(false);
      setSocialMedialModal(false);
      setOpen24Hourse(updateProfileResponse.data.user.businessAlwaysOpen);

      AsyncStorage.getItem("userId").then((value) => {
        var val = value;
        setUserId(val);
      });

      let temp_portfolio = [];
      updateProfileResponse.data.user.businessPortfolio.map((mapItem) => {
        temp_portfolio.push({ uri: mapItem, check: false });
      });
      setPortfolioData([...temp_portfolio]);

      if (updateProfileResponse.data.user.openingHours.length !== 0) {
        let temp_holidayCheckBox = updateProfileResponse.data.user.openingHours;
        let temp_value = false;
        temp_holidayCheckBox.map((mapItem) => {
          if (mapItem.day === "Saturday" || mapItem.day === "Sunday") {
            if (mapItem.isClosed === false) {
              temp_value = false;
            } else {
              temp_value = true;
            }
          }
        });
        setHollidayOpen(temp_value);

        let temp = opening_hours;
        updateProfileResponse.data.user.openingHours.map(
          (mapItem, mapIndex) => {
            if (mapItem.isClosed === false) {
              temp[mapIndex].isClosed = false;
              temp[mapIndex].opening = mapItem.opening;
              temp[mapIndex].closing = mapItem.closing;
            } else {
              temp[mapIndex].isClosed = true;
            }
          }
        );
        // console.log(
        //   "selectde date :::",
        //   moment(temp[0].closing).format("MMMM do, yyyy H:mma")
        // );
        setOpeningHoursData([...temp]);
      } else {
        setOpeningHoursData(opening_hours);
      }
      if (updateProfileResponse.data.user.paymentMethod.length !== 0) {
        let temp = payment_method;
        updateProfileResponse.data.user.paymentMethod.map((mapItem) => {
          temp.map((tempItem) => {
            if (tempItem._id === mapItem) {
              tempItem.check = true;
            }
          });
        });
        setpaymentArray([...temp]);
      } else {
        setpaymentArray(payment_method);
      }
    } else {
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.GetProfileDataRequest());
    }
  }, [updateProfileResponse.data]);

  useEffect(() => {
    dispatch(ReduxActions.loaderAction(true));
    dispatch(ReduxActions.GetProfileDataRequest());
  }, [useFocuse]);

  useEffect(() => {
    if (upadateUserInfodResponse.data !== null) {
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.GetProfileDataRequest());
      setOpenOtpModal(false);
      dispatch(ReduxActions.OtpResponse(null));
      setOtp("");
      setOpeEditModal(false);
      setError("");
    }
  }, [upadateUserInfodResponse.data]);

  // ---------------------------------  uploadProfileImageRes  --------------------------------- //

  useEffect(() => {
    if (uploadProfileImageRes.data !== null) {
      setImageName();
      dispatch(ReduxActions.loaderAction(true));
      setProfileDetails({});
      dispatch(ReduxActions.GetProfileDataRequest());
    }
  }, [uploadProfileImageRes.data]);

  /// ==============================  Otp Api call  ============================== ///

  useEffect(() => {
    // console.log("otpResponse ::::", otpResponse.data);
    if (otpResponse.data !== null) {
      setConfirm(otpResponse.data);
      setOpenOtpModal(true);
    }
  }, [otpResponse.data]);

  // ================================ otpVerifycall ================================ //

  const otpVerifycall = async (response, otpNumber) => {
    // console.log("onAuthState :::", onAuthState);
    if (onAuthState) {
      // console.log("otp ::", otp);
      // console.log("rnOtp ::", rnOtp);
      if (rnOtp !== null) {
        if (rnOtp === otp) {
          // console.log("otpVerified ::");
          let bodyData = {
            value: true,
            field: "isPhoneVerified",
          };

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
        // console.log("rnOtp null");
        let bodyData = {
          value: true,
          field: "isPhoneVerified",
        };

        dispatch(ReduxActions.loaderAction(true));
        dispatch(ReduxActions.UpadateUserInfoRequest(bodyData));
      }
    } else {
      try {
        const data = await response.confirm(otpNumber);
        let bodyData = {
          value: true,
          field: "isPhoneVerified",
        };

        dispatch(ReduxActions.loaderAction(true));
        dispatch(ReduxActions.UpadateUserInfoRequest(bodyData));
      } catch (err) {
        if (err.code === "auth/invalid-verification-code") {
          dispatch(
            ReduxActions.ToastDisplay({
              type: "negative",
              title: "Invalid code.",
            })
          );
        } else if (err.code === "auth/session-expired") {
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

  const verifyPhoneNumber = async () => {
    setOnAuthState(false);
    console.log("Verify Phone number");
    console.log(" Phone number :::", profileDetails.phone);
    dispatch(ReduxActions.loaderAction(true));
    if (profileDetails.phone !== null && profileDetails.phone.length > 4) {
      dispatch(ReduxActions.loaderAction(true));
      dispatch(
        ReduxActions.OtpReZquest(profileDetails.phone, props.navigation)
      );
    } else {
      dispatch(ReduxActions.loaderAction(false));
      dispatch(
        ReduxActions.ToastDisplay({
          type: "negative",
          title: "Phone number is empty.",
        })
      );
    }
    setOtpSendModal(false);
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
    setOnAuthState(true);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // ================================ UploadImageImage Api call Function ================================ //

  const UploadImageApicall = () => {
    let formData = new FormData();
    formData.append("id", userId);
    formData.append("newFile", {
      name: imageResponse.path,
      type: imageResponse.mime,
      uri: imageResponse.path,
    });
    formData.append("newFileName", newFilename);
    console.log("FormData :::", JSON.stringify(formData));
    dispatch(ReduxActions.loaderAction(true));
    dispatch(ReduxActions.ProfileImgRequest(formData, props.navigation));
    setopenImageModal(false);
  };

  // =============== emailVerifyCall =============== //

  const emailVerifyCall = () => {
    let bodyData = {
      email: profileDetails !== null ? profileDetails.email : null,
    };
    dispatch(ReduxActions.loaderAction(true));
    dispatch(ReduxActions.VerifyEmailRequest(bodyData));
  };

  // =============== SelectImage =============== //

  const SelectImage = async () => {
    ImagePicker.openPicker({
      cropping: true,
      freeStyleCropEnabled: true,
    }).then(async (image) => {
      console.log("image:::", image);
      let name = image.path.substring(image.path.lastIndexOf("/") + 1);
      let newFile =
        "userProfilePicture/" + userId + "." + image.path.split(".")[3];
      setNewFilename(newFile);
      setImageResponse(image);
      setImageName(name);
    });
  };

  const call_refreshProfile = () => {
    setRefreshProfile(true);
    dispatch(ReduxActions.GetProfileDataRequest());
  };

  const resend_otp = () => {
    setTime([minutes, seconds]);
    dispatch(ReduxActions.loaderAction(true));
    dispatch(ReduxActions.OtpRequest(profileDetails.phone, props.navigation));
  };

  const uploadDocument = async (key) => {
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      let size = file[0].size / 1000000;
      let newFile = {
        uri: file[0].uri,
        name: file[0].name,
        type: file[0].type,
      };
      if (parseFloat(size) <= 4) {
        const formData = new FormData();
        let newfileName =
          "business/" +
          key +
          "/" +
          profileDetails._id +
          "_" +
          Date.now() +
          "_" +
          file[0].name;
        console.log("newfileName ::", newfileName);
        formData.append("field", key);
        formData.append("userId", profileDetails._id);
        formData.append("newFile", newFile);
        formData.append("newFileName", newfileName);
        console.log("formData ::", JSON.stringify(formData));
        dispatch(ReduxActions.loaderAction(true));
        dispatch(ReduxActions.AddCredentialRequest(formData));
      } else {
        dispatch(
          ReduxActions.ToastDisplay({
            type: "negative",
            title: "Maximum file size of 4MB is allowed.",
          })
        );
      }
    } catch (error) {
      console.log("e::", error);
    }
  };

  useEffect(() => {
    // console.log("getFaqsResponse.data ::", getFaqsResponse.data);
    if (getFaqsResponse.data !== null) {
      setFaqsQestion(getFaqsResponse.data);
    } else {
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.GetFaqRequest());
    }
  }, [getFaqsResponse.data]);

  const addQuestion_apicall = () => {
    let bodyData = {
      question: question,
      answer: question_answer,
    };
    dispatch(ReduxActions.loaderAction(true));
    dispatch(ReduxActions.AddQuestionRequest(bodyData));
  };

  useEffect(() => {
    if (getAddQuestionResponse.data !== null) {
      setAddQuestionModal(false), setQuestion(""), setQuestion_answer("");
    }
  }, [getAddQuestionResponse.data]);

  const delet_faqs = (id) => {
    dispatch(ReduxActions.loaderAction(true));
    dispatch(ReduxActions.DeletFaqsRequest(id));
  };

  const open_editModal = (key, value) => {
    // console.log("key ::", key);
    setOpeEditModal(true);
    setModalHeader(key);

    if (key !== "Mobile") {
      setEditText(value);
    } else {
      // console.log("value ::", value);
      let countrycode = value.split("-");
      // console.log("countrycode ::", countrycode);
      countryCodeJson.map((mapItem) => {
        // console.log("mapItem", mapItem);
        if (mapItem.dial_code === countrycode[0]) {
          setSelectedCountryCode({
            dial_code: mapItem.dial_code,
            combineCountycode: mapItem.combineCountycode,
          });
        }
      });
      setEditText(countrycode[1]);
    }
  };

  const editText_apicall = () => {
    let obj;
    if (modalHeader === "Business Name") {
      obj = {
        value: editText,
        field: "businessName",
      };
    } else if (modalHeader === "Business description") {
      obj = {
        value: editText,
        field: "businessDescription",
      };
    } else if (modalHeader === "Primary Contact") {
      obj = {
        value: editText,
        field: "primaryContact",
      };
    } else if (modalHeader === "Landline") {
      obj = {
        value: editText,
        field: "landline",
      };
    } else if (modalHeader === "Business Address") {
      obj = {
        value: editText,
        field: "address",
      };
    } else if (modalHeader === "Website") {
      obj = {
        value: editText,
        field: "website",
      };
    } else if (modalHeader === "Mobile") {
      obj = {
        value: selectedCountryCode.dial_code + "-" + editText,
        field: "mobile",
      };
    } else if (modalHeader === "Add your Instagram") {
      urlMatch;
      if (!urlMatch.test(editText)) {
        setError("Please add a valid instagram profile link");
        return;
      } else {
        setError("");
        obj = {
          value: editText,
          field: "instagram",
        };
      }
    } else if (modalHeader === "Add your Facebook") {
      if (!urlMatch.test(editText)) {
        setError("Please add a valid facebook profile link");
        return;
      } else {
        setError("");
        obj = {
          value: editText,
          field: "facebook",
        };
      }
    } else if (modalHeader === "Add your LinkedIn") {
      if (!urlMatch.test(editText)) {
        setError("Please add a valid linkedin profile link");
        return;
      } else {
        setError("");
        obj = {
          value: editText,
          field: "linkedin",
        };
      }
    } else if (modalHeader === "Add your Twitter") {
      if (!urlMatch.test(editText)) {
        setError("Please add a valid twitter profile link");
        return;
      } else {
        setError("");
        obj = {
          value: editText,
          field: "twitter",
        };
      }
    } else if (modalHeader === "Add your Pinterest") {
      if (!urlMatch.test(editText)) {
        setError("Please add a valid pinterest profile link");
        return;
      } else {
        setError("");
        obj = {
          value: editText,
          field: "pinterest",
        };
      }
    } else if (modalHeader === "Add your Youtube Channel") {
      if (!urlMatch.test(editText)) {
        setError("Please add a valid youtube profile link");
        return;
      } else {
        setError("");
        obj = {
          value: editText,
          field: "youtube",
        };
      }
    }
    // console.log("bodyData ::", obj);
    dispatch(ReduxActions.loaderAction(true));
    dispatch(
      ReduxActions.UpadateUserInfoRequest(obj, undefined, props.navigation)
    );
  };

  const selectpayment_method = (item) => {
    let temp = paymentArray;
    temp.map((mapItem) => {
      if (item._id === mapItem._id) {
        if (mapItem.check === true) {
          mapItem.check = false;
        } else {
          mapItem.check = true;
        }
      }
    });
    setpaymentArray([...temp]);
  };

  const savepaymentMethod_apicall = () => {
    let temp = [];
    paymentArray.map((mapItem) => {
      if (mapItem.check === true) {
        temp.push(mapItem._id);
      }
    });
    // console.log("temp:::", temp);
    let bodyData = { paymentMethod: temp };
    dispatch(ReduxActions.loaderAction(true));
    dispatch(ReduxActions.PaymentMethodRequest(bodyData));
  };

  useEffect(() => {
    if (paymentMethodRespone.data !== null) {
      setOpenpaymentView(false);
      dispatch(ReduxActions.PaymentMethodResponse(null));
    }
  }, [paymentMethodRespone.data]);

  const open_close_day_finction = (item) => {
    let temp = openingHoursData;
    temp.map((mapItem) => {
      if (item.day === mapItem.day) {
        if (mapItem.isClosed === true) {
          mapItem.isClosed = false;
        } else {
          mapItem.isClosed = true;
        }
      }
    });
    setOpeningHoursData([...temp]);
  };

  const setholiday_function = () => {
    let temp = openingHoursData;
    setHollidayOpen(!hollidayOpen);
    if (hollidayOpen) {
      temp[5].isClosed = false;
      temp[6].isClosed = false;
    } else {
      temp[5].isClosed = true;
      temp[6].isClosed = true;
    }
    // setOpeningHoursData([...temp]);
  };

  const hideDatePicker = () => {
    setOpenDatePicker(false);
  };
  const handleConfirm = (data) => {
    console.log("Dtata :::;", data);
    hideDatePicker();
    let temp = openingHoursData;
    temp.map((mapItem) => {
      if (mapItem.day === saveTimeItem.day) {
        if (key === "opens_at") {
          mapItem.opening = data;
        } else if (key === "closes_at") {
          mapItem.closing = data;
        }
      }
    });
    console.log(
      "Dtata :::;",
      moment(temp[0].closing).format("MMMM do, yyyy H:mma")
    );
    // setOpeningHoursData([...temp]);
  };

  const update_date_api_call = () => {
    console.log("api call to selected date :::", openingHoursData[0].closing);
    let bodyData;
    if (!open24Hourse) {
      bodyData = {
        openingHours: openingHoursData,
        businessAlwaysOpen: open24Hourse,
      };
    } else {
      bodyData = {
        openingHours: opening_hours,
        businessAlwaysOpen: open24Hourse,
      };
    }

    // console.log("bodyData ::", bodyData);
    dispatch(ReduxActions.loaderAction(true));
    dispatch(ReduxActions.UpdateBusinessHoursRequest(bodyData));
  };

  useEffect(() => {
    if (businessHoursResponse.data !== null) {
      setOpenHoursEditView(false);
    }
  }, [businessHoursResponse.data]);

  const openDatePicker_function = (item, key) => {
    setSaveTimeItem(item);
    setKey(key);
    console.log("key :::", key);
    console.log("item::", item);
    setOpenDatePicker(true);
  };

  const deletCredential_apiCall = (field, filename) => {
    let bodyData = {
      field: field,
      filename: filename,
    };
    dispatch(ReduxActions.loaderAction(true));
    dispatch(ReduxActions.DeletCredentialRequest(bodyData));
  };

  const select_portfolio_image = (item, index) => {
    let temp = portfolioData;
    temp.map((mapItem, mapIndex) => {
      if (mapIndex === index) {
        if (item.check === false) {
          // mapItem.uri = temp_url;
          item.check = true;
        } else {
          // mapItem.uri = temp_url;
          item.check = false;
        }
      }
    });
    setPortfolioData([...temp]);
  };

  const deletportfolio_apicall = () => {
    let url = "https://api.tradingseek.net/delete-portfolio-images";

    if (portfolioData.length >= 1) {
      let value = portfolioData.filter((item) => {
        if (item.check === false) {
          return item;
        }
      });

      let Array = [];
      if (value.length !== 0) {
        value.map((mapitem) => {
          Array.push(mapitem.uri);
        });
      }

      console.log("final  temp", JSON.stringify(url));
      setDeletPortfolio(null);
      dispatch(ReduxActions.loaderAction(true));
      dispatch(
        ReduxActions.DeletPortFolioRequest(
          url + "?undeletedImages[]=" + Array.join("&undeletedImages[]=")
        )
      );
    } else {
      dispatch(ReduxActions.loaderAction(true));
      dispatch(
        ReduxActions.DeletPortFolioRequest(
          url + "?undeletedImages[]=" + Array.join("&undeletedImages[]=")
        )
      );
    }
  };

  useEffect(() => {
    if (deletPortfolioleResponse.data !== null) {
      setOpenDeletPortfolioModal(false);
      dispatch(ReduxActions.DeletPortFolioResponse(null));
    }
  }, [deletPortfolioleResponse.data]);

  // const setText = (text) => {
  //   console.log("text:::", text);

  //   if (
  //     modalHeader === "Primary Contact" ||
  //     modalHeader === "Landline" ||
  //     modalHeader === "Mobile"
  //   ) {
  //     // let newtext = text.replace(regex, "");
  //     console.log(
  //       "not_allowed_char.test(text) ::",
  //       not_allowed_char.test(text)
  //     );
  //     if (!regex.test(text)) {
  //       setEditText(text);
  //       console.log("text", text);
  //     }
  //   } else {
  //     setEditText(text);
  //   }
  // };

  const removeProfilepicture = () => {
    let bodyData = {
      id: userId,
      newFileName: profileDetails.imageUrl,
    };
    console.log("bodyData ::", bodyData);
    dispatch(ReduxActions.loaderAction(true));
    dispatch(ReduxActions.RemoveProfileImgRequest(bodyData));
  };

  const removeSocialMedia = () => {
    dispatch(ReduxActions.loaderAction(true));
    let field;
    if (modalHeader === "Add your Instagram") {
      field = "instagram";
    } else if (modalHeader === "Add your Facebook") {
      field = "facebook";
    } else if (modalHeader === "Add your LinkedIn") {
      field = "linkedin";
    } else if (modalHeader === "Add your Twitter") {
      field = "twitter";
    } else if (modalHeader === "Add your Pinterest") {
      value: null, (field = "pinterest");
    } else if (modalHeader === "Add your Youtube Channel") {
      field = "youtube";
    }
    let bodyData = {
      value: null,
      field: field,
    };
    console.log("bodyData ::", bodyData);
    dispatch(ReduxActions.UpadateUserInfoRequest(bodyData));
  };

  useEffect(() => {
    if (removeprofileimageResponse.data !== null) {
      setConditionModal(false);
      setOpeEditModal(false);
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.RemoveProfileImgResponse(null));
      dispatch(ReduxActions.GetProfileDataRequest());
    }
  }, [removeprofileimageResponse.data]);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle="dark-content"
      />
      <SimpleHeader
        title="Profile"
        rightbutton={true}
        image={Images.ProfileSetting}
        navigation={() => props.navigation.navigate("Setting")}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshProfile}
            onRefresh={() => call_refreshProfile()}
          />
        }
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: scale(10),
          }}
        >
          {profileDetails !== null ? (
            profileDetails.imageUrl !== null ? (
              <Image
                source={{
                  uri: profileDetails.imageUrl + "?" + new Date(),
                }}
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: 55,
                  borderWidth: 3,
                  borderColor: Color.BUTTON_LIGHTBLUE,
                }}
              />
            ) : (
              <Image
                source={Images.Profile}
                style={{ width: 100, height: 100 }}
              />
            )
          ) : null}
          <TouchableOpacity
            style={[
              styles.editprofile_button,
              {
                top:
                  profileDetails !== null &&
                  profileDetails.imageUrl !== null &&
                  profileDetails.imageUrl !== ""
                    ? 100
                    : 85,
              },
            ]}
            onPress={() => {
              setopenImageModal(true), setImageName("");
            }}
          >
            <Image source={Images.Edit} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: "600",
            color: Color.COLOR_BLACK,
          }}
        >
          {profileDetails !== null
            ? profileDetails.userName !== null
              ? profileDetails.userName
              : "Unknown person"
            : "Unknown person"}
        </Text>
        {profileDetails.userType === "Business User" ? (
          profileDetails.switchedToCustomerViewApk === false ? (
            <View style={styles.ratingStar_rating_view}>
              <View style={styles.onlyrating_view}>
                <AirbnbRating
                  count={5}
                  reviews=""
                  defaultRating={5}
                  size={16}
                />
              </View>
              <Text style={styles.rating_text}>4.1</Text>
            </View>
          ) : null
        ) : null}

        {profileDetails.userType === "Business User" ? (
          profileDetails.switchedToCustomerViewApk === false ? (
            <TouchableOpacity
              style={styles.public_profile_button}
              onPress={() =>
                Linking.openURL(
                  "https://tradingseek.net/business-details/" +
                    profileDetails.businessUrl
                )
              }
            >
              <Text
                style={{ color: Color.BACKGROUND_WHITE, fontWeight: "600" }}
              >
                Public Profile
              </Text>
            </TouchableOpacity>
          ) : null
        ) : null}

        {profileDetails.userType === "Business User" ? (
          profileDetails.switchedToCustomerViewApk === false ? (
            <View style={{ paddingHorizontal: scale(12) }}>
              <FlatList
                data={menuItem}
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      style={{
                        padding: scale(10),
                        borderBottomWidth:
                          selectField !== null
                            ? selectField === item.menuName
                              ? 2
                              : null
                            : null,
                        borderBottomColor:
                          selectField !== null
                            ? selectField === item.menuName
                              ? Color.BUTTON_LIGHTBLUE
                              : null
                            : null,
                      }}
                      onPress={() => setselectFied(item.menuName)}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: Color.Light_Black,
                        }}
                      >
                        {item.menuName}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          ) : null
        ) : null}

        {selectField === "Business Details" ? (
          <Business_Details_Comp
            profileDetails={profileDetails}
            emailVerification={() => emailVerifyCall()}
            verifyPhoneNumber={() => setOtpSendModal()}
            navigation_resetPassword={() =>
              props.navigation.navigate("ResetPassword")
            }
            setOpenEditModal={(key, value) => open_editModal(key, value)}
            openpayment_view={() => setOpenpaymentView(!openpaymentView)}
            payment_view={openpaymentView}
            paymentData={paymentArray !== null ? paymentArray : payment_method}
            checkbox_click={(item) => selectpayment_method(item)}
            save_payment_method={() => savepaymentMethod_apicall()}
            openHoursEditView={() => setOpenHoursEditView(!openHoursEditView)}
            openHoursEditView_value={openHoursEditView}
            openingHoursData={openingHoursData}
            hollidayOpen={hollidayOpen}
            open24Hourse={open24Hourse}
            setOpenHoliday={() => setholiday_function()}
            open24Hours={() => setOpen24Hourse(!open24Hourse)}
            open_close_day={(item) => open_close_day_finction(item)}
            setOpenDatePicker={(item, key) =>
              openDatePicker_function(item, key)
            }
            update_date={() => update_date_api_call()}
            openingHours={profileDetails.openingHours}
          />
        ) : selectField === "Credentials" ? (
          <Credentials
            uploadDocument={(key) => uploadDocument(key)}
            profileDetails={profileDetails}
            deletCredential={(field, filename) =>
              deletCredential_apiCall(field, filename)
            }
          />
        ) : selectField === "Portfolio" ? (
          <Portfolio
            uploadDocument={(key) => uploadDocument(key)}
            profileDetails={profileDetails}
            deletportFolio={() => setOpenDeletPortfolioModal(true)}
          />
        ) : selectField === "FAQ's" ? (
          <Faqs
            faqQuestion={faqsQestion}
            addQuestion={() => setAddQuestionModal(true)}
            delet_question={(id) => delet_faqs(id)}
          />
        ) : selectField === "Analytics" ? (
          <Analytics
            date_range={analytic_date_range}
            selectdate_range={(item) => setDateRange(item.date)}
            selectedDaterange={dateRange}
            chart_type={chart_type}
            selectChartType={(item) => setChartType(item.chartName)}
            selectedchartType={chartType}
          />
        ) : null}

        <DateTimePickerModal
          isVisible={openDatePicker}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        {/****  Add Question modal   ****/}

        <Modal
          visible={addQuestionModal}
          onRequestClose={() => {
            setAddQuestionModal(false), setQuestion(""), setQuestion_answer("");
          }}
          animationType={"slide"}
          transparent={true}
        >
          <Image source={Images.Black} style={styles.blackImage} />
          <View style={[styles.otpModalView, { padding: 0 }]}>
            <View style={styles.add_question_modal_view}>
              <Text style={styles.add_question_header}>Add Question</Text>
              <TouchableOpacity
                onPress={() => {
                  setAddQuestionModal(false),
                    setQuestion(""),
                    setQuestion_answer("");
                }}
              >
                <Image source={Images.ViewClose} style={styles.closeImage} />
              </TouchableOpacity>
            </View>
            <Text style={styles.question_textinputemodal_title}>
              Type Question here*
            </Text>
            <TextInput
              placeholder="Type here..."
              placeholderTextColor={Color.Grey}
              multiline
              style={styles.question_textinpute}
              value={question}
              onChangeText={(text) => setQuestion(text)}
            />
            <Text style={styles.question_textinputemodal_title}>
              Type answer here*
            </Text>
            <TextInput
              placeholder="Type here..."
              placeholderTextColor={Color.Grey}
              multiline
              style={[styles.question_textinpute, { marginBottom: scale(10) }]}
              value={question_answer}
              onChangeText={(text) => {
                setQuestion_answer(text);
              }}
            />

            <View
              style={{
                padding: scale(15),
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={[
                  styles.footerButton,
                  {
                    backgroundColor: Color.LIGHT_GREY,
                  },
                ]}
                onPress={() => {
                  setAddQuestionModal(false),
                    setQuestion(""),
                    setQuestion_answer("");
                }}
              >
                <Text
                  style={[
                    styles.footerButtonText,
                    { color: Color.COLOR_BLACK },
                  ]}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={
                  question !== "" && question_answer !== "" ? false : true
                }
                style={[
                  styles.footerButton,
                  {
                    backgroundColor: Color.BUTTON_LIGHTBLUE,
                    marginHorizontal: scale(10),
                    paddingHorizontal: scale(22),
                    opacity:
                      question !== "" && question_answer !== "" ? 1 : 0.5,
                  },
                ]}
                onPress={() => addQuestion_apicall()}
              >
                <Text
                  style={[
                    styles.footerButtonText,
                    {
                      color: Color.BACKGROUND_WHITE,
                    },
                  ]}
                >
                  Verify
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Loader val={loaderResponse.loader} />
        </Modal>

        {/****  Otp Mopdal   ****/}
        <Modal
          visible={openOtpModal}
          transparent={true}
          onRequestClose={() => setOpenOtpModal(false)}
          animationType="slide"
        >
          <Image source={Images.Black} style={styles.blackImage} />
          <View style={styles.otpModalView}>
            <View style={styles.otpModalHeader}>
              <Text style={styles.headerText}>
                Please enter the OTP sent on your phone
                {profileDetails.phone}
              </Text>
              <TouchableOpacity
                style={styles.closeImageBackground}
                onPress={() => {
                  setOpenOtpModal(false), setOtp("");
                }}
              >
                <Image source={Images.Close} style={styles.closeImage} />
              </TouchableOpacity>
            </View>
            <OtpInpute
              pinCount={6}
              code={otp}
              onCodeChanged={(code) => setOtp(code)}
              style={styles.InputSubContainer}
              autoFocusOnLoad={false}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
            />
            <View
              style={[
                styles.buttonView,
                { margin: scale(0), marginTop: scale(10) },
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  style={[
                    styles.footerButton,
                    {
                      backgroundColor: Color.LIGHT_GREY,
                    },
                  ]}
                  onPress={() => {
                    setOpenOtpModal(false),
                      setOtp(""),
                      dispatch(ReduxActions.OtpResponse(null));
                  }}
                >
                  <Text
                    style={[
                      styles.footerButtonText,
                      { color: Color.COLOR_BLACK },
                    ]}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginHorizontal: scale(3) }}
                  disabled={secs === 0 ? false : true}
                  onPress={() => resend_otp()}
                >
                  <Text
                    style={{
                      fontSize: scale(14),
                      color: Color.BUTTON_LIGHTBLUE,
                    }}
                  >
                    {secs === 0
                      ? "Resend otp"
                      : mins.toString().padStart(2, "0") +
                        ":" +
                        secs.toString().padStart(2, "0")}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                disabled={otp !== "" && otp.length === 6 ? false : true}
                style={[
                  styles.footerButton,
                  {
                    backgroundColor:
                      otp !== "" && otp.length === 6
                        ? Color.BUTTON_LIGHTBLUE
                        : Color.LIGHT_GREY,
                  },
                ]}
                onPress={() => otpVerifycall(confirm, otp)}
              >
                <Text
                  style={[
                    styles.footerButtonText,
                    {
                      color:
                        otp !== "" && otp.length === 6
                          ? Color.BACKGROUND_WHITE
                          : Color.Grey,
                    },
                  ]}
                >
                  Verify
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Loader val={loaderResponse.loader} />
        </Modal>

        {/****  Otp upload profileImage moadal   ****/}
        <Modal
          visible={openImageModal}
          transparent={true}
          onRequestClose={() => {
            setopenImageModal(false), setImageName();
          }}
          animationType="slide"
        >
          <Image source={Images.Black} style={styles.modalBackground} />

          <View style={[styles.imageModalView, { paddingBottom: scale(10) }]}>
            <View style={styles.editProfileHeader_view}>
              <Text
                style={[
                  styles.imgModalHeaderText,
                  { color: Color.BACKGROUND_WHITE, fontWeight: "600" },
                ]}
              >
                Edit Profile Picture
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setopenImageModal(false), setImageName();
                }}
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
            <View style={styles.horizontalLine}>
              <ButtonCom
                text={"Choose File"}
                disabled={false}
                onPress={() => SelectImage()}
                paddingHorizontal={10}
                marginHorizontal={0}
              />
              <Text
                style={[styles.chooseText, { fontSize: 15, marginTop: 10 }]}
              >
                {imageName !== "" ? imageName : "No File Choosen"}
              </Text>
            </View>

            {profileDetails !== null && profileDetails.imageUrl !== null ? (
              <TouchableOpacity
                style={styles.remove_button}
                onPress={() => {
                  setConditionModal(true), setopenImageModal(false);
                }}
              >
                <Text style={styles.remove_image_text}>Remove Picture</Text>
              </TouchableOpacity>
            ) : null}

            <ButtonComp
              text={"Save"}
              disabled={imageName !== "" ? false : true}
              onPress={() => UploadImageApicall()}
              paddingHorizontal={0}
              marginHorizontal={100}
            />
          </View>
          <Loader val={loaderResponse.loader} />
        </Modal>
        <Modal
          visible={otpSendModal}
          onRequestClose={() => setOtpSendModal(false)}
          transparent={true}
          animationType="slide"
        >
          <Image source={Images.Black} style={styles.modalBackground} />
          <View style={styles.imageModalView}>
            <StatusBar
              translucent
              backgroundColor={"transparent"}
              barStyle="dark-content"
            />
            <View style={styles.editProfileHeader_view}>
              <Text
                style={{
                  color: Color.BACKGROUND_WHITE,
                  fontWeight: "600",
                  fontSize: scale(14),
                }}
              >
                Verify Phone number{" "}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setOtpSendModal(false);
                }}
              >
                <Image
                  source={Images.ViewClose}
                  style={{
                    width: scale(27),
                    height: scale(27),
                    tintColor: Color.BACKGROUND_WHITE,
                  }}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                paddingHorizontal: scale(12),
                paddingTop: scale(12),
                color: Color.COLOR_BLACK,
                fontSize: scale(14),
                fontWeight: "500",
              }}
            >
              Number is
              {profileDetails !== null ? profileDetails.phone : null}
            </Text>
            <View style={{ padding: scale(10) }}>
              <ButtonComp
                text={"Send otp"}
                onPress={() => verifyPhoneNumber()}
                paddingHorizontal={0}
              />
            </View>
          </View>
        </Modal>

        {/****  Edit profile moadal   ****/}

        <Modal
          visible={opeEditModal}
          onRequestClose={() => setOpeEditModal(false)}
          animationType={"slide"}
          transparent={true}
        >
          <Image source={Images.Black} style={styles.blackImage} />

          <View style={[styles.otpModalView, { padding: 0 }]}>
            <View style={styles.add_question_modal_view}>
              <Text style={styles.add_question_header}>{modalHeader} Edit</Text>
              <TouchableOpacity
                onPress={() => {
                  setOpeEditModal(false), setError("");
                }}
              >
                <Image source={Images.ViewClose} style={styles.closeImage} />
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.editPhone_view,
                {
                  paddingHorizontal: modalHeader === "Mobile" ? scale(12) : 0,
                  marginRight: modalHeader === "Mobile" ? scale(5) : 0,
                },
              ]}
            >
              {modalHeader === "Mobile" ? (
                <DropDownComp
                  selectedValue={
                    // selectedCountryCode.combineCountycode !== ""
                    // ?
                    selectedCountryCode.combineCountycode
                    // : defaultCountryCode
                  }
                  placeholder={
                    // selectedCountryCode !== ""
                    //   ? selectedCountryCode.combineCountycode !== ""
                    // ?
                    selectedCountryCode.combineCountycode
                    // : defaultCountryCode !== ""
                    // ? defaultCountryCode
                    // : defaultCountryCode
                    // : null
                  }
                  data={countryCodeJson}
                  labelField={"combineCountycode"}
                  valueField={"combineCountycode"}
                  dropdown={styles.country_dropdown}
                  selected={(item) => {
                    // console.log("item:::", item);
                    setSelectedCountryCode({
                      dial_code: item.dial_code,
                      combineCountycode: item.combineCountycode,
                    });
                  }}
                  placeholderStyle={{ color: Color.COLOR_BLACK }}
                  key={"countryCode"}
                />
              ) : null}

              <TextInput
                placeholder="Type here..."
                placeholderTextColor={Color.Grey}
                style={[
                  styles.editbusiness_details_textinpute,
                  {
                    flex: 1,
                    // marginTop: scale(3),
                    // width:
                    //   modalHeader === "Mobile"
                    //     ? Dimensions.get("window").width
                    //     : Dimensions.get("window").width ,
                  },
                ]}
                onChangeText={(text) => setEditText(text)}
                value={editText}
                keyboardType={
                  modalHeader === "Primary Contact" ||
                  modalHeader === "Landline" ||
                  modalHeader === "Mobile"
                    ? "numeric"
                    : "default"
                }
              />
            </View>
            {error !== "" ? (
              <Text
                style={{
                  color: Color.RED,
                  alignSelf: "flex-start",
                  marginHorizontal: scale(15),
                  marginVertical: scale(5),
                }}
              >
                {error}
              </Text>
            ) : null}
            <View style={styles.button_View}>
              {(modalHeader === "Add your Instagram" &&
                profileDetails.instagram !== null) ||
              (modalHeader === "Add your Facebook" &&
                profileDetails.facebook !== null) ||
              (modalHeader === "Add your LinkedIn" &&
                profileDetails.linkedin !== null) ||
              (modalHeader === "Add your Twitter" &&
                profileDetails.twitter !== null) ||
              (modalHeader === "Add your Pinterest" &&
                profileDetails.pinterest !== null) ||
              (modalHeader === "Add your Youtube Channel" &&
                profileDetails.youtube !== null) ? (
                <TouchableOpacity
                  style={[
                    styles.button_click,
                    {
                      backgroundColor: Color.LIGHT_GREY,
                      marginRight: scale(7),
                    },
                  ]}
                  onPress={() => {
                    setSocialMedialModal(true), setOpeEditModal(false);
                  }}
                >
                  <Text
                    style={[
                      styles.footerButtonText,
                      { color: Color.COLOR_BLACK },
                    ]}
                  >
                    Remove
                  </Text>
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                style={[
                  styles.button_click,
                  {
                    backgroundColor: Color.LIGHT_GREY,
                    marginRight: scale(7),
                  },
                ]}
                onPress={() => {
                  setOpeEditModal(false), setError("");
                }}
              >
                <Text
                  style={[
                    styles.footerButtonText,
                    { color: Color.COLOR_BLACK },
                  ]}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button_click}
                onPress={() => editText_apicall()}
              >
                <Text
                  style={[
                    styles.footerButtonText,
                    {
                      color: Color.BACKGROUND_WHITE,
                    },
                  ]}
                >
                  Update
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Loader val={loaderResponse.loader} />
        </Modal>

        {/****  DeletPodFile Modal   ****/}

        <Modal
          visible={openDeletPortfolioModal}
          onRequestClose={() => setOpenDeletPortfolioModal(false)}
          animationType={"slide"}
          transparent={true}
        >
          <Image source={Images.Black} style={styles.blackImage} />

          <View
            style={[
              styles.otpModalView,
              { padding: 0, marginTop: Dimensions.get("window").height / 4 },
            ]}
          >
            <View style={styles.add_question_modal_view}>
              <Text style={styles.add_question_header}>Delet Portfolio</Text>
              <TouchableOpacity
                onPress={() => {
                  setOpenDeletPortfolioModal(false);
                }}
              >
                <Image source={Images.ViewClose} style={styles.closeImage} />
              </TouchableOpacity>
            </View>
            <View style={{ height: Dimensions.get("window").height / 3 }}>
              <FlatList
                data={portfolioData}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        paddingHorizontal: scale(10),
                        paddingTop: index === 0 ? scale(10) : scale(5),
                        paddingBottom:
                          index === profileDetails.businessPortfolio.length - 1
                            ? scale(10)
                            : scale(0),

                        justifyContent: "space-between",
                      }}
                    >
                      <Image
                        source={{ uri: item.uri }}
                        style={{ width: scale(100), height: scale(100) }}
                        resizeMode="contain"
                      />
                      <TouchableOpacity
                        style={[
                          styles.checkbox_button,
                          {
                            borderColor: item.check
                              ? Color.BLUE_DRESS
                              : Color.BorderColor,
                            backgroundColor: item.check
                              ? Color.BLUE_DRESS
                              : Color.BACKGROUND_WHITE,
                          },
                        ]}
                        onPress={() => select_portfolio_image(item, index)}
                      >
                        {item.check === true ? (
                          <Image
                            source={Images.Check}
                            style={styles.CheckImage}
                          />
                        ) : null}
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>

            <View style={styles.button_View}>
              <TouchableOpacity
                style={[
                  styles.button_click,
                  {
                    backgroundColor: Color.LIGHT_GREY,
                    marginRight: scale(7),
                  },
                ]}
                onPress={() => {
                  setOpenDeletPortfolioModal(false), setDeletPortfolio(null);
                }}
              >
                <Text
                  style={[
                    styles.footerButtonText,
                    { color: Color.COLOR_BLACK },
                  ]}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button_click}
                onPress={() => deletportfolio_apicall()}
              >
                <Text
                  style={[
                    styles.footerButtonText,
                    {
                      color: Color.BACKGROUND_WHITE,
                    },
                  ]}
                >
                  Delet
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Loader val={loaderResponse.loader} />
        </Modal>
        <RemoveProfileImage
          deletPopUpVisibale={conditionModal}
          nodeletProfile={() => setConditionModal(false)}
          yesDeletProfile={() => removeProfilepicture()}
          loaderValue={loaderResponse.loader}
          DeletConfirmText={"Are you sure?"}
          DeletExclamationmarkText={"You want to remove your profile pic."}
          DeletNoButton={"No, cancel!"}
          DeletYesButton={"Yes, Remove it!"}
        />
        <RemoveProfileImage
          deletPopUpVisibale={socialMedialModal}
          nodeletProfile={() => setSocialMedialModal(false)}
          yesDeletProfile={() => removeSocialMedia()}
          loaderValue={loaderResponse.loader}
          DeletConfirmText={"Are you sure?"}
          DeletExclamationmarkText={
            "You want to remove your Social media link."
          }
          DeletNoButton={"No, cancel!"}
          DeletYesButton={"Yes, Remove it!"}
        />
      </ScrollView>

      <Loader val={loaderResponse.loader} />
    </View>
  );
};
export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_WHITE,
  },

  header_credit_text: {
    fontSize: scale(18),
    color: Color.BUTTON_LIGHTBLUE,
    fontWeight: "600",
  },
  editprofile_button: {
    position: "absolute",
    backgroundColor: Color.LIGHT_GREY,
    borderRadius: 50,
    padding: 2,
    left: Dimensions.get("window").width / 1.9,
  },
  ratingStar_rating_view: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    // marginTop: Platform.OS === "android" ? -15 : 0,
  },
  onlyrating_view: {
    marginTop: Platform.OS === "ios" ? -25 : -35,
  },
  rating_text: {
    alignSelf: "flex-end",
    marginLeft: scale(5),
    fontWeight: "500",
    fontSize: 16,
    color: Color.COLOR_BLACK,
  },

  //// otp modal style

  blackImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.7,
  },
  otpModalView: {
    marginTop: Dimensions.get("window").height / 3,
    backgroundColor: Color.BACKGROUND_WHITE,
    marginHorizontal: scale(20),
    padding: scale(10),
    borderRadius: 5,
  },
  otpModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerText: {
    fontSize: scale(15),
    color: Color.COLOR_BLACK,
  },
  closeImageBackground: {
    backgroundColor: Color.BUTTON_LIGHTBLUE,
    padding: scale(5),
    borderRadius: 3,
  },
  closeImage: {
    width: 15,
    height: 15,
    tintColor: Color.BACKGROUND_WHITE,
  },
  buttonView: {
    flexDirection: "row",
    margin: scale(25),
    justifyContent: "space-between",
  },
  footerButton: {
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: scale(16),
    elevation: 1,
  },
  footerButtonText: {
    fontWeight: "500",
    letterSpacing: 1,
    fontSize: 14,
  },

  /// otp

  InputSubContainer: {
    marginLeft: Platform.OS === "ios" ? scale(12) : 0,
    width: Dimensions.get("window").width / 4,
    height: Dimensions.get("window").height / 9,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  underlineStyleBase: {
    marginHorizontal: scale(2),
    borderRadius: scale(3),
    borderWidth: 1.5,
    color: Color.Grey,
    height: scale(50),
  },
  underlineStyleHighLighted: {
    borderColor: Color.BLUE_DRESS,
    color: Color.Grey,
  },

  // upload Image modal
  modalBackground: {
    position: "absolute",
    height: "100%",
    width: "100%",
    opacity: 0.8,
  },
  imageModalView: {
    marginTop: scale(250),
    marginHorizontal: scale(15),
    backgroundColor: Color.BACKGROUND_WHITE,
    elevation: 2,
    borderRadius: scale(5),
  },
  editProfileHeader_view: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: scale(12),
    alignItems: "center",
    backgroundColor: Color.BUTTON_LIGHTBLUE,
    borderTopLeftRadius: scale(5),
    borderTopRightRadius: scale(5),
  },
  imgModalHeaderText: {
    textAlign: "center",
    color: Color.COLOR_BLACK,
    fontSize: scale(15),
  },
  editProfile_modal_button: {
    backgroundColor: Color.LIGHT_GREY,
    padding: scale(5),
    borderRadius: scale(3),
  },
  horizontalLine: {
    borderBottomWidth: 0.5,
    marginHorizontal: scale(10),
    borderBottomColor: Color.BorderColor,
  },
  chooseText: {
    color: Color.COLOR_BLACK,
    letterSpacing: 0.2,
  },

  // add question modal

  question_textinpute: {
    borderWidth: 1,
    borderColor: Color.BorderColor,
    marginHorizontal: scale(15),
    padding: scale(5),
    marginVertical: scale(5),
    borderRadius: scale(5),
    color: Color.COLOR_BLACK,
  },
  question_textinputemodal_title: {
    color: Color.COLOR_BLACK,
    fontWeight: "600",
    fontSize: scale(14),
    marginHorizontal: scale(15),
    marginTop: scale(10),
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

  // edit modal

  editbusiness_details_textinpute: {
    borderRadius: scale(5),
    borderWidth: 1,
    borderColor: Color.BorderColor,
    padding: Platform.OS === "ios" ? scale(10) : scale(6),
    marginHorizontal: scale(15),
    marginTop: scale(15),
    color: Color.COLOR_BLACK,
  },

  country_dropdown: {
    borderColor: Color.BorderColor,
    borderBottomColor: Color.BorderColor,
    paddingLeft: 3,
    borderWidth: scale(1),
    borderRadius: scale(5),
    marginLeft: scale(8),
    padding: scale(2),
    flex: 0.4,
    marginTop: scale(15),
  },
  editPhone_view: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(5),
  },

  public_profile_button: {
    backgroundColor: Color.BUTTON_LIGHTBLUE,
    padding: 10,
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 5,
  },

  checkbox_button: {
    height: scale(20),
    width: scale(20),
    borderRadius: scale(5),
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: scale(10),
    alignSelf: "center",
  },

  CheckImage: {
    width: scale(15),
    height: scale(15),
    tintColor: Color.BACKGROUND_WHITE,
  },
  remove_image_text: {
    color: Color.COLOR_BLACK,
    fontWeight: "500",
  },
  remove_button: {
    backgroundColor: Color.LIGHT_GREY,
    alignSelf: "center",
    padding: scale(6),
    paddingHorizontal: scale(15),
    borderRadius: scale(4),
    marginTop: scale(10),
  },
  button_View: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(15),
    marginVertical: scale(13),
  },
  button_click: {
    flex: 1,
    backgroundColor: Color.BUTTON_LIGHTBLUE,
    alignItems: "center",
    padding: scale(5),
    borderRadius: scale(4),
  },
});
