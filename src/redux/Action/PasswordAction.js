import * as TYPES from "../Services/Type";
export function PasswordResponse(data) {
  // console.log("call SavePasswordResponse : ", data);

  return {
    type: TYPES.PASSWORD_RESPONSE,
    payload: data,
  };
}

export function PasswordRequest(bodydata, navigation) {
  // console.log("call SavePasswordRequest: ");
  // console.log("password==>",password)

  return {
    type: TYPES.PASSWORD_REQUEST,
    bodydata: bodydata,
    navigation: navigation,
  };
}
