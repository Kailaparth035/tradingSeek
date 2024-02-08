import * as TYPES from "../Services/Type";
export function GetProfileDataResponse(data) {
  // console.log("call SaveGetProfileDataResponse :",data);

  return {
    type: TYPES.GETPROFILEDATA_RESPONSE,
    payload: data,
  };
}

export function GetProfileDataRequest() {
  // console.log("call SaveGetProfessionRequest:");

  return {
    type: TYPES.GETPROFILEDATA_REQUEST,
  };
}
