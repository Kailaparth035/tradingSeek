import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_RESPONSE,
} from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call ResetPasswordReducer");

export const ResetPasswordReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case RESET_PASSWORD_REQUEST:
      // console.log("ResetPasswordReducer Request type call-------------", type);

      return {
        ...prevState,
        action: action,
      };
    case RESET_PASSWORD_RESPONSE:
      // console.log("ResetPasswordReducer Response type call-------------", type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
