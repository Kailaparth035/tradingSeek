import {
  SENDERMESSAGE_REQUEST,
  SENDERMESSAGE_RESPONSE,
} from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call SenderMessageReducer");

export const SenderMessageReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case SENDERMESSAGE_REQUEST:
      // console.log(
      //   // "SenderMessageReducer request  type call-------------",
      //   action
      // );

      return {
        ...prevState,
        action: action,
      };
    case SENDERMESSAGE_RESPONSE:
      // console.log("SenderMessageReducer response type call-------------", type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
