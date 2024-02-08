import { PROFESSION_REQUEST, PROFESSION_RESPONSE } from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call ProfessionReducer");

export const ProfessionReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case PROFESSION_REQUEST:
      // console.log("Profession Reducer type call-------------", type);

      return {
        ...prevState,
        action: action,
      };
    case PROFESSION_RESPONSE:
      // console.log("Profession Reducer type call-------------", type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
