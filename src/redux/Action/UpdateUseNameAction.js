import * as TYPES from "../Services/Type";
export function UpdateUserNameResponse(data) {
  return {
    type: TYPES.UPDATE_USERNAME_RESPONSE,
    payload: data,
  };
}

export function UpdateUserNameRequest(bodyData) {
  return {
    type: TYPES.UPDATE_USERNAME_REQUEST,
    bodyData: bodyData,
  };
}
