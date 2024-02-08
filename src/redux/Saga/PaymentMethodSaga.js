import { put } from "redux-saga/effects";
import ReduxActions from "../../helper/ReduxActions";
import Constant from "../../theme/Constant";
import AsyncStorage from "../../helper/AsyncStorage";

export function* paymentMethodSaga(action) {
  const { bodydata } = action;
  // console.log("paymentMethodSaga", JSON.stringify(bodydata));
  // console.log(
  //   "paymentMethodSaga URL======>",
  //   Constant.baseURL + Constant.end_Point.PAYMENT_METHOD
  // );

  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.PAYMENT_METHOD,
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
    let responseJson = yield response.json();
    // console.log("responseJson removeDraftSaga => ", responseJson);
    if (response.status === 200) {
      yield put(
        ReduxActions.ToastDisplay({
          type: "positive",
          title: "Payment method select successfully.",
        })
      );
    }
    yield put(ReduxActions.PaymentMethodResponse(responseJson));
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
