import * as TYPES from "../Services/Type";
export function AutoQuoteResponse(data) {
  // console.log("call SaveAutoQuoteResponse : ", data);

  return {
    type: TYPES.AUTOQUOTE_SETTING_RESPONSE,
    payload: data,
  };
}

export function AutoQuoteRequest(bodydata) {
  // console.log("call SaveAutoQuoteRequest: ", key);
  //   console.log("bodydata==>", bodydata);

  return {
    type: TYPES.AUTOQUOTE_SETTING_REQUEST,
    bodydata: bodydata,
  };
}
