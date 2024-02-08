import { put } from "redux-saga/effects";
import ReduxActions from "../../helper/ReduxActions";

import Constant from "../../theme/Constant";

export function* ipInfoSaga() {
  // console.log("URL for ipInfoSaga ======>", Constant.Ipinfo);

  try {
    const response = yield fetch(Constant.Ipinfo, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "User-Agent": "PostmanRuntime/7.29.2",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
      },
    });

    let responseJson = yield response.json();
    // console.log("responseJson for ipInfoSaga", responseJson);

    yield put(ReduxActions.IpinfoResponse(responseJson));
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
