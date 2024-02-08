import * as TYPES from "../Services/Type";
export function AddQuestionResponse(data) {
  // console.log("call SaveAddQuestionResponse : ", data);

  return {
    type: TYPES.ADD_QUESTION_RESPONSE,
    payload: data,
  };
}

export function AddQuestionRequest(bodydata) {
  // console.log("call SaveAddQuestionRequest: ", key);
  //   console.log("bodydata==>", bodydata);

  return {
    type: TYPES.ADD_QUESTION_REQUEST,
    bodydata: bodydata,
  };
}
