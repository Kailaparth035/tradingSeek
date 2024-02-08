import * as TYPES from '../Services/Type';
export function BussinessNumberResponse(data) {
  // console.log('call SaveForgetPasswordResponse : ', data);

  return {
    type: TYPES.BUSSINESSNUMBER_RESPONSE,
    payload: data,
  };
}

export function BussinessNumberRequest(Business) {
  // console.log('call SaveBussinessnumberRequest: ');
  // console.log('Business :::::', Business);
  return {
    type: TYPES.BUSSINESSNUMBER_REQUEST,
    Business: Business,
  };
}
