import { put } from "redux-saga/effects";
import ReduxActions from "../../helper/ReduxActions";
import Constant from "../../theme/Constant";
import AsyncStorage from "../../helper/AsyncStorage";

export function* deletCredentialSaga(action) {
  const { bodydata } = action;
  console.log("deletCredentialSaga", JSON.stringify(bodydata));
  console.log(
    "deletFaqsSaga URL======>",
    Constant.baseURL + Constant.end_Point.DELET_CREDENTIAL
  );

  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.DELET_CREDENTIAL,
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
    console.log("responseJson deletCredentialSaga => ", responseJson);
    if (response.status === 200) {
      yield put(
        ReduxActions.ToastDisplay({
          type: "positive",
          title: responseJson,
        })
      );
    }
    yield put(ReduxActions.GetProfileDataResponse(null));
    // yield put(ReduxActions.deletCredentialSaga(null));
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
