import * as TYPES from "../Services/Type";
export function SendQuoteResponse(data) {
  // console.log("call SendQuoteResponse : ", data);

  return {
    type: TYPES.SEND_QUOTE_RESPONSE,
    payload: data,
  };
}

export function SendQuoteRequest(bodyoData, navigation, key) {
  // console.log("call SendQuoteRequest: ", key);
  return {
    type: TYPES.SEND_QUOTE_REQUEST,
    bodyData: bodyoData,
    navigation: navigation,
  };
}
