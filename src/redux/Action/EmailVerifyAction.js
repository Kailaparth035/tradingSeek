import * as TYPES from '../Services/Type';
export function EmailVerifyResponse(data) {
  // console.log('call EmailVerifyResponseAction : ');

  return {
    type: TYPES.EMAIL_VERIFY_RESPONSE,
    payload: data,
  };
}

export function EmailVerifyRequest(EmailVerify) {
  // console.log('call EmailVerifyRequestAction : ');
  // console.log('EmailVerify :::::', EmailVerify);
  return {
    type: TYPES.EMAIL_VERIFY_REQUEST,
    EmailVerify: EmailVerify,
  };
}
