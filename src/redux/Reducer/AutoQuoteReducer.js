import {
  AUTOQUOTE_SETTING_REQUEST,
  AUTOQUOTE_SETTING_RESPONSE,
} from "../Services/Type";

const initialState = {
  data: null,
};

// console.log('call AutoQuoteReducer');

export const AutoQuoteReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case AUTOQUOTE_SETTING_REQUEST:
      //   console.log("AutoQuoteReducer type call-------------", type);

      return {
        ...prevState,
        action: action,
      };
    case AUTOQUOTE_SETTING_RESPONSE:
      // console.log('AutoQuoteReducer type call-------------', type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
