import { GETFAQS_REQUEST, GETFAQS_RESPONSE } from "../Services/Type";

const initialState = {
  data: null,
};

// console.log('call GetFaqsReducer');

export const GetFaqsReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case GETFAQS_REQUEST:
      // console.log('GetFaqsReducer Reducer type call-------------', type);

      return {
        ...prevState,
        action: action,
      };
    case GETFAQS_RESPONSE:
      // console.log('GetFaqsReducer Reducer  type call-------------', type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
