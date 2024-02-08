import * as TYPES from "../Services/Type";
export function UpdateStatusResponse(data) {
  // console.log("call SaveUpdateStatusResponse : ");

  return {
    type: TYPES.UPDATE_STATUS_RESPONSE,
    payload: data,
  };
}

export function UpdateStatusRequest(jobId, updateStatus, statusReason) {
  // console.log("call SaveUpdateStatusRequest: ");

  return {
    type: TYPES.UPDATE_STATUS_REQUEST,
    jobId: jobId,
    updateStatus: updateStatus,
    statusReason: statusReason,
  };
}
