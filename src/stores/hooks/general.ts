import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/stores/types";
import {
    IGeneral,
    ICallbackGeneral,
    IFormContact
} from "@/stores/types/generalTypes";
import { getAboutUs, getBanner, getTermCond, setCountry, setLanguage, submitContact } from "../actions/generalAction";

export const useGeneral = () => {
    const dispatch = useDispatch<any>();

    const managementGeneralState = useSelector((state: RootState) => state.general);
    const subCategory = useSelector((state: RootState) => state.subCategory);

    const handleSetLanguage = async (lang: string) => {
        let generalCallback: ICallbackGeneral = await dispatch(setLanguage(lang))
        return generalCallback
    }


    const handleSetCountry = async (country: string) => {
        let generalCallback: ICallbackGeneral = await dispatch(setCountry(country))
        return generalCallback
    }

    const handleGetAboutUs = async () => {
        let generalCallback: ICallbackGeneral = await dispatch(getAboutUs(subCategory.categoryUUID ?? ""))
        return generalCallback
    }

    const handleGetTermCond = async () => {
        let generalCallback: ICallbackGeneral = await dispatch(getTermCond(subCategory.categoryUUID ?? ""))
        return generalCallback
    }

    const handleGetBanner = async () => {
        let generalCallback: ICallbackGeneral = await dispatch(getBanner(subCategory.categoryUUID ?? ""))
        return generalCallback
    }

    const handleSubmitContact = async (body: IFormContact) => {
        let generalCallback: ICallbackGeneral = await dispatch(submitContact(body))
        return generalCallback
    }
    
    return {
        managementGeneralState,
        handleSetLanguage,
        handleGetAboutUs,
        handleSetCountry,
        handleGetBanner,
        handleGetTermCond,
        handleSubmitContact
    }

}

export default useGeneral;