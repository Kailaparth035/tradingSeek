import * as TYPES from "../Services/Type";
export function AddCredentialResponse(data) {
  // console.log("call SaveAddCredentialResponse : ", data);

  return {
    type: TYPES.ADD_CREDENTIAL_RESPONSE,
    payload: data,
  };
}

export function AddCredentialRequest(bodydata) {
  // console.log("call SaveAddCredentialRequest: ", key);
  console.log("bodydata==>", bodydata);

  return {
    type: TYPES.ADD_CREDENTIAL_REQUEST,
    bodydata: bodydata,
  };
}
