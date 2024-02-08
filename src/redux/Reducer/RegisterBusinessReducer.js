import {REGISTERBUSINESS_REQUEST, REGISTERBUSINESS_RESPONSE} from '../Services/Type';

const initialState = {
  data: null,
};

// console.log('call RegisterBusinessReducer');

export const RegisterBusinessReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case REGISTERBUSINESS_REQUEST:
      // console.log('RegisterBusinessReducer request type call-------------', type);
      return {
        ...prevState,
        action: action,
      };
    case REGISTERBUSINESS_RESPONSE:
      // console.log('RegisterBusinessReducer response type call-------------', type);
      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
