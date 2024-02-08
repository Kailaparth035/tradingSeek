import {
  DELET_PORTFOLIO_REQUEST,
  DELET_PORTFOLIO_RESPONSE,
} from "../Services/Type";

const initialState = {
  data: null,
};

// console.log('call DeletPortfolioReducer');

export const DeletPortfolioReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case DELET_PORTFOLIO_REQUEST:
      // console.log('DeletPortfolioReducer Reducer type call-------------', type);

      return {
        ...prevState,
        action: action,
      };
    case DELET_PORTFOLIO_RESPONSE:
      // console.log('DeletPortfolioReducer Reducer type call-------------', type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
