import * as TYPES from "../Services/Type";
export function RemoveProfileImgResponse(data) {
  // console.log("call SaveRemoveProfileImageResponse : ", data);

  return {
    type: TYPES.REMOVE_PROFILEIMG_RESPONSE,
    payload: data,
  };
}

export function RemoveProfileImgRequest(bodyData) {
  // console.log("call SaveAccountActivateReuest:::", bodyData);
  return {
    type: TYPES.REMOVE_PROFILEIMG_REQUEST,
    bodyData: bodyData,
  };
}
