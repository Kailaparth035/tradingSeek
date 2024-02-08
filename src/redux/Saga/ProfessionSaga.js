import { put } from "redux-saga/effects";
import { ProfessionResponse } from "../Action/ProfessionAction";
import { loaderAction } from "../Action/LoaderAction";
import { ToastDisplay } from "../Action/ToastAction";

import Constant from "../../theme/Constant";

export function* professionSaga() {
  // console.log(
  //   "URL for professionSaga ======>",
  //   Constant.baseURL + Constant.end_Point.PROFESSION
  // );

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.PROFESSION,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    // console.log("professionSaga ==>", responseJson);
    let responseJson = yield response.json();
    yield put(ProfessionResponse(responseJson.data));
    yield put(loaderAction(false));
  } catch (err) {
    console.log(err);
    yield put(
      ToastDisplay({
        type: "negative",
        title: err.message,
      })
    );
    yield put(loaderAction(false));
  }
}
