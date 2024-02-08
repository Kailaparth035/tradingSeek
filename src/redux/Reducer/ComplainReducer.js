import { COMPLAIN_REQUEST, COMPLAIN_RESPONSE } from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call ComplainReducer");

export const ComplainReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case COMPLAIN_REQUEST:
      // console.log("ComplainReducer request type call-------------", type);

      return {
        ...prevState,
        action: action,
      };
    case COMPLAIN_RESPONSE:
      // console.log("ComplainReducer response type call-------------", type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
