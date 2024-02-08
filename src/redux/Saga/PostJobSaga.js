import { put } from "redux-saga/effects";
import { PostJobResponse } from "../Action/PostJobAction";
import Constant from "../../theme/Constant";
import { loaderAction } from "../Action/LoaderAction";
import { ToastDisplay } from "../Action/ToastAction";
import AsyncStorage from "../../helper/AsyncStorage";

export function* PostJobSaga(action) {
  const { bodyData, navigation } = action;

  // console.log("PostJobSaga======= ");
  // console.log("bodyData======", JSON.stringify(bodyData));

  // console.log("URL =====>", Constant.baseURL + Constant.end_Point.PostJob);

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.PostJob,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": "<calculated when request is sent>",
        },
        body: JSON.stringify(bodyData),
      }
    );

    let responseJson = yield response.json();
    // console.log("responseJson  PostJobSaga => ", responseJson);
    if (
      responseJson ===
        "Job posted successfully.Verification email has been sent on your email address." ||
      responseJson === "Job posted successfully"
    ) {
      yield put(
        ToastDisplay({
          type: "positive",
          title: responseJson,
        })
      );
    } else {
      yield put(
        ToastDisplay({
          type: "negative",
          title: "Post A job data not save.",
        })
      );
    }
    yield put(PostJobResponse(responseJson));
    yield put(loaderAction(false));
  } catch (err) {
    // console.log(err);
    yield put(
      ToastDisplay({
        type: "negative",
        title: err.message,
      })
    );
    yield put(loaderAction(false));
  }
}
