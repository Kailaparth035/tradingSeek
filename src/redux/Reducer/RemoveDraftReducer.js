import { REMOVEDRAFT_REQUEST, REMOVEDRAFT_RESPONSE } from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call RemoveDraftReducer");

export const RemoveDraftReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case REMOVEDRAFT_REQUEST:
      // console.log("RemoveDraftReducer  type call-------------", type);

      return {
        ...prevState,
        action: action,
      };
    case REMOVEDRAFT_RESPONSE:
      // console.log("RemoveDraftReducer  type call-------------", type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
