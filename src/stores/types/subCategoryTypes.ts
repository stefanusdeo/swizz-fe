import { AxiosError } from "axios";
import { IErrorType } from "./errorTypes";

// Action Types
export enum SubCategoryType {
    SUBCATEGORY_PENDING = "SUBCATEGORY_PENDING",
    SUBCATEGORY_SUCCESS = "SUBCATEGORY_SUCCESS",
    SUBCATEGORY_FAILURE = "SUBCATEGORY_FAILURE",
}

// IState SubCategory
export interface ISubCategory {
    subCategoryList?: Array<ISubCat>;
    categoryUUID?: string;
    subCategory?: ISubCat | null;
}

export interface ISubCat {
    id: number;
    uuid_category: string;
    slug: string;
    name: string;
    status: string;
    image_classic?: string;
    image_custom?:string;
    created_at: string;
    is_custom?: number;
}

// IAction SubCategory

// IAction SubCategory Account
interface GetSubCategoryAction {
    type: SubCategoryType.SUBCATEGORY_SUCCESS;
    payload: ISubCategory;
}

interface SetLoadingAction {
    type: SubCategoryType.SUBCATEGORY_PENDING;
    payload?: any;
}

interface SetErrorAction {
    type: SubCategoryType.SUBCATEGORY_FAILURE;
    payload: IErrorType;
}

// ICallback SubCategory Account
export interface ICallbackSubCategory {
    code: number;
    message: string;
    data: ISubCategory | null;
}

export type SubCategoryAction = GetSubCategoryAction | SetLoadingAction | SetErrorAction;
