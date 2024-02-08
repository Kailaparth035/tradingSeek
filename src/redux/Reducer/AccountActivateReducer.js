import {
  ACCOUNT_ACTIVATE_REQUEST,
  ACCOUNT_ACTIVATE_RESPONSE,
} from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call AccountActivateReducer");

export const AccountActivateReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case ACCOUNT_ACTIVATE_REQUEST:
      // console.log(
      //   "AccountActivateReducer request type call-------------",
      //   action
      // );

      return {
        ...prevState,
        action: action,
      };
    case ACCOUNT_ACTIVATE_RESPONSE:
      // console.log(
      //   "AccountActivateReducer response type call-------------",
      //   type
      // );

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
