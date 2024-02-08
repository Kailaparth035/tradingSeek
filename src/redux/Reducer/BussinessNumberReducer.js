import {
    BUSSINESSNUMBER_RESPONSE,
    BUSSINESSNUMBER_REQUEST,
  } from '../Services/Type';
  
  const initialState = {
    data: null,
  };
  
  // console.log('call BussinessNumberReducer');
  
  export const BussinessNumberReducer = (state = initialState, action) => {
    const prevState = {...state};
    const {type} = action;
  
    switch (type) {
      case BUSSINESSNUMBER_REQUEST:
        console.log('BussinessNumber Reducer type call-------------', type);
  
        return {
          ...prevState, 
          action: action,
        };
      case BUSSINESSNUMBER_RESPONSE:
        // console.log('BussinessNumber Reducer type call-------------', type);
  
        return {
          ...prevState,
          data: action.payload,
        };
    }
    return prevState;
  };
  