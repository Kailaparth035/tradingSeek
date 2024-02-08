import * as TYPES from "../Services/Type";
export function AccountActivateResponse(data) {
  // console.log("call SaveAccountActivateResponse : ", data);

  return {
    type: TYPES.ACCOUNT_ACTIVATE_RESPONSE,
    payload: data,
  };
}

export function AccountActivateReuest(bodyData, navigation) {
  // console.log("call SaveAccountActivateReuest:::", bodyData);
  return {
    type: TYPES.ACCOUNT_ACTIVATE_REQUEST,
    bodyData: bodyData,
    navigation: navigation,
  };
}
