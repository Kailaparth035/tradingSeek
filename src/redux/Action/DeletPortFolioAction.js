import * as TYPES from "../Services/Type";
export function DeletPortFolioResponse(data) {
  // console.log("call SaveDeletPortFolioResponse : ");

  return {
    type: TYPES.DELET_PORTFOLIO_RESPONSE,
    payload: data,
  };
}

export function DeletPortFolioRequest(url) {
  console.log("call SaveDeletPortFolioRequest:", url);

  return {
    type: TYPES.DELET_PORTFOLIO_REQUEST,
    url: url,
  };
}
