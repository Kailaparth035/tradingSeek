import * as TYPES from "../Services/Type";
export function ProfileImgResponse(data) {
  // console.log("call SaveProfileImgResponse : ");

  return {
    type: TYPES.PROFILEIMG_RSPONSE,
    payload: data,
  };
}

export function ProfileImgRequest(bodyData, navigation, key) {
  console.log("call SaveProfileImgRequest:",bodyData);
  return {
    type: TYPES.PROFILEIMG_REQUEST,
    bodyData: bodyData,
    navigation: navigation,
  };
}
