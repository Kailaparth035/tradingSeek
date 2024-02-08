import { put } from "redux-saga/effects";

import ReduxActions from "../../helper/ReduxActions";
// import { AccountActivateResponse } from "../Action/AccountActivateAction";
// import { loaderAction } from "../Action/LoaderAction";
// import { ToastDisplay } from "../Action/ToastAction";

import Constant from "../../theme/Constant";

export function* accountActivateSaga(action) {
  const { bodyData, navigation } = action;
  // console.log("bodydata", bodyData);
  // console.log(
  //   "URL======>",
  //   Constant.baseURL + Constant.end_Point.ACCOUNT_ACTIVATE
  // );

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.ACCOUNT_ACTIVATE,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Content-Length": "<calculated when request is sent>",
        },
        body: JSON.stringify(bodyData),
      }
    );

    let responseJson = yield response.json();
    // console.log("responseJson accountActivateSaga => ", responseJson);
    if (responseJson.result === "User activated") {
      yield put(ReduxActions.AccountActivateResponse(responseJson));
      yield put(ReduxActions.loaderAction(false));
    } else {
      yield put(ReduxActions.AccountActivateResponse(responseJson));
      yield put(ReduxActions.loaderAction(false));
      yield put(
        ReduxActions.ToastDisplay({
          type: "negative",
          title: "Account is not detected ",
        })
      );
    }

    yield put(ReduxActions.loaderAction(false));
  } catch (err) {
    console.log("Account Saag File :::", err);
    yield put(
      ToastDisplay({
        type: "negative",
        title: err.message,
      })
    );
    yield put(loaderAction(false));
  }
}
