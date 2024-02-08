// import { put } from "redux-saga/effects";
// import ReduxActions from "../../helper/ReduxActions";
// import AsyncStorage from "../../helper/AsyncStorage";
// import Constant from "../../theme/Constant";

// console.log("Call GEtusersJob saga file :::");

// export function* getUserJobSaga(action) {
//   const { bodydata, jobType } = action;

//   console.log("getUserJobSaga jobType", jobType);

//   let key = yield AsyncStorage.getItem("token").then((value) => {
//     var header = value;
//     return header;
//   });

//   console.log("Job Api token Token :::", key);

// let url;
// if (jobType === "get-jobs-by-user-id") {
//   url =
//     Constant.baseURL +
//     Constant.end_Point.GETJOB_BY_USER +
//     "?userId=" +
//     bodydata.userId +
//     "&searchStatus=" +
//     bodydata.searchStatus +
//     "&searchProfession=" +
//     bodydata.searchProfession +
//     "&all=" +
//     bodydata.all +
//     "&perPage=" +
//     bodydata.perPage;
// } else {
//   url =
//     Constant.baseURL +
//     Constant.end_Point.GETJOB_BY_HIRED +
//     "?userId=" +
//     bodydata.userId +
//     "&searchStatus=" +
//     bodydata.searchStatus +
//     "&searchProfession=" +
//     bodydata.searchProfession +
//     "&all=" +
//     bodydata.all +
//     "&perPage=" +
//     bodydata.perPage;
// }

//   console.log("URL======>", url);

//   try {
//     const response = yield fetch(url, {
//       method: "GET",
//       headers: {
//         Authorization: "Bearer " + key,
//       },
//     });

//     const responseJson = yield response.json();
//     // console.log("responseJson getUserJobSaga => ", responseJson);
//     yield put(ReduxActions.GetUserJobResponse(responseJson.data));
//     yield put(ReduxActions.loaderAction(false));
//   } catch (err) {
//     console.log("Get User Job :::", err);
//     yield put(
//       ReduxActions.ToastDisplay({
//         type: "negative",
//         title: err.message,
//       })
//     );
//     yield put(ReduxActions.loaderAction(false));
//   }
// }

import { put } from "redux-saga/effects";
import ReduxActions from "../../helper/ReduxActions";
import AsyncStorage from "../../helper/AsyncStorage";
import Constant from "../../theme/Constant";

export function* getUserPostedJobSaga(action) {
  console.log("Get Response saga");
  const { bodydata, jobType } = action;
  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });
  console.log("get job bodydata :::", bodydata);
  console.log("get job jobType :::", jobType);
  console.log("get job key :::", key);
  let url;
  if (jobType === "get-jobs-by-user-id") {
    url =
      Constant.baseURL +
      Constant.end_Point.GETJOB_BY_USER +
      "?userId=" +
      bodydata.userId +
      "&searchStatus=" +
      bodydata.searchStatus +
      "&searchProfession=" +
      bodydata.searchProfession +
      "&all=" +
      bodydata.all +
      "&perPage=" +
      bodydata.perPage;
  } else {
    url =
      Constant.baseURL +
      Constant.end_Point.GETJOB_BY_HIRED +
      "?userId=" +
      bodydata.userId +
      "&searchStatus=" +
      bodydata.searchStatus +
      "&searchProfession=" +
      bodydata.searchProfession +
      "&all=" +
      bodydata.all +
      "&perPage=" +
      bodydata.perPage;
  }
  console.log("url getUserJob ", url);
  try {
    const response = yield fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + key,
      },
    });
    let responseJson = yield response.json();
    // console.log(":::::::: getUserJob response ::::::::", response);
    yield put(ReduxActions.GetUserJobResponse(responseJson.data));
    yield put(ReduxActions.loaderAction(false));
  } catch (err) {
    // yield put(
    //   ReduxActions.ToastDisplay({
    //     type: "negative",
    //     title: err.message,
    //   })
    // );
    yield put(ReduxActions.loaderAction(false));
  }
}
