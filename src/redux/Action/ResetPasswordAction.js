import * as TYPES from "../Services/Type";
export function ResetPasswordResponse(data) {
  // console.log("call SaveResetPasswordResponse : ");

  return {
    type: TYPES.RESET_PASSWORD_RESPONSE,
    payload: data,
  };
}

export function ResetPasswordRequest(bodyData) {
  // console.log("call SaveResetPasswordRequest: ", bodyData);

  return {
    type: TYPES.RESET_PASSWORD_REQUEST,
    bodyData: bodyData,
  };
}
