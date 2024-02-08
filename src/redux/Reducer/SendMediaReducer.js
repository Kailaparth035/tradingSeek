import { SEND_MEDIA_REQUEST, SEND_MEDIA_RESPONSE } from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call SendMediaReducer");

export const SendMediaReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case SEND_MEDIA_REQUEST:
      // console.log(
      //   // "SendMediaReducer request  type call-------------",
      //   action
      // );

      return {
        ...prevState,
        action: action,
      };
    case SEND_MEDIA_RESPONSE:
      // console.log("SendMediaReducer response type call-------------", type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
