import {
  ADD_CREDENTIAL_REQUEST,
  ADD_CREDENTIAL_RESPONSE,
} from "../Services/Type";

const initialState = {
  data: null,
};

// console.log('call AddCredentialReducer');

export const AddCredentialReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case ADD_CREDENTIAL_REQUEST:
      // console.log("AddCredentialReducer type call-------------", type);

      return {
        ...prevState,
        action: action,
      };
    case ADD_CREDENTIAL_RESPONSE:
      // console.log('AddCredentialReducer type call-------------', type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
