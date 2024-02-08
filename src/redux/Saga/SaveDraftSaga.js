import { put } from "redux-saga/effects";
import ReduxActions from "../../helper/ReduxActions";
import Constant from "../../theme/Constant";
import AsyncStorage from "../../helper/AsyncStorage";

export function* saveDraftSaga(action) {
  const { bodydata } = action;
  // console.log("saveDraftSaga", JSON.stringify(bodydata));
  // console.log(
  //   "saveDraftSaga URL======>",
  //   Constant.baseURL + Constant.end_Point.SAVE_DRAFT
  // );

  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.SAVE_DRAFT,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + key,
          Accept: "application/json",
          "Content-Type": "application/json",
          "Content-Length": "<calculated when request is sent>",
        },
        body: JSON.stringify(bodydata),
      }
    );
    let responseJson = yield response.json();
    // console.log("responseJson saveDraftSaga => ", responseJson);
    if (response.status === 200) {
    }
    yield put(ReduxActions.SaveDraftResponse(responseJson));
    yield put(ReduxActions.LeadResponse(null));
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
