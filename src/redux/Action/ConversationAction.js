import * as TYPES from "../Services/Type";
export function ConversationResponse(data) {
  // console.log("call SaveConversationResponse: ", data);

  return {
    type: TYPES.CONVERSATION_RESPONSE,
    payload: data,
  };
}

export function ConversationRequest(
  pageSize,
  ViewResponse,
  navigation,
  quoteditem
) {
  console.log("call SaveConversationRequest: ", pageSize);

  return {
    type: TYPES.CONVERSATION_REQUEST,
    pageSize: pageSize,
    ViewResponse: ViewResponse,
    navigation: navigation,
    quoteditem: quoteditem,
  };
}
