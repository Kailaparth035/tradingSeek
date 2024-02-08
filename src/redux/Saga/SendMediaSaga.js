import { put } from "redux-saga/effects";
import ReduxActions from "../../helper/ReduxActions";
import AsyncStorage from "../../helper/AsyncStorage";
import Constant from "../../theme/Constant";

export function* sendMediaSaga(action) {
  const { bodydata } = action;
  console.log("BodyData form sendMediaSaga ===>", bodydata);
  console.log(
    "URL for sendMediaSaga ======>",
    Constant.baseURL + Constant.end_Point.SEND_MEDIA_MESSAGE
  );
  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });
  console.log("Token in sendMediaSaga", key);
  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.SEND_MEDIA_MESSAGE,
      {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          // "Content-Length": "<calculated when request is sent>",
          Authorization: "Bearer " + key,
        },
        body: bodydata,
      }
    );

    let responseJson = yield response.json();
    console.log(
      "responseJson for senderMessageSaga",
      JSON.stringify(responseJson)
    );
    // yield put(ReduxActions.SendMedialResponse(responseJson));
    // yield put(ReduxActions.loaderAction(false));
  } catch (err) {
    console.log(JSON.parse(JSON.stringify(err)));
    yield put(
      ReduxActions.ToastDisplay({
        type: "negative",
        title: err.message,
      })
    );
    yield put(ReduxActions.loaderAction(false));
  }
}
