import { put } from "redux-saga/effects";
// import { loaderAction } from "../Action/LoaderAction";
// import { ToastDisplay } from "../Action/ToastAction";
// import { BussinessNumberResponse } from "../Action/BussinessNumberAction";
import ReduxActions from "../../helper/ReduxActions";
import Constant from "../../theme/Constant";

export function* bussinessnumberSaga(action) {
  const { Business } = action;
  // console.log("Call BussinessNumberSaga======= ");
  // console.log("Business nzbn======= ", Business);
  try {
    const response = yield fetch(Constant.bussinessURL + Business, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer dd41bb5137cf5fe45c62d6e7e6692d6b",
      },
    });

    let responseJson = yield response.json();
    // console.log(
    //   "responseJson  BussinessNumberSaga => ",
    //   JSON.stringify(responseJson)
    // );

    yield put(ReduxActions.BussinessNumberResponse(responseJson));
    yield put(ReduxActions.loaderAction(false));
  } catch (err) {
    console.log("Business Number Saag File :::", err);
    yield put(
      ReduxActions.ToastDisplay({
        type: "negative",
        title: err.message,
      })
    );
    yield put(ReduxActions.loaderAction(false));
  }
}
