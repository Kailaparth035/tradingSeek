import * as TYPES from "../Services/Type";
export function PaymentMethodResponse(data) {
  // console.log("call SavePaymentMethodResponse : ", data);

  return {
    type: TYPES.PAYMENT_METHOD_RESPONSE,
    payload: data,
  };
}

export function PaymentMethodRequest(bodydata) {
  // console.log("call SavePaymentMethodRequest: ", key);
  //   console.log("bodydata==>", bodydata);

  return {
    type: TYPES.PAYMENT_METHOD_REQUEST,
    bodydata: bodydata,
  };
}
