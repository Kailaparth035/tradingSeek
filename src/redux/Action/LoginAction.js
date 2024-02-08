import * as TYPES from "../Services/Type";
export function LoginResponse(data) {
  // console.log("call SaveLoginResponse : ", data);

  return {
    type: TYPES.LOGIN_RESPONSE,
    payload: data,
  };
}

export function LoginRequest(bodydata, navigation, key) {
  // console.log("call SaveLoginRequest: ", key);
  // console.log("password==>",password)

  return {
    type: TYPES.LOGIN_REQUEST,
    bodydata: bodydata,
    navigation: navigation,
    key: key,
  };
}
