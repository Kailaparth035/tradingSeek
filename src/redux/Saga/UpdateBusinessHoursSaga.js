import { put } from "redux-saga/effects";
import ReduxActions from "../../helper/ReduxActions";
import Constant from "../../theme/Constant";
import AsyncStorage from "../../helper/AsyncStorage";

export function* updateBusinessHoursSaga(action) {
  const { bodyData } = action;
  // console.log("updateBusinessHoursSaga", JSON.stringify(bodyData));
  // console.log(
  //   "updateBusinessHoursSaga URL======>",
  //   Constant.baseURL + Constant.end_Point.UPDATE_BUSINESS_HOURS
  // );

  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.UPDATE_BUSINESS_HOURS,
      {
        method: "PUT",
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
    // console.log("responseJson updateBusinessHoursSaga => ", responseJson);
    if (response.status === 200) {
      AsyncStorage.setItem("userProfile", JSON.stringify(responseJson));
      yield put(ReduxActions.UpdateBusinessHoursResponse(responseJson));
    }

    yield put(ReduxActions.loaderAction(false));
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
