import { put, call } from "redux-saga/effects";
import { UpdateDescriptionResponse } from "../Action/UpadateDescriptionAction";
import Constant from "../../theme/Constant";
import { loaderAction } from "../Action/LoaderAction";
import { ToastDisplay } from "../Action/ToastAction";
// import AsyncStorage from "../../helper/AsyncStorage";
export function* updateDescriptionSaga(action) {
  const { bodyData } = action;

  // console.log("bodyData======", JSON.stringify(bodyData));
  // console.log(
  //   "URL updateDescriptionSaga Status======>",
  //   Constant.baseURL + Constant.end_Point.UPDATE_DESCRIPTION
  // );

  // let key = yield AsyncStorage.getItem("token").then((value) => {
  //   var header = value;
  //   return header;
  // });

  try {
    const response = yield fetch(
      Constant.baseURL + Constant.end_Point.UPDATE_DESCRIPTION,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": "<calculated when request is sent>",
        },
        body: JSON.stringify({ data: bodyData }),
      }
    );

    let responseJson = yield response.json();

    // console.log(
    //   "responseJson  updateDescriptionSaga => ",
    //   JSON.stringify(responseJson)
    // );
    if (responseJson.message === "description updated successfully") {
      // yield put(
      //   ToastDisplay({
      //     type: "positive",
      //     title: responseJson.message,
      //   })
      // );
    } else {
      yield put(
        ToastDisplay({
          type: "negative",
          title: responseJson.message,
        })
      );
    }
    yield put(UpdateDescriptionResponse(responseJson));
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
