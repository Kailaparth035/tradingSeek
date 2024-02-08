import * as TYPES from "../Services/Type";
export function LeadResponse(data) {
  // console.log("call SaveLeadResponse : ");

  return {
    type: TYPES.LEAD_RESPONSE,
    payload: data,
  };
}

export function LeadRequest(bodydata, lead_type) {
  // console.log("call SaveLeadRequest: ",lead_type);

  return {
    type: TYPES.LEAD_REQUEST,
    bodydata: bodydata,
    lead_type: lead_type,
  };
}
