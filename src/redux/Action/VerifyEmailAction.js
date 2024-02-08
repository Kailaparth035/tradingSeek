import * as TYPES from "../Services/Type";
export function VerifyEmailResponse(data) {
  // console.log("call SaveVerifyEmailResponse : ", data);

  return {
    type: TYPES.VERIFYEMAIL_RESONSE,
    payload: data,
  };
}

export function VerifyEmailRequest(bodydata) {
  // console.log("call SaveVerifyEmailRequest: ", bodydata);
  // console.log("password==>",password)

  return {
    type: TYPES.VERIFYEMAIL_REQUEST,
    bodydata: bodydata,
  };
}
