import { put } from "redux-saga/effects";
import { OtpResponse } from "../Action/OtpAction";
import { loaderAction } from "../Action/LoaderAction";
import auth from "@react-native-firebase/auth";
import { ToastDisplay } from "../Action/ToastAction";

export function* otpSaga(action) {
  const { bodydata, navigation } = action;
  console.log("bodydata OtpSaga ====>", bodydata);
  try {
    const Confirmation = yield auth().signInWithPhoneNumber(bodydata);
    console.log("otpSaga confirmResult::", JSON.stringify(Confirmation));
    if (Confirmation !== "") {
      yield put(OtpResponse(Confirmation));
    }
    yield put(loaderAction(false));
  } catch (err) {
    // console.log("err ===>", JSON.stringify(err));
    // console.log("err.code ===>", err.code);

    if (err.code === "auth/invalid-phone-number") {
      yield put(
        ToastDisplay({
          type: "negative",
          title: "The format of the phone number provided is incorrect.",
        })
      );
    } else if (err.code === "auth/too-many-requests") {
      yield put(
        ToastDisplay({
          type: "negative",
          title:
            "We have blocked all requests from this device due to unusual activity. Try again later.",
        })
      );
    }

    console.log("errorr", err);
    yield put(loaderAction(false));
  }
}
