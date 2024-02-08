import {
  UPDATE_USERNAME_RESPONSE,
  UPDATE_USERNAME_REQUEST,
} from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call UpdateUserNameReducer");

export const UpdateUserNameReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case UPDATE_USERNAME_REQUEST:
      // console.log("UpdateUserNameReducer Request type call-------------", type);

      return {
        ...prevState,
        action: action,
      };
    case UPDATE_USERNAME_RESPONSE:
      // console.log(
      //   "UpdateUserNameReducer Response type call-------------",
      //   type
      // );

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
