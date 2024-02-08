import * as TYPES from "../Services/Type";
export function MessagesResponse(data) {
  // console.log("call SaveMessagesResponse:");

  return {
    type: TYPES.MESSAGES_RESPONSE,
    payload: data,
  };
}

export function MessagesRequest(conversationId) {
  // console.log("call SaveMessagesRequest:", conversationId);

  return {
    type: TYPES.MESSAGES_REQUEST,
    conversationId: conversationId,
  };
}
