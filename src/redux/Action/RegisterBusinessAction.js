import * as TYPES from "../Services/Type";
export function RegisterBusinessResponse(data) {
  // console.log("call RegisterBusinessResponse : ", data);

  return {
    type: TYPES.REGISTERBUSINESS_RESPONSE,
    payload: data,
  };
}

export function RegisterBusinessRequest(bodyoData, navigation, key) {
  // console.log("call RegisterBusinessRequest: ", key);

  return {
    type: TYPES.REGISTERBUSINESS_REQUEST,
    bodyData: bodyoData,
    navigation: navigation,
    key: key,
  };
}
