/* eslint-disable import/no-anonymous-default-export */

import {
  SubCategoryAction,
  ISubCategory,
  SubCategoryType,
} from "@/stores/types/subCategoryTypes";

const initialState = {
  subCategoryList: [],
  categoryUUID: '',
  subCategory: null
};

export default (
  state: ISubCategory = initialState,
  { type, payload }: SubCategoryAction
) => {
  switch (type) {
    case SubCategoryType.SUBCATEGORY_PENDING:
      return { ...state, ...payload, error: null, isLoading: true };
    case SubCategoryType.SUBCATEGORY_SUCCESS:
      return { ...state, ...payload, isLoading: false };
    case SubCategoryType.SUBCATEGORY_FAILURE:
      return { ...state, ...payload, isLoading: false };

    default:
      return state;
  }
};
