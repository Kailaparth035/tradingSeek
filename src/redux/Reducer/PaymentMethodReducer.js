import {
  PAYMENT_METHOD_REQUEST,
  PAYMENT_METHOD_RESPONSE,
} from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call PaymentMethodReducer");

export const PaymentMethodReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case PAYMENT_METHOD_REQUEST:
      // console.log("PaymentMethodReducer request type call-------------", action);

      return {
        ...prevState,
        action: action,
      };
    case PAYMENT_METHOD_RESPONSE:
      // console.log("PaymentMethodReducer response type call-------------", type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
