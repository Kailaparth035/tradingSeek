import * as TYPES from "../Services/Type";
export function UpdateLocationResponse(data) {
  //   console.log("call SaveUpdateLocationResponse : ");

  return {
    type: TYPES.UPADATE_LOCATION_RESPONSE,
    payload: data,
  };
}

export function UpdateLocationRequest(bodyData) {
  // console.log("call SaveUpdateLocationRequest: ", bodyData);

  return {
    type: TYPES.UPADATE_LOCATION_REQUEST,
    bodyData: bodyData,
  };
}
