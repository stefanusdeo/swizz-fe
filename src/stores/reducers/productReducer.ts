/* eslint-disable import/no-anonymous-default-export */

import {
  ProductAction,
  IProduct,
  ProductType,
} from "@/stores/types/productTypes";

const initialState = {
  productList: [],
  pagination: {
    page: 1,
    pageSize: 10,
    totalData: 1,
    totalPage: 1
  }
};

export default (
  state: IProduct = initialState,
  { type, payload }: ProductAction
) => {
  switch (type) {
    case ProductType.PRODUCT_PENDING:
      return { ...state, ...payload, error: null, isLoading: true };
    case ProductType.PRODUCT_SUCCESS:
      return { ...state, ...payload, isLoading: false };
    case ProductType.PRODUCT_FAILURE:
      return { ...state, ...payload, isLoading: false };

    default:
      return state;
  }
};
