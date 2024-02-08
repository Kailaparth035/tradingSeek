import { CONVERSATION_REQUEST, CONVERSATION_RESPONSE } from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call ConversationReducer");

export const ConversationReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case CONVERSATION_REQUEST:
      // console.log("ConversationReducer request type call-------------", type);

      return {
        ...prevState,
        action: action,
      };
    case CONVERSATION_RESPONSE:
      // console.log("ConversationReducer response type call-------------", type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
