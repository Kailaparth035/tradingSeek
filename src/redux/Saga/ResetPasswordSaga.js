import { put, call } from "redux-saga/effects";
import { ResetPasswordResponse } from "../Action/ResetPasswordAction";
import Constant from "../../theme/Constant";
import { loaderAction } from "../Action/LoaderAction";
import { ToastDisplay } from "../Action/ToastAction";
import AsyncStorage from "../../helper/AsyncStorage";
export function* resetPasswordSaga(action) {
  const { bodyData } = action;

  // console.log("resetPasswordSaga Call======= ");
  // console.log("bodyData======", JSON.stringify(bodyData));
  // console.log(
  //   "URL Update Status======>",
  //   Constant.baseURL + Constant.end_Point.RESET_PASSWORD
  // );

  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.RESET_PASSWORD,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + key,
          "Content-Type": "application/json",
          "Content-Length": "<calculated when request is sent>",
        },
        body: JSON.stringify({ data: bodyData }),
      }
    );

    let responseJson = yield response.json();

    // console.log("responseJson  resetPasswordSaga => ", responseJson);
    if (responseJson.message === "Password Updated Successfully") {
      yield put(
        ToastDisplay({
          type: "positive",
          title: responseJson.message,
        })
      );
    } else {
      yield put(
        ToastDisplay({
          type: "negative",
          title: responseJson.message,
        })
      );
    }
    yield put(ResetPasswordResponse(responseJson));
    yield put(loaderAction(false));
  } catch (err) {
    console.log(err);
    yield put(
      ToastDisplay({
        type: "negative",
        title: "error",
      })
    );
    yield put(loaderAction(false));
  }
}
