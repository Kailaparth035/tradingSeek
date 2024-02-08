import { put } from "redux-saga/effects";
import ReduxActions from "../../helper/ReduxActions";
import Constant from "../../theme/Constant";
import AsyncStorage from "../../helper/AsyncStorage";

export function* removeDraftSaga(action) {
  const { bodydata, navigation } = action;
  console.log("removeDraftSaga", JSON.stringify(bodydata));
  console.log(
    "removeDraftSaga URL======>",
    Constant.baseURL + Constant.end_Point.REMOVE_DRAFT
  );

  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.REMOVE_DRAFT,
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
    console.log("responseJson removeDraftSaga => ", responseJson);
    if (response.status === 200) {
      yield put(
        ReduxActions.ToastDisplay({
          type: "positive",
          title: responseJson,
        })
      );
    }
    yield put(ReduxActions.RemoveDraftResponse(responseJson));
    yield put(ReduxActions.loaderAction(false));
    yield put(ReduxActions.LeadResponse(null));
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
