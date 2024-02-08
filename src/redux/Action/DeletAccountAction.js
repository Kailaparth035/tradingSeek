import * as TYPES from "../Services/Type";
export function DeletAccountResponse(data) {
  // console.log("call SaveDeletAccountResponse : ");

  return {
    type: TYPES.DELET_ACCOUNT_RESPONSE,
    payload: data,
  };
}

export function DeletAccountRequest(navigation) {
  // console.log("call SaveDeletAccountRequest:", navigation);

  return {
    type: TYPES.DELET_ACCOUNT_REQUEST,
    navigation: navigation,
  };
}
