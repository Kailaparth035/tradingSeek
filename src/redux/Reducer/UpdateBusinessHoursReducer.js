import {
  UPDATE_BUSINESS_HOURS_REQUEST,
  UPDATE_BUSINESS_HOURS_RESPONSE,
} from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call UpdateBusinessHoursReducer");

export const UpdateBusinessHoursReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case UPDATE_BUSINESS_HOURS_REQUEST:
      // console.log("UpdateBusinessHoursReducer Request type call-------------", type);

      return {
        ...prevState,
        action: action,
      };
    case UPDATE_BUSINESS_HOURS_RESPONSE:
      // console.log("UpdateBusinessHoursReducer Response type call-------------", type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
