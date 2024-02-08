import { TOGGLE_APP_UPDATE_MODAL, SHOW_TOAST } from "../Services/Type";
import Colors from "../../theme/Color";
import { showMessage } from "react-native-flash-message";
import { scale } from "../../theme/Scalling";

const initialState = {
  isAppUpdateModalVisible: false,
};

export const TostReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_TOAST:
      console.log("action.type :::", action.payload.type);
      showMessage({
        message: action.payload.title,
        type: action.payload.type === "negative" ? "danger" : "success",
        style: {
          borderBottomRightRadius: scale(50),
          borderBottomLeftRadius: scale(50),
          alignItems: "center",
        },
      });
      return {
        ...state,
      };
    default:
      return state;
  }
};
