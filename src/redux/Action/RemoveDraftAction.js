import * as TYPES from "../Services/Type";
export function RemoveDraftResponse(data) {
  // console.log("call SaveRemoveDraftResponse : ", data);

  return {
    type: TYPES.REMOVEDRAFT_RESPONSE,
    payload: data,
  };
}

export function RemoveDraftRequest(bodydata, navigation) {
  // console.log("call SaveRemoveDraftRequest: ", key);
  // console.log("password==>",password)

  return {
    type: TYPES.REMOVEDRAFT_REQUEST,
    bodydata: bodydata,
    navigation: navigation,
  };
}
