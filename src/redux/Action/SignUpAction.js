import * as TYPES from "../Services/Type";
export function SignUpResponse(data) {
  // console.log('call SaveSignUpResponse : ', data);

  return {
    type: TYPES.SIGNUP_RESPONSE,
    payload: data,
  };
}

export function SignUpRequest(bodyData, navigation, key) {
  console.log("call SaveSignUpRequest: ", bodyData);
  // console.log("key======>",key)

  return {
    type: TYPES.SIGNUP_REQUEST,
    bodyData: bodyData,
    navigation: navigation,
    key: key,
  };
}
