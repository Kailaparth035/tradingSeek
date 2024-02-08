import * as TYPES from "../Services/Type";
export function SendMedialResponse(data) {
  // console.log("call SaveSendMedialResponse : ", data);

  return {
    type: TYPES.SEND_MEDIA_RESPONSE,
    payload: data,
  };
}

export function SendMedialRequest(bodydata) {
  // console.log("call SaveSendMedialRequest: ", key);
  //   console.log("bodydata==>", bodydata);

  return {
    type: TYPES.SEND_MEDIA_REQUEST,
    bodydata: bodydata,
  };
}
