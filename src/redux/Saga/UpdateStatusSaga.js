import { put, call } from "redux-saga/effects";
import { UpdateStatusResponse } from "../Action/UpdateStatusAction";
import Constant from "../../theme/Constant";
import { loaderAction } from "../Action/LoaderAction";
import { ToastDisplay } from "../Action/ToastAction";
import AsyncStorage from "../../helper/AsyncStorage";
export function* updateStatusSaga(action) {
  const { jobId, updateStatus, statusReason } = action;

  // console.log("updateStatusSaga Call======= ");
  // console.log("jobId======", jobId);
  // console.log(
  //   "bodyData======",
  //   JSON.stringify({ status: updateStatus, reason: statusReason })
  // );
  // console.log(
  //   "URL Update Status======>",
  //   Constant.baseURL + Constant.end_Point.UPDATE_STATUS + jobId
  // );

  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.UPDATE_STATUS + jobId,
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + key,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updateStatus, reason: statusReason }),
      }
    );

    let responseJson = yield response.json();

    // console.log("responseJson  updateStatus => ", responseJson);
    if (responseJson.message === "Status Updated Successfully") {
      yield put(UpdateStatusResponse(responseJson.message));
    } else {
      yield put(UpdateStatusResponse(responseJson.message));
      yield put(
        ToastDisplay({
          type: "negative",
          title: responseJson.message,
        })
      );
    }
    yield put(loaderAction(false));
  } catch (err) {
    console.log(err);
    yield put(
      ToastDisplay({
        type: "negative",
        title: "error",
      })
    );
    yield put(loaderAction(false));
  }
}
