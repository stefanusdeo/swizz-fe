import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/stores/types";
import {
    ICallbackSubCategory,
    ISubCat
} from "@/stores/types/subCategoryTypes";
import {
    getSubCategory,
    getSubCategoryDetail,
    setCategory
} from "../actions/subCategoryAction";

export const useSubCategory = () => {
    const dispatch = useDispatch<any>();

    const managementSubCategoryState = useSelector((state: RootState) => state.subCategory);

    const handleSetCategory = async (cat: string) => {
        let subCategoryCallback: ICallbackSubCategory = await dispatch(setCategory(cat))
        return subCategoryCallback
    }

    const handleGetSubCategory = async (cat: string) => {
        let subCategoryCallback: ICallbackSubCategory = await dispatch(getSubCategory(cat))
        return subCategoryCallback
    }

    const handleGetSubCategoryDetail = async (subSlug: string) => {
        let subCategoryCallback: ICallbackSubCategory = await dispatch(getSubCategoryDetail(managementSubCategoryState.categoryUUID ?? "", subSlug))
        return subCategoryCallback
    }

    return {
        managementSubCategoryState,
        handleGetSubCategory,
        handleSetCategory,
        handleGetSubCategoryDetail
    }

}

export default useSubCategory;