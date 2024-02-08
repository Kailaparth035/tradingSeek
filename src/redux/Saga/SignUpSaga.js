import { put } from "redux-saga/effects";
import { SignUpResponse } from "../Action/SignUpAction";
import Constant from "../../theme/Constant";
import { loaderAction } from "../Action/LoaderAction";
import { ToastDisplay } from "../Action/ToastAction";

export function* signUpSaga(action) {
  const { bodyData, navigation, key } = action;
  // console.log("bodyData======", JSON.stringify(bodyData));
  // console.log("URL======>", Constant.baseURL + Constant.end_Point.SIGNUP);

  try {
    const response = yield fetch(Constant.baseURL + Constant.end_Point.SIGNUP, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(bodyData),
    });
    let responseJson = yield response.json();
    // console.log("responseJson signUpSaga => ", JSON.stringify(responseJson));

    if (responseJson.success === "User registered successfully") {
      yield put(
        ToastDisplay({
          type: "positive",
          title: responseJson.success,
        })
      );
      if (key !== "postjob") {
        navigation.replace("Login");
      }
    } else {
      if (responseJson.success === "Business user registered successfully") {
        yield put(SignUpResponse(responseJson.success));
      } else {
        yield put(
          ToastDisplay({
            type: "negative",
            title: responseJson.error,
          })
        );
      }
    }
    yield put(SignUpResponse(responseJson.success));
    yield put(loaderAction(false));
  } catch (err) {
    console.log(err);
    yield put(
      ToastDisplay({
        type: "negative",
        title: err.message,
      })
    );
    yield put(loaderAction(false));
  }
}
