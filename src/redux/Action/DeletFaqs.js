import * as TYPES from "../Services/Type";
export function DeletFaqsResponse(data) {
  // console.log("call SaveDeletFaqsResponse : ");

  return {
    type: TYPES.DELET_FAQS_RESPONSE,
    payload: data,
  };
}

export function DeletFaqsRequest(id) {
  // console.log("call SaveDeletFaqsRequest:", navigation);

  return {
    type: TYPES.DELET_FAQS_REQUEST,
    id: id,
  };
}
