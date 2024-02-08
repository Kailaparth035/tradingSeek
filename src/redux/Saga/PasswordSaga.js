import { put } from "redux-saga/effects";
import { PasswordResponse } from "../Action/PasswordAction";
import { loaderAction } from "../Action/LoaderAction";
import { ToastDisplay } from "../Action/ToastAction";
import Constant from "../../theme/Constant";

export function* passwordSaga(action) {
  const { bodydata, navigation } = action;

  // console.log("bodydata", bodydata);
  // console.log("URL======>", Constant.baseURL + Constant.end_Point.PASSWORD);

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.PASSWORD,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodydata),
      }
    );

    let responseJson = yield response.json();

    // console.log("responseJson passwordSaga => ", responseJson);

    yield put(PasswordResponse(responseJson));
    yield put(loaderAction(false));
  } catch (err) {
    console.log(err);
    // yield put(
    //   ToastDisplay({
    //     type: "negative",
    //     title: "Invalid credentials. Please try again.",
    //   })
    // );
    yield put(loaderAction(false));
  }
}
