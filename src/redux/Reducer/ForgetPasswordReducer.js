import {
  FORGETPASSWORD_REQUEST,
  FORGETPASSWORD_RESPONSE,
} from '../Services/Type';

const initialState = {
  data: null,
};

// console.log('call ForgetPasswordReducer');

export const ForgetPasswordReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case FORGETPASSWORD_REQUEST:
      // console.log('ForgetPassword Reducer type call-------------', type);

      return {
        ...prevState,
        action: action,
      };
    case FORGETPASSWORD_RESPONSE:
      // console.log('ForgetPassword Reducer type call-------------', type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
