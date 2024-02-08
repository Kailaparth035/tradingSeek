import {
  UPDATE_STATUS_REQUEST,
  UPDATE_STATUS_RESPONSE,
} from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call UpdateStatusReducer");

export const UpdateStatusReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case UPDATE_STATUS_REQUEST:
      // console.log("UpdateStatusReducer Request type call-------------", type);

      return {
        ...prevState,
        action: action,
      };
    case UPDATE_STATUS_RESPONSE:
      // console.log("UpdateStatusReducer Response type call-------------", type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
