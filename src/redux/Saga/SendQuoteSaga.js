import { put } from "redux-saga/effects";
import ReduxActions from "../../helper/ReduxActions";
import AsyncStorage from "../../helper/AsyncStorage";
import Constant from "../../theme/Constant";

export function* sendQuoteSaga(action) {
  const { bodyData, navigation } = action;
  console.log("BodyData form sendQuoteSaga ===>", bodyData);
  console.log(
    "URL for sendQuoteSaga ======>",
    Constant.baseURL + Constant.end_Point.SEND_QUOTE
  );
  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });
  console.log("Token in sendMediaSaga", key);
  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.SEND_QUOTE,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": "<calculated when request is sent>",
          Authorization: "Bearer " + key,
        },
        body: JSON.stringify(bodyData),
      }
    );

    let responseJson = yield response.json();
    console.log(
      "responseJson for senderMessageSaga",
      JSON.stringify(responseJson)
    );
    console.log("response senderMessageSaga", JSON.stringify(response));
    if (response.status === 200) {
      yield put(
        ReduxActions.ToastDisplay({
          type: "positive",
          title: responseJson,
        })
      );
    } else {
      yield put(
        ReduxActions.ToastDisplay({
          type: "negative",
          title: responseJson,
        })
      );
    }

    yield put(ReduxActions.SendQuoteResponse(responseJson));
    yield put(ReduxActions.loaderAction(false));
    yield put(ReduxActions.LeadResponse(null));
    yield put(ReduxActions.GetProfileDataResponse(null));
    navigation.goBack();
  } catch (err) {
    console.log(JSON.parse(JSON.stringify(err)));
    yield put(
      ReduxActions.ToastDisplay({
        type: "negative",
        title: err.message,
      })
    );
    yield put(ReduxActions.loaderAction(false));
  }
}
