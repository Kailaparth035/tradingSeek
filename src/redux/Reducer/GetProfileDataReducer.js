import {
  GETPROFILEDATA_RESPONSE,
  GETPROFILEDATA_REQUEST,
} from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call GetProfileDataReducer");

export const GetProfileDataReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case GETPROFILEDATA_REQUEST:
      // console.log("GetProfessionReducer Request type call-------------", type);

      return {
        ...prevState,
        action: action,
      };
    case GETPROFILEDATA_RESPONSE:
      // console.log("GetProfessionReducer Response type call-------------", type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
