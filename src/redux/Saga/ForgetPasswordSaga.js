import { put } from "redux-saga/effects";
// import { loaderAction } from "../Action/LoaderAction";
// import { ToastDisplay } from "../Action/ToastAction";
import ReduxActions from "../../helper/ReduxActions";

import Constant from "../../theme/Constant";

export function* forgetPasswordSaga(action) {
  const { email, navigation } = action;
  // console.log("Call forgetPasswordSaga======= ");
  // console.log("email======= ", email);
  // console.log(
  //   "URL======>",
  //   Constant.baseURL + Constant.end_Point.FORGET + "?email=" + email
  // );

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.FORGET + "?email=" + email,
      {
        method: "GET",
      }
    );

    let responseJson = yield response.json();

    // console.log("responseJson  forgetPasswordSaga => ", responseJson);
    if (responseJson === "User not found") {
      yield put(
        ReduxActions.ToastDisplay({
          type: "negative",
          title: responseJson,
        })
      );
    } else {
      navigation.replace("Login");
      yield put(
        ReduxActions.ToastDisplay({
          type: "positive",
          title: "Reset password link share in your email",
        })
      );
    }
    yield put(ReduxActions.loaderAction(false));
  } catch (err) {
    // console.log(err);
    yield put(
      ReduxActions.ToastDisplay({
        type: "negative",
        title: err.message,
      })
    );
    yield put(ReduxActions.loaderAction(false));
  }
}
