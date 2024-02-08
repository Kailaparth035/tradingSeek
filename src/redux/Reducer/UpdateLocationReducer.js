import {
  UPADATE_LOCATION_REQUEST,
  UPADATE_LOCATION_RESPONSE,
} from "../Services/Type";

const initialState = {
  data: null,
};

console.log("call UpdateLocationReducer");

export const UpdateLocationReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case UPADATE_LOCATION_REQUEST:
      // console.log("UpdateLocationReducer Request type call-------------", type);

      return {
        ...prevState,
        action: action,
      };
    case UPADATE_LOCATION_RESPONSE:
      // console.log("UpdateLocationReducer Response type call-------------", type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
