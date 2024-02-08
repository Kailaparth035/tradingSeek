import * as Type from "../Services/Type";

export const ToastDisplay = (payload) => ({
  type: Type.SHOW_TOAST,
  payload: payload,
});
