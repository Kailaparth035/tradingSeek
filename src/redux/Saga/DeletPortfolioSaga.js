import { put } from "redux-saga/effects";
import ReduxActions from "../../helper/ReduxActions";
import Constant from "../../theme/Constant";
import AsyncStorage from "../../helper/AsyncStorage";

export function* deletPortfolioSaga(action) {
  const { url } = action;

  console.log("deletPortfolioSaga URL======>", url);

  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });

  try {
    const response = yield fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + key,
        Accept: "application/json",
      },
      
    });
    let responseJson = yield response.json();
    console.log("responseJson deletPortfolioSaga => ", responseJson);
    if (response.status === 200) {
      yield put(
        ReduxActions.ToastDisplay({
          type: "positive",
          title: responseJson,
        })
      );
    }
    yield put(ReduxActions.DeletPortFolioResponse(responseJson));
    yield put(ReduxActions.GetProfileDataResponse(null));
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
