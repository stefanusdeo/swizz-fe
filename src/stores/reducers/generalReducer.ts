/* eslint-disable import/no-anonymous-default-export */

import {
  GeneralAction,
  IGeneral,
  GeneralType,
} from "@/stores/types/generalTypes";

const initialState = {
  language: "",
  languageText: "",
  aboutUs: [],
  bannerTop: [],
  bannerBottom: [],
  termCond: []
};

export default (
  state: IGeneral = initialState,
  { type, payload }: GeneralAction
) => {
  switch (type) {
    case GeneralType.GENERAL_PENDING:
      return { ...state, ...payload, error: null, isLoading: true };
    case GeneralType.GENERAL_SUCCESS:
      return { ...state, ...payload, isLoading: false };
    case GeneralType.GENERAL_FAILURE:
      return { ...state, ...payload, isLoading: false };

    default:
      return state;
  }
};
