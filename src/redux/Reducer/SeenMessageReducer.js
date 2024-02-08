import { SEEN_MESSAGE_REQUEST, SEEN_MESSAGE_RESPONSE } from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call SeenMessageReducer");

export const SeenMessageReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case SEEN_MESSAGE_REQUEST:
      // console.log("SeenMessageReducer request type call-------------", action);

      return {
        ...prevState,
        action: action,
      };
    case SEEN_MESSAGE_RESPONSE:
      // console.log("SeenMessageReducer response type call-------------", type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
