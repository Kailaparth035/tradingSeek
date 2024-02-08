import { put } from "redux-saga/effects";
import ReduxActions from "../../helper/ReduxActions";
import AsyncStorage from "../../helper/AsyncStorage";
import Constant from "../../theme/Constant";

export function* conversationSaga(action) {
  const { pageSize, ViewResponse, navigation, quoteditem } = action;
  let userId = yield AsyncStorage.getItem("userId").then((value) => {
    var header = value;
    return header;
  });

  let key = yield AsyncStorage.getItem("token").then((value) => {
    var header = value;
    return header;
  });
  let userData = yield AsyncStorage.getItem("userProfile").then((value) => {
    var header = JSON.parse(value);
    return header;
  });

  // console.log("conversation api call =============> ", pageSize);

  console.log(
    "URL for conversationSaga ======>",
    Constant.baseURL +
      Constant.end_Point.CONVERSATION +
      "?userId=" +
      "&perPage=" +
      pageSize +
      userId +
      "&isApk=true"
  );
  // console.log("ViewResponse ======>", ViewResponse);
  try {
    const response = yield fetch(
      Constant.baseURL +
        Constant.end_Point.CONVERSATION +
        "?userId=" +
        userId +
        "&perPage=" +
        pageSize +
        "&isApk=true",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + key,
        },
      }
    );

    let responseJson = yield response.json();
    // console.log(
    //   "responseJson for conversationSaga",
    //   JSON.stringify(responseJson)
    // );

    if (ViewResponse === "MyjobScreen" && userData !== undefined) {
      let check = false;
      responseJson.map((resItem) => {
        if (check === false) {
          if (resItem.senderId._id === quoteditem._id) {
            check = true;
            console.log("business users :::", resItem.senderId._id);
            console.log("userData._id", userData._id);
            navigation.navigate("ChatBox", {
              clientData: resItem,
              key: "MyJob",
            });
            // }
          } else if (resItem.receiverId._id === quoteditem._id) {
            check = true;
            navigation.navigate("ChatBox", {
              clientData: resItem,
              key: "MyJob",
            });
          }
        }
      });
    }

    yield put(ReduxActions.ConversationResponse(responseJson));
    yield put(ReduxActions.loaderAction(false));
  } catch (err) {
    console.log("Conversation Saag File :::", err);
    yield put(
      ReduxActions.ToastDisplay({
        type: "negative",
        title: err.message,
      })
    );
    yield put(ReduxActions.loaderAction(false));
  }
}
