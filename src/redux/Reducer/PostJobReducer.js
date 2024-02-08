import { POSTJOB_REQUEST, POSTJOB_RESPONSE } from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call PostJobReducer");

export const PostJobReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case POSTJOB_REQUEST:
      // console.log("PostJobReducer request type call-------------", type);
      return {
        ...prevState,
        action: action,
      };
    case POSTJOB_RESPONSE:
      // console.log("PostJobReducer response type call-------------", type);
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
