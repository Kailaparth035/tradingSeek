import * as TYPES from "../Services/Type";
export function HiredUserResponse(data) {
  // console.log("call SaveHiredUserResponse : ", data);

  return {
    type: TYPES.HIRED_USER_RESPONSE,
    payload: data,
  };
}

export function HiredUserRequest(jobId, bodydata) {
  // console.log("call hiredUser action jobID: ", jobId);
  // console.log("bodydata ==>", bodydata);

  return {
    type: TYPES.HIRED_USER_REQUEST,
    jobId: jobId,
    bodydata: bodydata,
  };
}
