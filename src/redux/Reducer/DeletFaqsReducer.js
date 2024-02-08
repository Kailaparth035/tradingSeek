import { DELET_FAQS_REQUEST, DELET_FAQS_RESPONSE } from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call DeletFaqsReducer");

export const DeletFaqsReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case DELET_FAQS_REQUEST:
      // console.log("DeletFaqsReducer Request type call-------------", type);

      return {
        ...prevState,
        action: action,
      };
    case DELET_FAQS_RESPONSE:
      // console.log("DeletFaqsReducer Response type call-------------", type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
