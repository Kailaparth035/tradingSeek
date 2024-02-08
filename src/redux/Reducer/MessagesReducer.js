import { MESSAGES_REQUEST, MESSAGES_RESPONSE } from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call MessagesReducer");

export const MessagesReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case MESSAGES_REQUEST:
      // console.log("MessagesReducer Request type call-------------", type);

      return {
        ...prevState,
        action: action,
      };
    case MESSAGES_RESPONSE:
      // console.log("MessagesReducer Response type call-------------", type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
