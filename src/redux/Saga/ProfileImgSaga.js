import { put, call } from "redux-saga/effects";
import { ProfileImgResponse } from "../Action/ProfileImgAction";
import Constant from "../../theme/Constant";
import { loaderAction } from "../Action/LoaderAction";
import { ToastDisplay } from "../Action/ToastAction";
import ReduxActions from "../../helper/ReduxActions";
import AsyncStorage from "../../helper/AsyncStorage";

export function* profileImgSaga(action) {
  const { bodyData } = action;

  // console.log("profileImgSaga Call======= ");
  console.log("bodyData======", JSON.stringify(bodyData));
  // console.log(
  //   "URL======>",
  //   Constant.baseURL + Constant.end_Point.UPDATE_PROFILE_IMG
  // );

  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.UPDATE_PROFILE_IMG,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "multipart/form-data",
          "Content-Length": "<calculated when request is sent>",
          Authorization: "Bearer " + key,
        },
        body: bodyData,
      }
    );

    let responseJson = yield response.json();
    console.log("responseJson  profileImgSaga => ", responseJson);

    if (responseJson.responseCode === 200) {
      // alert("success");
      yield put(
        ToastDisplay({
          type: "positive",
          title: responseJson.message,
        })
      );
      yield put(ReduxActions.GetProfileDataResponse(null));
    } else {
      yield put(
        ToastDisplay({
          type: "negative",
          title: responseJson.message,
        })
      );
    }
    yield put(ProfileImgResponse(responseJson));
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
