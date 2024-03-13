import {
    ISubCategory,
    SubCategoryAction,
    SubCategoryType,
    ICallbackSubCategory,
    ISubCat
} from "@/stores/types/subCategoryTypes";
import { apiGet } from '@/api/apiFunction';
import { IErrorType } from "@/stores/types/errorTypes";
import { API_URL } from "@/api/apiUrl";

export const subCategoryPending = (): SubCategoryAction => ({
    type: SubCategoryType.SUBCATEGORY_PENDING,
    payload: {
        data: null,
    },
});

export const subCategorySuccess = (data: ISubCategory): SubCategoryAction => ({
    type: SubCategoryType.SUBCATEGORY_SUCCESS,
    payload: data,
});

export const subCategoryError = (error: IErrorType): SubCategoryAction => ({
    type: SubCategoryType.SUBCATEGORY_FAILURE,
    payload: error,
});

export const setCategory =
    (cat: string) => async (dispatch: any) => {
        try {
            const respSetCat: ICallbackSubCategory = {
                code: 200,
                message: "Success Set Category",
                data: {
                    categoryUUID: cat
                },
            };
            dispatch(subCategorySuccess({
                categoryUUID: cat
            }));

            return respSetCat;
        }
        catch (e) {
            const respSetCat: IErrorType = {
                code: 500,
                message: "Failed Set Category",
                data: null,
            };
            dispatch(subCategoryError(respSetCat));

            return respSetCat;
        }
    }

export const getSubCategory =
    (cat: string) => async (dispatch: any) => {
        try {
            const response = await apiGet(API_URL.subCategory, {
                category_uuid: cat,
                status : 1
            })

            if (response) {
                if (response.status === 200) {
                    const respSetCat: ICallbackSubCategory = {
                        code: 200,
                        message: "Success Get Sub Category",
                        data: {
                            subCategoryList: response.data.data
                        },
                    };
                    dispatch(subCategorySuccess({
                        subCategoryList: response.data.data
                    }));

                    return respSetCat;
                }
                else {
                    const respSetCat: IErrorType = {
                        code: 500,
                        message: "Failed Get Sub Category",
                        data: null,
                    };
                    dispatch(subCategoryError(respSetCat));

                    return respSetCat;
                }
            }
            else {
                const respSetCat: IErrorType = {
                    code: 500,
                    message: "Failed Get Sub Category",
                    data: null,
                };
                dispatch(subCategoryError(respSetCat));

                return respSetCat;
            }

        }
        catch (e) {
            const respSetCat: IErrorType = {
                code: 500,
                message: "Failed Get Sub Category",
                data: null,
            };
            dispatch(subCategoryError(respSetCat));

            return respSetCat;
        }
    }

export const getSubCategoryDetail =
    (cat: string, slugSub: string) => async (dispatch: any) => {
        try {
            const response = await apiGet(API_URL.subCategory, {
                category_uuid: cat,
                type: "image",
                slug: slugSub,
                status : 1
            })


            if (response) {
                if (response.status === 200 && response.data.data.length > 0) {
                    const respSetCat: ICallbackSubCategory = {
                        code: 200,
                        message: "Success Get Sub Category",
                        data: {
                            subCategoryList: response.data.data
                        },
                    };
                    dispatch(subCategorySuccess({
                        subCategory: response.data.data[0]
                    }));

                    return respSetCat;
                }
                else {
                    const respSetCat: IErrorType = {
                        code: 500,
                        message: "Failed Get Sub Category",
                        data: null,
                    };
                    dispatch(subCategoryError(respSetCat));

                    return respSetCat;
                }
            }
            else {
                const respSetCat: IErrorType = {
                    code: 500,
                    message: "Failed Get Sub Category",
                    data: null,
                };
                dispatch(subCategoryError(respSetCat));

                return respSetCat;
            }

        }
        catch (e) {
            const respSetCat: IErrorType = {
                code: 500,
                message: "Failed Get Sub Category",
                data: null,
            };
            dispatch(subCategoryError(respSetCat));

            return respSetCat;
        }
    }