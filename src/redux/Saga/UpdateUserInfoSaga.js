import { put, call } from "redux-saga/effects";
import Constant from "../../theme/Constant";
import AsyncStorage from "../../helper/AsyncStorage";
import ReduxActions from "../../helper/ReduxActions";

export function* updateUserInfoSaga(action) {
  // console.log("Action ::", action);
  const { bodyData, switchAccountkey, navigation } = action;

  // console.log("updateUserInfoSaga ::", bodyData);
  // console.log("accontswitchkey ::", switchAccountkey);
  // console.log("navigation ::", navigation);
  // console.log(
  //   "URL Update Status======>",
  //   Constant.baseURL + Constant.end_Point.UPADTE_USERINFO
  // );

  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.UPADTE_USERINFO,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + key,
          "Content-Type": "application/json",
          "Content-Length": "<calculated when request is sent>",
        },
        body: JSON.stringify(bodyData),
      }
    );

    let responseJson = yield response.json();

    if (switchAccountkey !== undefined) {
      if (responseJson.userType === "Business User") {
        // console.log("responseJson.userType :::", responseJson.userType);
        if (responseJson.switchedToCustomerViewApk === false) {
          AsyncStorage.setItem("UserType", "Business User");
        } else {
          AsyncStorage.setItem("UserType", "Customer User");
        }
      } else {
        AsyncStorage.setItem("UserType", "Customer User");
      }
      navigation.replace("HomeStack");
      yield put(ReduxActions.GetProfileDataResponse(null));
      yield put(ReduxActions.GetUserJobResponse(null));
      yield put(ReduxActions.LeadResponse(null));
    }

    yield put(ReduxActions.UpadateUserInfoResponse(responseJson));

    yield put(ReduxActions.loaderAction(false));
  } catch (err) {
    console.log(err);
    yield put(
      ReduxActions.ToastDisplay({
        type: "negative",
        title: "error",
      })
    );
    yield put(ReduxActions.loaderAction(false));
  }
}
