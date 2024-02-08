import { put } from "redux-saga/effects";
// import { loaderAction } from "../Action/LoaderAction";
import ReduxActions from "../../helper/ReduxActions";
// import { EmailVerifyResponse } from "../Action/EmailVerifyAction";
import Constant from "../../theme/Constant";

export function* emailVerifySaga(action) {
  const { EmailVerify } = action;
  // console.log("Call emailVerifySaga======= ", EmailVerify);
  // console.log(
  //   "URL======>",
  //   Constant.baseURL +
  //     Constant.end_Point.EmailVerify +
  //     "?userEmail=" +
  //     EmailVerify
  // );
  try {
    const response = yield fetch(
      Constant.baseURL +
        Constant.end_Point.EmailVerify +
        "?userEmail=" +
        EmailVerify,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      }
    );

    let responseJson = yield response.json();
    // console.log("responseJson  emailVerifySaga => ", responseJson);
    if (responseJson !== null) {
      if (responseJson.email == EmailVerify) {
        yield put(ReduxActions.EmailVerifyResponse(responseJson));
      } else {
        yield put(ReduxActions.EmailVerifyResponse(responseJson));
      }
    } else {
      yield put(ReduxActions.EmailVerifyResponse(""));
    }
    yield put(ReduxActions.loaderAction(false));
  } catch (err) {
    // console.log(err);
    yield put(ReduxActions.loaderAction(false));
  }
}
