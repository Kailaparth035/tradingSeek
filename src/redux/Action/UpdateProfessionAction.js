import * as TYPES from "../Services/Type";
export function UpdateProfessionResponse(data) {
  //   console.log("call SaveUpdateProfessionResponse : ");

  return {
    type: TYPES.UPADATE_PROFESSION_RESPONSE,
    payload: data,
  };
}

export function UpdateProfessionRequest(bodyData) {
  // console.log("call SaveUpdateProfessionRequest: ", bodyData);

  return {
    type: TYPES.UPADATE_PROFESSION_REQUEST,
    bodyData: bodyData,
  };
}
