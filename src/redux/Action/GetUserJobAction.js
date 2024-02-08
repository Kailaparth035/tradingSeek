import * as TYPES from "../Services/Type";
export function GetUserJobResponse(data) {
  // console.log("call SaveGetUserJobResponse : ");

  return {
    type: TYPES.GETUSER_JOB_RESPONSE,
    payload: data,
  };
}

export function GetUserJobRequest(bodydata, jobType) {
  // console.log("call SaveGetUserJobRequest: ", jobType);

  return {
    type: TYPES.GETUSER_JOB_REQUEST,
    bodydata: bodydata,
    jobType: jobType,
  };
}
