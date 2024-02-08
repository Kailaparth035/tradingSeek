import * as TYPES from "../Services/Type";
export function AskQuestionRespons(data) {
  // console.log("call SaveAskQuestionRespons : ", data);

  return {
    type: TYPES.ASK_QUESTIONS_RESPONSE,
    payload: data,
  };
}

export function AskQuestionRequest(bodydata) {
  // console.log("call SaveAskQuestionRequest: ", bodydata);

  return {
    type: TYPES.ASK_QUESTIONS_REQUEST,
    bodydata: bodydata,
  };
}
