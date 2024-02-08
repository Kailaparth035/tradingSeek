import { put } from "redux-saga/effects";
import ReduxActions from "../../helper/ReduxActions";
import AsyncStorage from "../../helper/AsyncStorage";

import Constant from "../../theme/Constant";

export function* deletAccountSaga(action) {
  // console.log(
  //   "URL for deletAccountSaga ======>",
  //   Constant.baseURL + Constant.end_Point.DELET_ACCOUNT
  // );

  const { navigation } = action;
  // console.log("navigation ===>", navigation);
  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });
  // console.log("Token in deletAccountSaga", key);
  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.DELET_ACCOUNT,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + key,
          Accept: "*/*",
        },
      }
    );

    let responseJson = yield response.json();
    // console.log("responseJson for deletAccountSaga", response.status);
    if (response.status === 200) {
      navigation.replace("LoginStack");
      AsyncStorage.removeItem("login");
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("userId");
      yield put(ReduxActions.LoginResponse(null));
    } else {
      yield put(
        ReduxActions.ToastDisplay({
          type: "negative",
          title: responseJson.msg,
        })
      );
    }

    yield put(ReduxActions.DeletAccountResponse(responseJson));
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
