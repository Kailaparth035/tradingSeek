import { put } from "redux-saga/effects";
import ReduxActions from "../../helper/ReduxActions";
import Constant from "../../theme/Constant";
import AsyncStorage from "../../helper/AsyncStorage";

export function* autoQuoteSaga(action) {
  const { bodydata } = action;
  // console.log("autoQuoteSaga", JSON.stringify(bodydata));
  // console.log(
  //   "autoQuoteSaga URL======>",
  //   Constant.baseURL + Constant.end_Point.AUTO_QUOT_SETTING
  // );

  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.AUTO_QUOT_SETTING,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + key,
          Accept: "application/json",
          "Content-Type": "application/json",
          "Content-Length": "<calculated when request is sent>",
        },
        body: JSON.stringify(bodydata),
      }
    );
    // let responseJson = yield response.json();
    // console.log("responseJson autoQuoteSaga => ", response.status);

    if (response.status === 200) {
      yield put(
        ReduxActions.ToastDisplay({
          type: "positive",
          title: "Upadte Auto-quote successfully.",
        })
      );
    }
    // yield put(ReduxActions.AutoQuoteResponse("Successfully"));
    yield put(ReduxActions.loaderAction(false));
  } catch (err) {
    console.log("Auto Quoting Saag File :::", err);
    yield put(
      ReduxActions.ToastDisplay({
        type: "negative",
        title: err.message,
      })
    );
    yield put(ReduxActions.loaderAction(false));
  }
}
