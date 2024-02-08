import { put, call } from "redux-saga/effects";
import Constant from "../../theme/Constant";
import AsyncStorage from "../../helper/AsyncStorage";
import ReduxActions from "../../helper/ReduxActions";

export function* updateProfessionSaga(action) {
  const { bodyData } = action;

  // console.log("updateProfessionSaga Call======= ");
  // console.log("bodyData======", bodyData);
  // console.log(
  //   "URL Update Status======>",
  //   Constant.baseURL + Constant.end_Point.UPDATE_PROFESSION
  // );

  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.UPDATE_PROFESSION,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + key,
          "Content-Type": "application/json",
          "Content-Length": "<calculated when request is sent>",
        },
        body: JSON.stringify(bodyData),
      }
    );
    let responseJson = yield response.json();
    // console.log("responseJson  updateProfessionSaga => ", responseJson);
    yield put(
      ReduxActions.ToastDisplay({
        type: "positive",
        title: responseJson,
      })
    );
    yield put(ReduxActions.LeadResponse(null));
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
