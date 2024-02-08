import * as TYPES from '../Services/Type';
export function ForgetPasswordResponse(data) {
  // console.log('call SaveForgetPasswordResponse : ', data);

  return {
    type: TYPES.FORGETPASSWORD_RESPONSE,
    payload: data,
  };
}

export function ForgetPasswordRequest(email,navigation) {
  // console.log('call SaveForgetPasswordRequest: ');
  // console.log('Email :::::', email);
  return {
    type: TYPES.FORGETPASSWORD_REQUEST,
    email: email,
    navigation: navigation,
  };
}
