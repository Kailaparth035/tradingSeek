import { put } from "redux-saga/effects";
import ReduxActions from "../../helper/ReduxActions";
import AsyncStorage from "../../helper/AsyncStorage";
import Constant from "../../theme/Constant";

export function* conversationMsgSaga(action) {
  const { conversationId, pageSize } = action;
  let userId = yield AsyncStorage.getItem("userId").then((value) => {
    var header = value;
    return header;
  });

  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });

  console.log("conversationMsgSaga api call =============> ", pageSize);

  console.log(
    "URL for conversationMsgSaga ======>",
    Constant.baseURL +
      Constant.end_Point.CONVERSATION_MSG +
      "?conversationId=" +
      conversationId +
      "&perPage=" +
      pageSize
  );
  // console.log("ViewResponse ======>", ViewResponse);
  try {
    const response = yield fetch(
      Constant.baseURL +
        Constant.end_Point.CONVERSATION_MSG +
        "?conversationId=" +
        conversationId +
        "&perPage=" +
        pageSize,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + key,
        },
      }
    );

    let responseJson = yield response.json();
    console.log("responseJson :::", JSON.stringify(responseJson));
    yield put(ReduxActions.ConversationMsgResponse(responseJson));
    yield put(ReduxActions.loaderAction(false));
  } catch (err) {
    console.log("conversationMsgSaga Saag File :::", err);
    yield put(
      ReduxActions.ToastDisplay({
        type: "negative",
        title: err.message,
      })
    );
    yield put(ReduxActions.loaderAction(false));
  }
}
