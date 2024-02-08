import {
  ASK_QUESTIONS_RESPONSE,
  ASK_QUESTIONS_REQUEST,
} from "../Services/Type";

const initialState = {
  data: null,
};

// console.log('call AskQuestionReducer');

export const AskQuestionReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case ASK_QUESTIONS_REQUEST:
      //   console.log("AskQuestionReducer type call-------------", type);

      return {
        ...prevState,
        action: action,
      };
    case ASK_QUESTIONS_RESPONSE:
      // console.log('AskQuestionReducer   type call-------------', type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
