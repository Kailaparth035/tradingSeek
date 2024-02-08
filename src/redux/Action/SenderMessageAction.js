import * as TYPES from "../Services/Type";
export function SenderMessageResponse(data) {
  // console.log("call SaveSenderMessageResponse: ", data);

  return {
    type: TYPES.SENDERMESSAGE_RESPONSE,
    payload: data,
  };
}

export function SenderMessageRequest(bodydata) {
  // console.log("call SaveSenderMessageRequest:", bodydata);
  return {
    type: TYPES.SENDERMESSAGE_REQUEST,
    bodydata: bodydata,
  };
}
