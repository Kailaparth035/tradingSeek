import * as TYPES from "../Services/Type";
export function SaveDraftResponse(data) {
  // console.log("call SaveSaveDraftResponse: ", data);

  return {
    type: TYPES.SAVEDRAFT_RESPONSE,
    payload: data,
  };
}

export function SaveDraftRequest(bodydata) {
  // console.log("call SaveSaveDraftRequest:", bodydata);
  return {
    type: TYPES.SAVEDRAFT_REQUEST,
    bodydata: bodydata,
  };
}
