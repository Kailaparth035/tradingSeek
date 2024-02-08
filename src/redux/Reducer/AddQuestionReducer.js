import { ADD_QUESTION_RESPONSE, ADD_QUESTION_REQUEST } from "../Services/Type";

const initialState = {
  data: null,
};

// console.log('call AddQuestionReducer');

export const AddQuestionReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case ADD_QUESTION_REQUEST:
      // console.log("AddQuestionReducer type call-------------", type);

      return {
        ...prevState,
        action: action,
      };
    case ADD_QUESTION_RESPONSE:
      // console.log('AddQuestionReducer type call-------------', type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
