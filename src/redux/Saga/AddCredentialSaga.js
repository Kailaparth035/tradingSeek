import { put } from "redux-saga/effects";
import ReduxActions from "../../helper/ReduxActions";
import Constant from "../../theme/Constant";
import AsyncStorage from "../../helper/AsyncStorage";

export function* addCredentialSaga(action) {
  const { bodydata } = action;
  console.log("addCredentialSaga", JSON.stringify(bodydata));
  // console.log(
  //   "addCredentialSaga URL======>",
  //   Constant.baseURL + Constant.end_Point.ADD_CREDENTIAL
  // );

  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.ADD_CREDENTIAL,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + key,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          "Content-Length": "<calculated when request is sent>",
        },
        body: bodydata,
      }
    );
    let responseJson = yield response.json();
    console.log(
      "responseJson addCredentialSaga => ",
      JSON.stringify(responseJson)
    );
    if (response.status === 200) {
      yield put(
        ReduxActions.ToastDisplay({
          type: "positive",
          title: "Credential add successfully.",
        })
      );
    }
    yield put(ReduxActions.GetProfileDataResponse(null));
    yield put(ReduxActions.AddCredentialResponse(responseJson));
    yield put(ReduxActions.loaderAction(false));
  } catch (err) {
    console.log("Add credential Saag File :::", err);
    yield put(
      ReduxActions.ToastDisplay({
        type: "negative",
        title: err.message,
      })
    );
    yield put(ReduxActions.loaderAction(false));
  }
}
