import * as TYPES from "../Services/Type";
export function SeenMessageResponse(data) {
  // console.log("call SaveeenMessageResponse : ", data);

  return {
    type: TYPES.SEEN_MESSAGE_RESPONSE,
    payload: data,
  };
}

export function SeenMessageRequest(bodydata) {
  // console.log("call SaveSeenMessageRequest: ");

  return {
    type: TYPES.SEEN_MESSAGE_REQUEST,
    bodydata: bodydata,
  };
}
