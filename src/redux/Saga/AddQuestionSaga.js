import { put } from "redux-saga/effects";
import ReduxActions from "../../helper/ReduxActions";
import Constant from "../../theme/Constant";
import AsyncStorage from "../../helper/AsyncStorage";

export function* addQuestionSaga(action) {
  const { bodydata } = action;
  // console.log("addQuestionSaga", JSON.stringify(bodydata));
  // console.log(
  //   "addQuestionSaga URL======>",
  //   Constant.baseURL + Constant.end_Point.ADD_QUESTION
  // );

  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.ADD_QUESTION,
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
    // console.log("responseJson addQuestionSaga => ", responseJson);

    if (response.status === 200) {
      yield put(ReduxActions.GetFaqResponse(null));
    }
    yield put(ReduxActions.AddQuestionResponse(responseJson));
    yield put(ReduxActions.loaderAction(false));
  } catch (err) {
    console.log("Add Question Saag File :::", err);
    yield put(
      ReduxActions.ToastDisplay({
        type: "negative",
        title: err.message,
      })
    );
    yield put(ReduxActions.loaderAction(false));
  }
}
