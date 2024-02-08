import * as TYPES from "../Services/Type";
export function PostJobResponse(data) {
  // console.log("call SavePostJobResponse : ", data);

  return {
    type: TYPES.POSTJOB_RESPONSE,
    payload: data,
  };
}

export function PostJobRequest(bodyData, navigation) {
  // console.log("call SavePostJobRequest: ");

  return {
    type: TYPES.POSTJOB_REQUEST,
    bodyData: bodyData,
    navigation: navigation,
  };
}
