import { put } from "redux-saga/effects";

import { LoginResponse } from "../Action/LoginAction";
import AsyncStorage from "../../helper/AsyncStorage";
import { loaderAction } from "../Action/LoaderAction";
import { ToastDisplay } from "../Action/ToastAction";
import ReduxActions from "../../helper/ReduxActions";
import Constant from "../../theme/Constant";

export function* loginSaga(action) {
  const { bodydata, navigation, key } = action;
  // console.log("key:::", key);
  // console.log("bodydata", bodydata);
  // console.log("URL======>", Constant.baseURL + Constant.end_Point.LOGIN);

  try {
    const response = yield fetch(Constant.baseURL + Constant.end_Point.LOGIN, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodydata),
    });

    let responseJson = yield response.json();

    if (responseJson.message === "Auth successful") {
      if (key !== "postjob") {
        if (responseJson.user.userType === "Business User") {
          if (responseJson.user.switchedToCustomerViewApk === false) {
            AsyncStorage.setItem("UserType", "Business User");
          } else {
            AsyncStorage.setItem("UserType", "Customer User");
          }
        } else {
          AsyncStorage.setItem("UserType", "Customer User");
        }
        AsyncStorage.setItem("token", responseJson.token);
        AsyncStorage.setItem("userId", responseJson.user._id);
        AsyncStorage.setItem("login", "true");
        AsyncStorage.setItem("userProfile", JSON.stringify(responseJson));
        navigation.replace("HomeStack");
      } else {
        AsyncStorage.setItem("userId", responseJson.user._id);
      }
    } else {
      yield put(
        ToastDisplay({
          type: "negative",
          title: "Invalid credentials. Please try again.",
        })
      );
    }
    yield put(LoginResponse(responseJson.message));
    yield put(ReduxActions.LeadResponse(null));
    yield put(ReduxActions.GetUserJobResponse(null));
    yield put(loaderAction(false));
  } catch (err) {
    // console.log(err);
    yield put(
      ToastDisplay({
        type: "negative",
        title: "Invalid credentials. Please try again.",
      })
    );
    yield put(loaderAction(false));
  }
}
