export enum ErrorType {
  ERROR_SUCCESS = "ERROR_SUCCESS",
}

export interface IErrorType {
  code: number;
  message: string;
  data: null;
}

interface IErrorGlobal {
  type: ErrorType.ERROR_SUCCESS;
  payload: {
    error: IErrorType;
  };
}

export type IError = IErrorGlobal;
