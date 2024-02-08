import * as TYPES from '../Services/Type';
export function ProfessionResponse(data) {
  // console.log('call ProfessionResponse : ');

  return {
    type: TYPES.PROFESSION_RESPONSE,
    payload: data,
  };
}

export function ProfessionRequest() {
  // console.log('call ProfessionRequest:');
 
  return {
    type: TYPES.PROFESSION_REQUEST,
  };
}
