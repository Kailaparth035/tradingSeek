import * as TYPES from "../Services/Type";
export function DeletCredentialResponse(data) {
  // console.log("call SaveDeletCredentialResponse : ", data);

  return {
    type: TYPES.DELET_CREDENTIAL_RESPONSE,
    payload: data,
  };
}

export function DeletCredentialRequest(bodydata) {
  // console.log("call SaveDeletCredentialRequest: ", key);
  //   console.log("bodydata==>", bodydata);

  return {
    type: TYPES.DELET_CREDENTIAL_REQUEST,
    bodydata: bodydata,
  };
}
