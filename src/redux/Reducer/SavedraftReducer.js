import { SAVEDRAFT_REQUEST, SAVEDRAFT_RESPONSE } from "../Services/Type";

const initialState = {
  data: null,
};

// console.log('call SavedraftReducer');

export const SavedraftReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case SAVEDRAFT_REQUEST:
      // console.log('SavedraftReducer request type call-------------', type);
      return {
        ...prevState,
        action: action,
      };
    case SAVEDRAFT_RESPONSE:
      // console.log('SavedraftReducer response type call-------------', type);
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
