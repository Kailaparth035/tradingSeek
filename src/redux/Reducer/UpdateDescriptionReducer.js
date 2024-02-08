import {
  UPDATE_DESCRIPTION_REQUEST,
  UPDATE_DESCRIPTION_RESPONSE,
} from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call UpdateDescriptionReducer");

export const UpdateDescriptionReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case UPDATE_DESCRIPTION_REQUEST:
      // console.log(
      //   "UpdateDescriptionReducer Request type call-------------",
      //   type
      // );

      return {
        ...prevState,
        action: action,
      };
    case UPDATE_DESCRIPTION_RESPONSE:
      // console.log(
      //   "UpdateDescriptionReducer Response type call-------------",
      //   type
      // );

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
