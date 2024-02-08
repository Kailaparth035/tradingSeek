import { put } from "redux-saga/effects";
import ReduxActions from "../../helper/ReduxActions";
import AsyncStorage from "../../helper/AsyncStorage";

import Constant from "../../theme/Constant";

export function* messagesSaga(action) {
  const { conversationId } = action;
  // console.log("MessagesSaga conversationId ==>", conversationId);

  // console.log(
  //   "URL for messagesSaga ======>",
  //   Constant.baseURL +
  //     Constant.end_Point.MESSAGES +
  //     "?conversationId=" +
  //     conversationId
  // );

  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });
  // console.log("Token in messagesSaga", key);
  try {
    const response = yield fetch(
      Constant.baseURL +
        Constant.end_Point.MESSAGES +
        "?conversationId=" +
        conversationId,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + key,
          Accept: "*/*",
        },
      }
    );

    let responseJson = yield response.json();
    // console.log("responseJson for messagesSaga", JSON.stringify(responseJson));
    yield put(ReduxActions.MessagesResponse(responseJson));
    yield put(ReduxActions.loaderAction(false));
  } catch (err) {
    // console.log(err);
    yield put(
      ReduxActions.ToastDisplay({
        type: "negative",
        title: err.message,
      })
    );
    yield put(ReduxActions.loaderAction(false));
  }
}
