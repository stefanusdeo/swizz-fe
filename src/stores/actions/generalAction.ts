import {
    IGeneral,
    GeneralAction,
    GeneralType,
    ICallbackGeneral,
    IBanner,
    IFormContact
} from "@/stores/types/generalTypes";

import { IErrorType } from "@/stores/types/errorTypes";
import { listLanguage } from "@/translation/i18n";
import { apiGet, apiPost } from "@/api/apiFunction";
import { API_URL } from "@/api/apiUrl";
import { listCountry } from "@/component/constant";

export const generalPending = (): GeneralAction => ({
    type: GeneralType.GENERAL_PENDING,
    payload: {
        data: null,
    },
});

export const generalSuccess = (data: IGeneral): GeneralAction => ({
    type: GeneralType.GENERAL_SUCCESS,
    payload: data,
});

export const generalError = (error: IErrorType): GeneralAction => ({
    type: GeneralType.GENERAL_FAILURE,
    payload: error,
});

export const setLanguage =
    (lang: string) => async (dispatch: any) => {
        try {
            let currentLangValid = listLanguage.find(x => x.id === lang)

            const respSetLang: ICallbackGeneral = {
                code: 200,
                message: "Success Set Language",
                data: {
                    language: lang,
                    languageText: currentLangValid?.text
                },
            };
            dispatch(generalSuccess({
                language: lang,
                languageText: currentLangValid?.text
            }));

            return respSetLang;
        }
        catch (e) {
            const respSetLang: IErrorType = {
                code: 500,
                message: "Failed Set Language",
                data: null,
            };
            dispatch(generalError(respSetLang));

            return respSetLang;
        }
    }


export const setCountry =
    (country: string) => async (dispatch: any) => {
        try {
            let currentLangValid = listCountry.find(x => x.id === country)

            if (currentLangValid) {
                const respSetLang: ICallbackGeneral = {
                    code: 200,
                    message: "Success Set Language",
                    data: {
                        country: currentLangValid
                    },
                };
                dispatch(generalSuccess({
                    country: currentLangValid
                }));

                return respSetLang;
            }
            else {
                debugger
                localStorage.setItem('country', listCountry[8].id)
                const respSetLang: ICallbackGeneral = {
                    code: 200,
                    message: "Success Set Language",
                    data: {
                        country: listCountry[8]
                    },
                };
                dispatch(generalSuccess({
                    country: listCountry[8]
                }));

                return respSetLang;
            }
        }
        catch (e) {
            const respSetLang: IErrorType = {
                code: 500,
                message: "Failed Set Language",
                data: null,
            };
            dispatch(generalError(respSetLang));

            return respSetLang;
        }
    }


export const getAboutUs =
    (cat: string) => async (dispatch: any) => {
        try {
            const response = await apiGet(API_URL.aboutUs, {
                category_uuid: cat
            })

            if (response) {
                if (response.status === 200) {
                    let dataAboutUs = JSON.parse(response.data.data.content)
                    const respSetLang: ICallbackGeneral = {
                        code: 200,
                        message: "Success Set Language",
                        data: {
                            aboutUs: dataAboutUs
                        },
                    };
                    dispatch(generalSuccess({
                        aboutUs: dataAboutUs
                    }));

                    return respSetLang;
                }
                else {
                    const respSetLang: IErrorType = {
                        code: 500,
                        message: "Failed Get About Us",
                        data: null,
                    };
                    dispatch(generalError(respSetLang));

                    return respSetLang;
                }
            }
            else {
                const respSetLang: IErrorType = {
                    code: 500,
                    message: "Failed Get About Us",
                    data: null,
                };
                dispatch(generalError(respSetLang));

                return respSetLang;
            }
        }
        catch (e) {
            const respSetLang: IErrorType = {
                code: 500,
                message: "Failed Get About Us",
                data: null,
            };
            dispatch(generalError(respSetLang));

            return respSetLang;
        }
    }

export const getTermCond =
    (cat: string) => async (dispatch: any) => {
        try {
            const response = await apiGet(API_URL.termCond, {
                category_uuid: cat
            })

            if (response) {
                if (response.status === 200) {
                    let dataAboutUs = JSON.parse(response.data.data.content)
                    const respSetLang: ICallbackGeneral = {
                        code: 200,
                        message: "Success Set TermCond",
                        data: {
                            termCond: dataAboutUs
                        },
                    };
                    dispatch(generalSuccess({
                        termCond: dataAboutUs
                    }));

                    return respSetLang;
                }
                else {
                    const respSetLang: IErrorType = {
                        code: 500,
                        message: "Failed Get TermCond",
                        data: null,
                    };
                    dispatch(generalError(respSetLang));

                    return respSetLang;
                }
            }
            else {
                const respSetLang: IErrorType = {
                    code: 500,
                    message: "Failed Get TermCond",
                    data: null,
                };
                dispatch(generalError(respSetLang));

                return respSetLang;
            }
        }
        catch (e) {
            const respSetLang: IErrorType = {
                code: 500,
                message: "Failed Get About Us",
                data: null,
            };
            dispatch(generalError(respSetLang));

            return respSetLang;
        }
    }

export const getBanner = (cat: string) => async (dispatch: any) => {
    try {
        const response = await apiGet(API_URL.banners, {
            uuid_category: cat
        })
        if (response && response.status === 200) {
            let data: IBanner[] = response.data.data
            let topBanner = data.filter(x => x.type === "Top" || x.type === "top")
            let bottomBanner = data.filter(x => x.type === "Bottom" || x.type === "bottom")
            const respSetLang: ICallbackGeneral = {
                code: 200,
                message: "Success Set Banner",
                data: {
                    bannerBottom: bottomBanner,
                    bannerTop: topBanner
                },
            };
            dispatch(generalSuccess({
                bannerBottom: bottomBanner,
                bannerTop: topBanner
            }));

            return respSetLang;
        }
        else {
            const respSetLang: IErrorType = {
                code: 500,
                message: "Failed Get Banner",
                data: null,
            };
            dispatch(generalError(respSetLang));

            return respSetLang;
        }
    }
    catch (e) {
        const respSetLang: IErrorType = {
            code: 500,
            message: "Failed Get Banner",
            data: null,
        };
        dispatch(generalError(respSetLang));

        return respSetLang;
    }
}

export const submitContact = (body: IFormContact) => async (dispatch: any) => {
    try {
        const response = await apiPost(API_URL.email, body)
        if (response.status === 200) {
            const respSetLang: ICallbackGeneral = {
                code: 200,
                message: "Success Post Contact",
                data: null,
            };

            return respSetLang;
        }
        else {
            const respSetLang: IErrorType = {
                code: 500,
                message: "Failed Post Contact",
                data: null,
            };
            dispatch(generalError(respSetLang));

            return respSetLang;
        }
    }
    catch (e) {
        const respSetLang: IErrorType = {
            code: 500,
            message: "Failed Post Contact",
            data: null,
        };
        dispatch(generalError(respSetLang));

        return respSetLang;
    }
}