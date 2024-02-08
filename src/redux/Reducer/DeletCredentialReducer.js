import {
  DELET_CREDENTIAL_REQUEST,
  DELET_CREDENTIAL_RESPONSE,
} from "../Services/Type";

const initialState = {
  data: null,
};

// console.log('call DeletCredentialReducer');

export const DeletCredentialReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case DELET_CREDENTIAL_REQUEST:
      //   console.log("DeletCredentialReducer type call-------------", type);

      return {
        ...prevState,
        action: action,
      };
    case DELET_CREDENTIAL_RESPONSE:
      // console.log('DeletCredentialReducer type call-------------', type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
