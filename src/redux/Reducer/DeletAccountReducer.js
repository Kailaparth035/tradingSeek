import {
  DELET_ACCOUNT_REQUEST,
  DELET_ACCOUNT_RESPONSE,
} from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call DeletAccountReducer");

export const DeletAccountReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case DELET_ACCOUNT_REQUEST:
      // console.log("DeletAccountReducer Request type call-------------", type);

      return {
        ...prevState,
        action: action,
      };
    case DELET_ACCOUNT_RESPONSE:
      // console.log("DeletAccountReducer Response type call-------------", type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
