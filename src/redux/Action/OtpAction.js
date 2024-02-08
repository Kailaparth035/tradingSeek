import * as TYPES from "../Services/Type";
export function OtpResponse(data) {
  // console.log("call SaveOtpRequest: ", data);

  return {
    type: TYPES.OTP_RESPONSE,
    payload: data,
  };
}

export function OtpRequest(bodydata, navigation) {
  // console.log("call SaveOtpRequest: ");

  return {
    type: TYPES.OTP_REQUEST,
    bodydata: bodydata,
    navigation: navigation,
  };
}
