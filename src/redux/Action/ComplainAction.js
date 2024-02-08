import * as TYPES from "../Services/Type";
export function ComplainResponse(data) {
  // console.log("call SaveComplainResponse : ", data);

  return {
    type: TYPES.COMPLAIN_RESPONSE,
    payload: data,
  };
}

export function ComplainRequest(bodydata, navigation, key) {
  // console.log("call SaveComplainRequest: ", key);
  // console.log("password==>",password)

  return {
    type: TYPES.COMPLAIN_REQUEST,
    bodydata: bodydata,
    navigation: navigation,
  };
}
