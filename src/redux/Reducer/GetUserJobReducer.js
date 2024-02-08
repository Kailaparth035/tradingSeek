import { GETUSER_JOB_REQUEST, GETUSER_JOB_RESPONSE } from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call GetUserJobReducer");

export const GetUserJobReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case GETUSER_JOB_REQUEST:
      // console.log("GetUserJobReducer request type call-------------", type);

      return {
        ...prevState,
        action: action,
      };
    case GETUSER_JOB_RESPONSE:
      // console.log("GetUserJobReducer response type call-------------", type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
