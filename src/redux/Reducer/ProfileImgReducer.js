import { PROFILEIMG_REQUEST, PROFILEIMG_RSPONSE } from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call ProfileImgReducer");

export const ProfileImgReducer = (state = initialState, action) => {
  // console.log("ProfileImgReducer call-------------");
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case PROFILEIMG_REQUEST:
      // console.log("ProfileImgReducer request type call-------------", type);

      return {
        ...prevState,
        action: action,
      };
    case PROFILEIMG_RSPONSE:
      // console.log("ProfileImgReducer Response type call-------------", type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
