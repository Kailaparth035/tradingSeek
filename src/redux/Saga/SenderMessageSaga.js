import { put } from "redux-saga/effects";
import ReduxActions from "../../helper/ReduxActions";
import AsyncStorage from "../../helper/AsyncStorage";
import Constant from "../../theme/Constant";

export function* senderMessageSaga(action) {
  const { bodydata } = action;

  // console.log("BodyData form senderMessage ===>", bodydata);
  // console.log(
  //   "URL for senderMessageSaga ======>",
  //   Constant.baseURL + Constant.end_Point.SENDER_MESSAGE
  // );

  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });
  // console.log("Token in getProfileDataSaga", key);

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.SENDER_MESSAGE,
      {
        method: "POST",
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
    //   "responseJson for senderMessageSaga",
    //   JSON.stringify(responseJson)
    // );
    yield put(ReduxActions.SenderMessageResponse(responseJson));
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
