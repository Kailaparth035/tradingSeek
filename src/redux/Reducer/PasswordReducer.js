import { PASSWORD_REQUEST, PASSWORD_RESPONSE } from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call PasswordReducer");

export const PasswordReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case PASSWORD_REQUEST:
      // console.log("PasswordReducer request type call-------------", action);

      return {
        ...prevState,
        action: action,
      };
    case PASSWORD_RESPONSE:
      // console.log("PasswordReducer response type call-------------", type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
