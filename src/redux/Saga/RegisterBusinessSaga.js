import { put } from "redux-saga/effects";
import { RegisterBusinessResponse } from "../Action/RegisterBusinessAction";
import Constant from "../../theme/Constant";
import ReduxActions from "../../helper/ReduxActions";
import AsyncStorage from "../../helper/AsyncStorage";

export function* registerBusinessSaga(action) {
  const { bodyData, navigation, key } = action;

  // console.log("registerBusinessSaga=======>", bodyData.createBusiness);
  // console.log("key=======>", key);
  // console.log("URL======>", Constant.baseURL + Constant.end_Point.SIGNUP);

  // let profileDetails = yield AsyncStorage.getItem("token").then((value) => {
  //   var header = value;
  //   return header;
  // });
  let profileDetails = yield AsyncStorage.getItem("userProfile").then(
    (profileData) => {
      var header = profileData;
      return header;
    }
  );

  // console.log("profileDetails ::", profileDetails);
  try {
    const response = yield fetch(Constant.baseURL + Constant.end_Point.SIGNUP, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    let responseJson = yield response.json();

    // console.log(
    //   "responseJson registerBusinessSaga =>",
    //   JSON.stringify(responseJson)
    // );
    if (responseJson.success === "Business user registered successfully") {
      yield put(
        ReduxActions.ToastDisplay({
          type: "positive",
          title: responseJson.success,
        })
      );
      yield put(ReduxActions.RegisterBusinessRequest(responseJson.success));
      if (key === "AfterLogin") {
        let switchAccountkey = "switchAccount";

        let switchingData = {
          value:
            profileDetails.switchedToCustomerViewApk === false ? "true" : "false",
          field: "switchedToCustomerViewApk",
        };
        yield put(ReduxActions.loaderAction(true));
        yield put(
          ReduxActions.UpadateUserInfoRequest(
            switchingData,
            switchAccountkey,
            navigation
          )
        );
      } else if (key === "BeforeLogin") {
        navigation.replace("LoginStack");
      }
    } else {
      yield put(
        ReduxActions.ToastDisplay({
          type: "negative",
          title: responseJson.error,
        })
      );
    }
    yield put(ReduxActions.loaderAction(false));
  } catch (err) {
    console.log(err);
    yield put(ReduxActions.loaderAction(false));
  }
}
