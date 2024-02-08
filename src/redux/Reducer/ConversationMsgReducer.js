import {
  CONVERSATION_MSG_REQUEST,
  CONVERSATION_MSG_RESPONSE,
} from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call ConversationMsgReducer");

export const ConversationMsgReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case CONVERSATION_MSG_REQUEST:
      // console.log("ConversationMsgReducer request type call-------------", type);

      return {
        ...prevState,
        action: action,
      };
    case CONVERSATION_MSG_RESPONSE:
      // console.log("ConversationMsgReducer response type call-------------", type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
