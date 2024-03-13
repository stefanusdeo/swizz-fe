import { AxiosError } from "axios";
import { IErrorType } from "./errorTypes";

// Action Types
export enum GeneralType {
    GENERAL_PENDING = "GENERAL_PENDING",
    GENERAL_SUCCESS = "GENERAL_SUCCESS",
    GENERAL_FAILURE = "GENERAL_FAILURE",
}

// IState General
export interface IGeneral {
    language?: string;
    languageText?: string;
    aboutUs?: IAboutUs[];
    country?: IListCountry;
    bannerTop?: IBanner[];
    bannerBottom?: IBanner[];
    termCond?: IAboutUs[];
}

// IAction General
interface IAboutUs {
    content: string;
    lang: string;
}

export interface IFormContact {
    name: string;
    email: string;
    message: string;
}

export interface IBanner {
    id: number;
    uuid_category: string;
    image: string;
    type: string;
    id_product: number;
    created_at: string;
    product: IProductBanner;
}

export interface IProductBanner {
    slug: string;
    product_id: number;
    product_name: string;
}

export interface IListCountry {
    id: string;
    country: string;
    currency: string;
    currencyLogo: string;
    textShow: string;
}

// IAction General Account
interface GetGeneralAction {
    type: GeneralType.GENERAL_SUCCESS;
    payload: IGeneral;
}

interface SetLoadingAction {
    type: GeneralType.GENERAL_PENDING;
    payload?: any;
}

interface SetErrorAction {
    type: GeneralType.GENERAL_FAILURE;
    payload: IErrorType;
}

// ICallback General Account
export interface ICallbackGeneral {
    code: number;
    message: string;
    data: IGeneral | null;
}

export type GeneralAction = GetGeneralAction | SetLoadingAction | SetErrorAction;
