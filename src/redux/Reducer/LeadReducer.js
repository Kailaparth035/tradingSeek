import { LEAD_REQUEST, LEAD_RESPONSE } from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call LeadReducer");

export const LeadReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case LEAD_REQUEST:
      // console.log("GetUserJobReducer request type call-------------", type);

      return {
        ...prevState,
        action: action,
      };
    case LEAD_RESPONSE:
      // console.log("GetUserJobReducer response type call-------------", type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
