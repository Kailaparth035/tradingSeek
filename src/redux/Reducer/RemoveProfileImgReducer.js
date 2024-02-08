import {
  REMOVE_PROFILEIMG_REQUEST,
  REMOVE_PROFILEIMG_RESPONSE,
} from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call RemoveProfileImgReducer");

export const RemoveProfileImgReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case REMOVE_PROFILEIMG_REQUEST:
      // console.log("RemoveProfileImgReducer  type call-------------", type);

      return {
        ...prevState,
        action: action,
      };
    case REMOVE_PROFILEIMG_RESPONSE:
      // console.log("RemoveProfileImgReducer  type call-------------", type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
