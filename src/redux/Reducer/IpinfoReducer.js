import { IPINFO_REQUEST, IPINFO_RESPONSE } from "../Services/Type";

const initialState = {
  data: null,
};

// console.log("call IpinfoReducer");

export const IpinfoReducer = (state = initialState, action) => {
  const prevState = { ...state };
  const { type } = action;

  switch (type) {
    case IPINFO_REQUEST:
      // console.log("IpinfoReducer request type call-------------", type);

      return {
        ...prevState,
        action: action,
      };
    case IPINFO_RESPONSE:
      // console.log("IpinfoReducer response type call-------------", type);

      return {
        ...prevState,
        data: action.payload,
      };
  }
  return prevState;
};
