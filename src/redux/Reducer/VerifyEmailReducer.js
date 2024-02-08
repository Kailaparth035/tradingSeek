import { VERIFYEMAIL_REQUEST, VERIFYEMAIL_RESONSE } from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call VerifyEmailReducer");

export const VerifyEmailReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case VERIFYEMAIL_REQUEST:
      // console.log("VerifyEmailReducer request Reducer call=======");

      return {
        ...prevState,
        action: action,
      };
    case VERIFYEMAIL_RESONSE:
      // console.log("VerifyEmailReducer Reducer type call-------------", type);
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
