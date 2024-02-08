import {
  UPADATE_PROFESSION_REQUEST,
  UPADATE_PROFESSION_RESPONSE,
} from "../Services/Type";

const initialState = {
  data: null,
};

console.log("call UpdateProfessionReducer");

export const UpdateProfessionReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case UPADATE_PROFESSION_REQUEST:
      // console.log("UpdateProfessionReducer Request type call-------------", type);

      return {
        ...prevState,
        action: action,
      };
    case UPADATE_PROFESSION_RESPONSE:
      // console.log("UpdateProfessionReducer Response type call-------------", type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
