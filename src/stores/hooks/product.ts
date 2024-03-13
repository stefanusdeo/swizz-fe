import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/stores/types";
import {
    IProduct,
    ICallbackProduct,
    IProductDetail
} from "@/stores/types/productTypes";
import { getProductDetail, getProductImage, getProductList } from "../actions/productAction";

export const useProduct = () => {
    const dispatch = useDispatch<any>();

    const managementProductState = useSelector((state: RootState) => state.product);
    const subCategory = useSelector((state: RootState) => state.subCategory);

    const handleGetProductList = async (
        slugSub: string,
        isCustom?: number | null,
        page: number = 1,
        pageSize: number = 10
    ) => {
        let generalCallback: ICallbackProduct = await dispatch(getProductList(subCategory.categoryUUID ?? "", slugSub, isCustom, page, pageSize))
        return generalCallback
    }

    const handleGetProductDetail = async (
        id: string
    ) => {
        let generalCallback: ICallbackProduct = await dispatch(getProductDetail(id))
        return generalCallback
    }


    const handleGetProductImage = async (
        id: number,
        productDetail: IProductDetail
    ) => {
        let generalCallback: ICallbackProduct = await dispatch(getProductImage(id.toString(), productDetail))
        return generalCallback
    }

    return {
        managementProductState,
        handleGetProductList,
        handleGetProductDetail,
        handleGetProductImage
    }
}