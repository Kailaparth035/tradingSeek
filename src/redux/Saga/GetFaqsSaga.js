import { put } from "redux-saga/effects";
import ReduxActions from "../../helper/ReduxActions";
import AsyncStorage from "../../helper/AsyncStorage";

import Constant from "../../theme/Constant";

export function* getFaqSaga() {
  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });
  // console.log("Token in getFaqSaga", key);
  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.GET_FAQS,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + key,
          // Accept: "application/json",
        },
      }
    );

    let responseJson = yield response.json();
    // console.log(
    //   "responseJson for getProfileDataSaga",
    //   JSON.stringify(responseJson)
    // );
    yield put(ReduxActions.GetFaqResponse(responseJson));
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
