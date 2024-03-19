import { AxiosError } from 'axios';
import { IErrorType } from './errorTypes';
import { IProductDetail, ISize } from './productTypes';

// Action Types
export enum OrderType {
  ORDER_PENDING = 'ORDER_PENDING',
  ORDER_SUCCESS = 'ORDER_SUCCESS',
  ORDER_FAILURE = 'ORDER_FAILURE',
}

// IState Order
export interface IOrder {
  cartList?: ICart[];
}

export interface ICart {
  product?: IProductDetail;
  qty?: number;
  size?: ISize;
  imageCustomFinal?: string;
  customList?: ICustom[];
  imageCustom1?: string;
  imageCustom2?: string;
  imageCustom3?: string;
  imageCustom4?: string;
  isCustom?: boolean;
}

export interface IFormCheckout {
  email: string;
  country: string;
  name: string;
  address: string;
  postal_code: string;
  phone: string;
  city: string;
}

export interface ICheckoutOrder extends IFormCheckout {
  currency: string;
  uuid_category: string;
  products: IProductCheckoout[];
}

export interface IProductCheckoout {
  image_four: any;
  image_three: string | undefined;
  image_one: string | undefined;
  image_two: string | undefined;
  id: string;
  qty: number;
  image_custom?: string;
}

export interface ICustom {
  customProperty: string;
  customValue: string;
}

// IAction Order Account
interface GetOrderAction {
  type: OrderType.ORDER_SUCCESS;
  payload: IOrder;
}

interface SetLoadingAction {
  type: OrderType.ORDER_PENDING;
  payload?: any;
}

interface SetErrorAction {
  type: OrderType.ORDER_FAILURE;
  payload: IErrorType;
}

// ICallback Order Account
export interface ICallbackOrder {
  code: number;
  message: string;
  data: IOrder | null;
}

export type OrderAction = GetOrderAction | SetLoadingAction | SetErrorAction;
