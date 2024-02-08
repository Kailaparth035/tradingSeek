import { put } from "redux-saga/effects";
import AsyncStorage from "../../helper/AsyncStorage";
import ReduxActions from "../../helper/ReduxActions";
import Constant from "../../theme/Constant";

export function* seenMessageSaga(action) {
  const { bodydata } = action;

  // console.log("bodydata", bodydata);
  // console.log("URL======>", Constant.baseURL + Constant.end_Point.SEEN_MESSAGE);
  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.SEEN_MESSAGE,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + key,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodydata),
      }
    );

    let responseJson = yield response.json();

    // console.log("responseJson seenMessageSaga =>", responseJson);

    yield put(ReduxActions.SeenMessageResponse(responseJson));
    // yield setTimeout(()=>{
    yield put(ReduxActions.loaderAction(false));
    // },3000)
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
