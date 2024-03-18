import {
  IOrder,
  OrderAction,
  OrderType,
  ICallbackOrder,
  ICart,
  ICheckoutOrder,
} from '@/stores/types/orderTypes';

import { IErrorType } from '@/stores/types/errorTypes';
import { listLanguage } from '@/translation/i18n';
import { apiGet, apiPost } from '@/api/apiFunction';
import { API_URL } from '@/api/apiUrl';
import { listCountry } from '@/component/constant';
import localforage from 'localforage';

export const orderPending = (): OrderAction => ({
  type: OrderType.ORDER_PENDING,
  payload: {
    data: null,
  },
});

export const orderSuccess = (data: IOrder): OrderAction => ({
  type: OrderType.ORDER_SUCCESS,
  payload: data,
});

export const orderError = (error: IErrorType): OrderAction => ({
  type: OrderType.ORDER_FAILURE,
  payload: error,
});

export const setInitCartList = () => async (dispatch: any) => {
  try {
    let cartList: ICart[] | null = await localforage.getItem('cart');
    if (cartList) {
      const respSetOrder: ICallbackOrder = {
        code: 200,
        message: 'Success Init Cart',
        data: {
          cartList: cartList,
        },
      };
      dispatch(
        orderSuccess({
          cartList: cartList,
        })
      );

      return respSetOrder;
    } else {
      const respSetOrder: IErrorType = {
        code: 500,
        message: 'Invalid Set Cart',
        data: null,
      };
      dispatch(orderError(respSetOrder));

      return respSetOrder;
    }
  } catch (e) {
    const respSetOrder: IErrorType = {
      code: 500,
      message: 'Invalid Set Cart',
      data: null,
    };
    dispatch(orderError(respSetOrder));

    return respSetOrder;
  }
};

export const modifyCartList = (cartList: ICart[]) => async (dispatch: any) => {
  try {
    await localforage.setItem('cart', cartList);
    const respSetOrder: ICallbackOrder = {
      code: 200,
      message: 'Success Init Cart',
      data: {
        cartList: cartList,
      },
    };
    dispatch(
      orderSuccess({
        cartList: cartList,
      })
    );

    return respSetOrder;
  } catch (e) {
    const respSetOrder: IErrorType = {
      code: 500,
      message: 'Invalid Set Cart',
      data: null,
    };
    dispatch(orderError(respSetOrder));

    return respSetOrder;
  }
};

export const addCartList =
  (newProduct: ICart, cartList: ICart[]) => async (dispatch: any) => {
    try {
      let newCart: ICart[] = cartList.map((obj) => ({ ...obj }));

      if (newCart.length !== 0) {
        let isAnyProduct = cartList.findIndex(
          (x) => x.product?.id === newProduct.product?.id
        );
        if (isAnyProduct >= 0) {
          if (newCart[isAnyProduct].isCustom == false) {
            newCart[isAnyProduct].qty =
              (newCart[isAnyProduct].qty ?? 0) + (newProduct.qty ?? 0);
          } else {
            newCart.push(newProduct);
          }
        } else {
          newCart.push(newProduct);
        }
      } else {
        newCart.push(newProduct);
      }
      await localforage.setItem('cart', newCart);
      console.log(newCart, 'ini');
      const respSetOrder: ICallbackOrder = {
        code: 200,
        message: 'Success Init Cart',
        data: {
          cartList: newCart,
        },
      };
      dispatch(
        orderSuccess({
          cartList: newCart,
        })
      );

      return respSetOrder;
    } catch (e) {
      const respSetOrder: IErrorType = {
        code: 500,
        message: 'Invalid Set Cart',
        data: null,
      };
      dispatch(orderError(respSetOrder));

      return respSetOrder;
    }
  };

export const submitCheckout =
  (body: ICheckoutOrder) => async (dispatch: any) => {
    try {
      const response = await apiPost(API_URL.order, body);
      if (response.status === 200) {
        const respSetOrder: ICallbackOrder = {
          code: 200,
          message: 'Success Init Cart',
          data: null,
        };
        dispatch(
          orderSuccess({
            cartList: [],
          })
        );
        await localforage.removeItem('cart');
        return respSetOrder;
      } else {
        const respSetOrder: IErrorType = {
          code: 500,
          message: 'Failed Checkout',
          data: null,
        };
        dispatch(orderError(respSetOrder));

        return respSetOrder;
      }
    } catch (e) {
      const respSetOrder: IErrorType = {
        code: 500,
        message: 'Failed Checkout',
        data: null,
      };
      dispatch(orderError(respSetOrder));

      return respSetOrder;
    }
  };
