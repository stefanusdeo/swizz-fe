import { AxiosError } from "axios";
import { IErrorType } from "./errorTypes";

// Action Types
export enum ProductType {
    PRODUCT_PENDING = "PRODUCT_PENDING",
    PRODUCT_SUCCESS = "PRODUCT_SUCCESS",
    PRODUCT_FAILURE = "PRODUCT_FAILURE",
}

// IState Product
export interface IProduct {
    productList?: IProductDetail[]
    pagination?: IPagination
    productDetail?: IProductDetail;
}

export interface IProductDetail {
    id: number;
    category_uuid: string;
    slug_sub_category: string;
    name: string;
    slug: string;
    main_img: string;
    size: ISize[];
    price_dolar: string;
    price_chf: string;
    price_eur: string;
    product_lang: IProductLang;
    is_custom: number;
    productImage?: IProductImage[]
}

export interface IProductImage {
    id: string;
    imageBase64: string;
}

export interface IProductLang {
    language: string;
    description: string;
    information: string;
}

export interface ISize {
    size: string;
    desc: string;
}

export interface IPagination {
    page: number
    pageSize: number,
    totalData: number,
    totalPage: number
}
// IAction Product Account
interface GetProductAction {
    type: ProductType.PRODUCT_SUCCESS;
    payload: IProduct;
}

interface SetLoadingAction {
    type: ProductType.PRODUCT_PENDING;
    payload?: any;
}

interface SetErrorAction {
    type: ProductType.PRODUCT_FAILURE;
    payload: IErrorType;
}

// ICallback Product Account
export interface ICallbackProduct {
    code: number;
    message: string;
    data: IProduct | null;
}

export type ProductAction = GetProductAction | SetLoadingAction | SetErrorAction;
