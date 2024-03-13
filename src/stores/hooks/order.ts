import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/stores/types";
import {
    IOrder,
    ICallbackOrder,
    ICart,
    ICheckoutOrder
} from "@/stores/types/orderTypes";
import { addCartList, modifyCartList, setInitCartList, submitCheckout } from "../actions/orderAction";

export const useOrder = () => {
    const dispatch = useDispatch<any>();

    const managementOrderState = useSelector((state: RootState) => state.order);

    const handleSetInitCartList = async () => {
        let orderCallback: ICallbackOrder = await dispatch(setInitCartList())
        return orderCallback
    }

    const handleAddCartList = async (newProduct: ICart) => {
        let orderCallback: ICallbackOrder = await dispatch(addCartList(newProduct, managementOrderState.cartList ?? []))
        return orderCallback
    }

    const handleSubmitCheckout = async (body: ICheckoutOrder) => {
        let orderCallback: ICallbackOrder = await dispatch(submitCheckout(body))
        return orderCallback
    }

    const handleModifyCartList = async (newCart: ICart[]) => {
        let orderCallback: ICallbackOrder = await dispatch(modifyCartList(newCart))
        return orderCallback
    }


    return {
        managementOrderState,
        handleSetInitCartList,
        handleSubmitCheckout,
        handleAddCartList,
        handleModifyCartList
    }

}

export default useOrder;