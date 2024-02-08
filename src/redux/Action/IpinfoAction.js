import * as TYPES from "../Services/Type";
export function IpinfoResponse(data) {
  // console.log("call SaveIpinfoResponse:", data);

  return {
    type: TYPES.IPINFO_RESPONSE,
    payload: data,
  };
}

export function IpinfoRequest() {
  // console.log("call SaveIpinfoRequest:");

  return {
    type: TYPES.IPINFO_REQUEST,
  };
}
