import { put } from "redux-saga/effects";
import ReduxActions from "../../helper/ReduxActions";
import Constant from "../../theme/Constant";
import AsyncStorage from "../../helper/AsyncStorage";

export function* askQuestionSaga(action) {
  const { bodydata } = action;
  console.log("askQuestionSaga", JSON.stringify(bodydata));
  console.log(
    "askQuestionSaga URL======>",
    Constant.baseURL + Constant.end_Point.ASK_QUESTION
  );

  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.ASK_QUESTION,
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + key,
          Accept: "application/json",
          "Content-Type": "application/json",
          "Content-Length": "<calculated when request is sent>",
        },
        body: JSON.stringify(bodydata),
      }
    );

    console.log("responseJson askQuestionSaga => ", response.status);
    if (response.status === 200) {
      yield put(
        ReduxActions.ToastDisplay({
          type: "positive",
          title: "Ask question successsfully.",
        })
      );
      yield put(ReduxActions.AskQuestionRespons("Ask question successsfully."));
    }

    yield put(ReduxActions.loaderAction(false));
  } catch (err) {
    console.log("Ask question Saag File :::", err);
    yield put(
      ReduxActions.ToastDisplay({
        type: "negative",
        title: err.message,
      })
    );
    yield put(ReduxActions.loaderAction(false));
  }
}
