import * as TYPES from "../Services/Type";
export function GetFaqResponse(data) {
  // console.log("call SaveGetFaqResponse : ", data);

  return {
    type: TYPES.GETFAQS_RESPONSE,
    payload: data,
  };
}

export function GetFaqRequest() {
  // console.log("call SaveGetFaqResponse: ", key);

  return {
    type: TYPES.GETFAQS_REQUEST,
  };
}
