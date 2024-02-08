import { put, call } from "redux-saga/effects";
import Constant from "../../theme/Constant";
import AsyncStorage from "../../helper/AsyncStorage";
import ReduxActions from "../../helper/ReduxActions";
export function* hiredUserSaga(action) {
  const { jobId, bodydata } = action;
  // console.log("jobId ::", jobId);
  // console.log("bodyData ::", bodydata);
  // console.log(
  //   "URL hiredUserSaga======>",
  //   Constant.baseURL + Constant.end_Point.UPDATE_STATUS + jobId
  // );

  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });
  // console.log("token :::", key);

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.UPDATE_STATUS + jobId,
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + key,
          "Content-Type": "application/json",
          "Content-Length": "<calculated when request is sent>",
        },
        body: JSON.stringify(bodydata),
      }
    );

    let responseJson = yield response.json();
    // console.log(
    //   "responseJson  hiredUserSaga => ",
    //   JSON.stringify(responseJson)
    // );
    yield put(ReduxActions.HiredUserResponse(responseJson.data));
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
