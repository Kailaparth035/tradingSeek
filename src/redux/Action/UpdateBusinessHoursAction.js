import * as TYPES from "../Services/Type";
export function UpdateBusinessHoursResponse(data) {
  // console.log("call SaveUpdateBusinessHoursResponse : ");

  return {
    type: TYPES.UPDATE_BUSINESS_HOURS_RESPONSE,
    payload: data,
  };
}

export function UpdateBusinessHoursRequest(bodyData) {
  // console.log("call SaveUpdateBusinessHoursRequest: ", bodyData);

  return {
    type: TYPES.UPDATE_BUSINESS_HOURS_REQUEST,
    bodyData: bodyData,
  };
}
