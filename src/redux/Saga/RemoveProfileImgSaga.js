import { put } from "redux-saga/effects";
import ReduxActions from "../../helper/ReduxActions";
import Constant from "../../theme/Constant";
import AsyncStorage from "../../helper/AsyncStorage";

export function* removeProfileImgSaga(action) {
  const { bodyData, navigation } = action;
  console.log("removeProfileImgSaga", JSON.stringify(bodyData));
  console.log(
    "removeProfileImgSaga URL======>",
    Constant.baseURL + Constant.end_Point.REMOVE_PROFILE_IMAGE
  );

  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.REMOVE_PROFILE_IMAGE,
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + key,
          Accept: "application/json",
          "Content-Type": "application/json",
          "Content-Length": "<calculated when request is sent>",
        },
        body: JSON.stringify(bodyData),
      }
    );
    let responseJson = yield response.json();
    console.log("responseJson removeProfileImgSaga => ", responseJson);
    if (response.status === 200) {
      yield put(
        ReduxActions.ToastDisplay({
          type: "positive",
          title: responseJson.message,
        })
      );
    }
    yield put(ReduxActions.RemoveProfileImgResponse(responseJson));
    yield put(ReduxActions.loaderAction(false));
    // yield put(ReduxActions.GetProfileDataResponse(null));
  } catch (err) {
    console.log(err);
    yield put(
      ReduxActions.ToastDisplay({
        type: "negative",
        title: err.message,
      })
    );
    yield put(ReduxActions.loaderAction(false));
  }
}
