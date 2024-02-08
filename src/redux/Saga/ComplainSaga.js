import { put } from "redux-saga/effects";
import ReduxActions from "../../helper/ReduxActions";
import Constant from "../../theme/Constant";
import AsyncStorage from "../../helper/AsyncStorage";

export function* complaintSaga(action) {
  const { bodydata, navigation } = action;
  console.log("complaintSaga bodydata", bodydata);
  // console.log(
  //   "complaintSaga URL======>",
  //   Constant.baseURL + Constant.end_Point.COMPLAINT
  // );

  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.COMPLAINT,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + key,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          "Content-Length": "<calculated when request is sent>",
        },
        body: bodydata,
      }
    );
    let responseJson = yield response.json();
    console.log("responseJson complaintSaga => ", JSON.stringify(responseJson));
    console.log("response :::", JSON.stringify(response));
    if (response.status === 200) {
      yield put(
        ReduxActions.ToastDisplay({
          type: "positive",
          title: " Complaint has been registered.",
        })
      );
      yield put(ReduxActions.ComplainResponse(responseJson));
      // yield put(ReduxActions.GetProfileDataResponse(null));
    }
    yield put(ReduxActions.loaderAction(false));
  } catch (err) {
    console.log("Complain  Saag File :::",err);
    yield put(
      ReduxActions.ToastDisplay({
        type: "negative",
        title: err.message,
      })
    );
    yield put(ReduxActions.loaderAction(false));
  }
}
