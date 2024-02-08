import { put, call } from "redux-saga/effects";
import { UpdateUserNameResponse } from "../Action/UpdateUseNameAction";
import Constant from "../../theme/Constant";
import { loaderAction } from "../Action/LoaderAction";
import { ToastDisplay } from "../Action/ToastAction";
import AsyncStorage from "../../helper/AsyncStorage";
export function* updateUserNameSaga(action) {
  const { bodyData } = action;

  // console.log("bodyData======", JSON.stringify(bodyData));
  // console.log(
  //   "URL Update Status======>",
  //   Constant.baseURL + Constant.end_Point.UPDATE_USERNAME
  // );

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.UPDATE_USERNAME,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": "<calculated when request is sent>",
        },
        body: JSON.stringify(bodyData),
      }
    );

    let responseJson = yield response.json();

    // console.log("responseJson  updateUserNameSaga => ", responseJson);
    if (responseJson.message === "User updated successfully") {
      yield put(UpdateUserNameResponse(responseJson));
      AsyncStorage.setItem("userProfile", JSON.stringify(responseJson.result));
    } else {
      yield put(
        ToastDisplay({
          type: "negative",
          title: responseJson.message,
        })
      );
    }
    yield put(UpdateUserNameResponse(responseJson));
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
