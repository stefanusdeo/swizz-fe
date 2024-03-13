/* eslint-disable import/no-anonymous-default-export */

import {
  OrderAction,
  IOrder,
  OrderType,
} from "@/stores/types/orderTypes";

const initialState = {
  cartList: []
};

export default (
  state: IOrder = initialState,
  { type, payload }: OrderAction
) => {
  switch (type) {
    case OrderType.ORDER_PENDING:
      return { ...state, ...payload, error: null, isLoading: true };
    case OrderType.ORDER_SUCCESS:
      return { ...state, ...payload, isLoading: false };
    case OrderType.ORDER_FAILURE:
      return { ...state, ...payload, isLoading: false };

    default:
      return state;
  }
};
