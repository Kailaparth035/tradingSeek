import { put } from "redux-saga/effects";
import ReduxActions from "../../helper/ReduxActions";
import AsyncStorage from "../../helper/AsyncStorage";
import Constant from "../../theme/Constant";

export function* leadSaga(action) {
  const { bodydata, lead_type } = action;
  // console.log("leadSaga bodyData", bodydata);

  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });
  // console.log("Lead Api token Token :::", key);

  // console.log("URL leadSaga======>", Constant.baseURL + lead_type);
  try {
    const response = yield fetch(Constant.baseURL + lead_type, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + key,
        "Content-Type": "application/json",
        "Content-Length": "<calculated when request is sent>",
      },
      body: JSON.stringify(bodydata),
    });

    let responseJson = yield response.json();
    // console.log("responseJson leadSaga => ", responseJson);
    if (responseJson.length === undefined) {
      yield put(ReduxActions.LeadResponse(undefined));
    } else {
      yield put(ReduxActions.LeadResponse(responseJson));
    }

    yield put(ReduxActions.loaderAction(false));
  } catch (err) {
    yield put(
      ReduxActions.ToastDisplay({
        type: "negative",
        title: err.message,
      })
    );
    yield put(ReduxActions.loaderAction(false));
  }
}
