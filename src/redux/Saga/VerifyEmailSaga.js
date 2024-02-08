import { put } from "redux-saga/effects";
import Constant from "../../theme/Constant";
import ReduxActions from "../../helper/ReduxActions";

export function* verifyEmailSaga(action) {
  const { bodydata } = action;
  // console.log("bodydata", bodydata);
  // console.log("URL======>", Constant.baseURL + Constant.end_Point.VERIFY_EMAIL);

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.VERIFY_EMAIL,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Content-Length": "<calculated when request is sent>",
        },
        body: JSON.stringify(bodydata),
      }
    );

    let responseJson = yield response.json();
    // console.log("responseJson verifyEmailSaga => ", responseJson);
    if (
      responseJson.message === "Email send successfully" ||
      responseJson.message === "Verification email sent successfully"
    ) {
      yield put(
        ReduxActions.ToastDisplay({
          type: "positive",
          title: responseJson.message,
        })
      );
    }
    yield put(ReduxActions.VerifyEmailResponse(responseJson));
    yield put(ReduxActions.loaderAction(false));
  } catch (err) {
    console.log(err);
    yield put(
      ReduxActions.ToastDisplay({
        type: "negative",
        title: "Invalid credentials. Please try again.",
      })
    );
    yield put(loaderAction(false));
  }
}
