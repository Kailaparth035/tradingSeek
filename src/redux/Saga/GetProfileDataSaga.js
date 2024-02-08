import { put } from "redux-saga/effects";
import ReduxActions from "../../helper/ReduxActions";
// import { loaderAction } from "../Action/LoaderAction";
// import { ToastDisplay } from "../Action/ToastAction";
import AsyncStorage from "../../helper/AsyncStorage";

import Constant from "../../theme/Constant";

export function* getProfileDataSaga() {
  // console.log(
  //   "URL for getProfileDataSaga ======>",
  //   Constant.baseURL + Constant.end_Point.GETPROFILE_DATA
  // );

  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });
  // console.log("Token in getProfileDataSaga", key);
  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.GETPROFILE_DATA,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + key,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    let responseJson = yield response.json();
    // console.log(
    //   "responseJson for getProfileDataSaga",
    //   JSON.stringify(responseJson)
    // );
    if (responseJson !== null) {
      AsyncStorage.setItem("userType", responseJson.user.userType);
      AsyncStorage.setItem("userProfile", JSON.stringify(responseJson.user));
    }
    yield put(ReduxActions.GetProfileDataResponse(responseJson));
    yield put(ReduxActions.loaderAction(false));
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
