import {
  UPDATE_USERINFO_REQUEST,
  UPDATE_USERINFO_RESPONSE,
} from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call UpdateUserInfoReducer");

export const UpdateUserInfoReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case UPDATE_USERINFO_REQUEST:
      // console.log("UpdateUserInfoReducer Request type call-------------", type);

      return {
        ...prevState,
        action: action,
      };
    case UPDATE_USERINFO_RESPONSE:
      // console.log(
      //   "UpdateUserInfoReducer Response type call-------------",
      //   type
      // );

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
