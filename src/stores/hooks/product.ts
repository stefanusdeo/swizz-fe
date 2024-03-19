import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/stores/types';
import {
  IProduct,
  ICallbackProduct,
  IProductDetail,
} from '@/stores/types/productTypes';
import {
  getProductDetail,
  getProductImage,
  getProductList,
} from '../actions/productAction';

export const useProduct = () => {
  const dispatch = useDispatch<any>();

  const managementProductState = useSelector(
    (state: RootState) => state.product
  );
  const subCategory = useSelector((state: RootState) => state.subCategory);

  interface GetProductListParams {
    slugSub: string;
    isCustom?: number | null;
    page?: number;
    pageSize?: number;
    sortBy?: 'name' | 'created_at' | 'price';
    created_at?: string;
    sortOrder?: string;
    currency?: string | undefined;
    minPrice?: number;
    maxPrice?: number;
  }

  const handleGetProductList = async (params: GetProductListParams) => {
    const {
      slugSub,
      isCustom,
      page = 1,
      pageSize = 10,
      sortBy = 'name',
      created_at,
      sortOrder = 'asc',
      currency,
      minPrice,
      maxPrice,
    } = params;

    let generalCallback: ICallbackProduct = await dispatch(
      getProductList(
        subCategory.categoryUUID ?? '',
        slugSub,
        isCustom,
        page,
        pageSize,
        sortBy,
        created_at,
        sortOrder,
        currency,
        minPrice,
        maxPrice
      )
    );

    return generalCallback;
  };

  const handleGetProductDetail = async (id: string) => {
    let generalCallback: ICallbackProduct = await dispatch(
      getProductDetail(id)
    );
    return generalCallback;
  };

  const handleGetProductImage = async (
    id: number,
    productDetail: IProductDetail
  ) => {
    let generalCallback: ICallbackProduct = await dispatch(
      getProductImage(id.toString(), productDetail)
    );
    return generalCallback;
  };

  return {
    managementProductState,
    handleGetProductList,
    handleGetProductDetail,
    handleGetProductImage,
  };
};
