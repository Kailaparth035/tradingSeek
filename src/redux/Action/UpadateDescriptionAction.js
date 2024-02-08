import * as TYPES from "../Services/Type";
export function UpdateDescriptionResponse(data) {
  // console.log("call SaveUpdateDescriptionResponse : ");

  return {
    type: TYPES.UPDATE_DESCRIPTION_RESPONSE,
    payload: data,
  };
}

export function UpdateDescriptionRequet(bodyData) {
  // console.log("call SaveUpdateDescriptionRequet: ");

  return {
    type: TYPES.UPDATE_DESCRIPTION_REQUEST,
    bodyData: bodyData,
  };
}
