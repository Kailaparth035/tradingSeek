import * as TYPES from "../Services/Type";
export function UpadateUserInfoResponse(data) {
  // console.log("call SaveUpadateUserInfoResponse : ");

  return {
    type: TYPES.UPDATE_USERINFO_RESPONSE,
    payload: data,
  };
}

export function UpadateUserInfoRequest(bodyData, switchAccountkey, navigation) {
  // console.log("call SaveUpadateUserInfoRequet: ", bodyData);

  return {
    type: TYPES.UPDATE_USERINFO_REQUEST,
    bodyData: bodyData,
    switchAccountkey: switchAccountkey,
    navigation: navigation,
  };
}
