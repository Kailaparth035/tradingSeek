import { HIRED_USER_REQUEST, HIRED_USER_RESPONSE } from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call HiredReducer");

export const HiredReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case HIRED_USER_REQUEST:
      // console.log("Login Reducer type call-------------", action);

      return {
        ...prevState,
        action: action,
      };
    case HIRED_USER_RESPONSE:
      // console.log("Login Reducer type call-------------", type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
