import { SEND_QUOTE_REQUEST, SEND_QUOTE_RESPONSE } from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call SendQuoteReducer");

export const SendQuoteReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case SEND_QUOTE_REQUEST:
      // console.log("SendQuoteReducer request type call-------------", action);

      return {
        ...prevState,
        action: action,
      };
    case SEND_QUOTE_RESPONSE:
      // console.log("SendQuoteReducer response type call-------------", type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
