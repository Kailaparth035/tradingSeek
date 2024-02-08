import {
    EMAIL_VERIFY_REQUEST,
    EMAIL_VERIFY_RESPONSE,
  } from '../Services/Type';
  
  const initialState = {
    data: null,
  };
  
  // console.log('call EmailVerifyReducer');
  
  export const EmailVerifyReducer = (state = initialState, action) => {
    const prevState = {...state};
    const {type} = action;
  
    switch (type) {
      case EMAIL_VERIFY_REQUEST:
        // console.log('EmailVerifyRequest Reducer type call-------------', type);
  
        return {
          ...prevState,
          action: action,
        };
      case EMAIL_VERIFY_RESPONSE:
        // console.log('EmailVerifyResponse Reducer  type call-------------', type);
  
        return {
          ...prevState,
          data: action.payload,
        };
    }
    return prevState;
  };
  