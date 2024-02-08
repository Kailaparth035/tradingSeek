import * as TYPES from "../Services/Type";
export function ConversationMsgResponse(data) {
  // console.log("call SaveConversationMsgResponse: ", data);

  return {
    type: TYPES.CONVERSATION_MSG_RESPONSE,
    payload: data,
  };
}

export function ConversationMsgRequest(conversationId, pageSize) {
  console.log("call ConversationMsgRequest: ", pageSize);

  return {
    type: TYPES.CONVERSATION_MSG_REQUEST,
    conversationId: conversationId,
    pageSize: pageSize,
  };
}
