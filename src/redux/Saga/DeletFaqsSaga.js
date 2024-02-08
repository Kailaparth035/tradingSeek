import { put } from "redux-saga/effects";
import ReduxActions from "../../helper/ReduxActions";
import Constant from "../../theme/Constant";
import AsyncStorage from "../../helper/AsyncStorage";

export function* deletFaqsSaga(action) {
  const { id } = action;
  // console.log("deletFaqsSaga", JSON.stringify(id));
  // console.log(
  //   "deletFaqsSaga URL======>",
  //   Constant.baseURL + Constant.end_Point.DELET_FAQS  + id
  // );

  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.DELET_FAQS + id,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + key,
          Accept: "application/json",
        },
      }
    );
    let responseJson = yield response.json();
    // console.log("responseJson deletFaqsSaga => ", responseJson);
    if (response.status === 200) {
      yield put(
        ReduxActions.ToastDisplay({
          type: "positive",
          title: responseJson,
        })
      );
    }
    yield put(ReduxActions.GetFaqResponse(null));
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
