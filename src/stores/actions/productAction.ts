import {
  IProduct,
  ProductAction,
  ProductType,
  ICallbackProduct,
  IProductDetail,
  IPagination,
  IProductImage,
} from '@/stores/types/productTypes';
import { apiGet } from '@/api/apiFunction';
import { IErrorType } from '@/stores/types/errorTypes';
import { API_URL } from '@/api/apiUrl';
import toast from 'react-hot-toast';

export const productPending = (): ProductAction => ({
  type: ProductType.PRODUCT_PENDING,
  payload: {
    data: null,
  },
});

export const productSuccess = (data: IProduct): ProductAction => ({
  type: ProductType.PRODUCT_SUCCESS,
  payload: data,
});

export const productError = (error: IErrorType): ProductAction => ({
  type: ProductType.PRODUCT_FAILURE,
  payload: error,
});

export const getProductList =
  (
    cat: string,
    slugSub: string,
    isCustom?: number | null,
    page: number = 1,
    pageSize: number = 10,
    sortBy: string = 'name',
    created_at?: string,
    sortOrder: string = 'asc',
    currency?: string,
    minPrice?: number,
    maxPrice?: number
  ) =>
  async (dispatch: any) => {
    let body: any = null;
    if (isCustom) {
      body = {
        status: 1,
        page: page,
        pageSize: pageSize,
        category_uuid: cat,
        slug_sub_category: slugSub,
        is_custom: isCustom,
      };
    } else {
      body = {
        status: 1,
        page: page,
        pageSize: pageSize,
        category_uuid: cat,
        slug_sub_category: slugSub,
        sortBy,
        created_at,
        currency,
        minPrice,
        sortOrder,
      };

      if (maxPrice && maxPrice > 0) {
        body = {
          ...body,
          maxPrice,
        };
      }
    }
    try {
      const response = await apiGet(API_URL.product, body);

      if (response.status === 200) {
        let data: IProductDetail[] = response.data.data;
        let pagination = response.data.pagination;
        pagination.page = Number(pagination.page);
        pagination.pageSize = Number(pagination.pageSize);
        const respGetProduct: ICallbackProduct = {
          code: 200,
          message: 'Success Get Sub Category',
          data: {
            productList: data,
            pagination: pagination,
          },
        };
        dispatch(
          productSuccess({
            productList: data,
            pagination: pagination,
          })
        );

        return respGetProduct;
      } else {
        const respGetProduct: IErrorType = {
          code: 500,
          message: 'Failed Get Product',
          data: null,
        };
        dispatch(productError(respGetProduct));
        toast.error('error!');

        return respGetProduct;
      }
    } catch (e) {
      const respGetProduct: IErrorType = {
        code: 500,
        message: 'Failed Get Product',
        data: null,
      };
      dispatch(productError(respGetProduct));
      toast.error('error!');

      return respGetProduct;
    }
  };

export const getProductDetail = (id: string) => async (dispatch: any) => {
  let body = {
    slug: id,
  };
  try {
    const response = await apiGet(API_URL.product, body);

    if (response.status === 200) {
      let data = response.data.data;

      if (data.length > 0) {
        let productDetail = data[0];
        productDetail.size = JSON.parse(productDetail.size);
        const respGetProduct: ICallbackProduct = {
          code: 200,
          message: 'Success Get Sub Category',
          data: {
            productDetail: productDetail,
          },
        };
        dispatch(
          productSuccess({
            productDetail: productDetail,
          })
        );

        return respGetProduct;
      } else {
        const respGetProduct: IErrorType = {
          code: 500,
          message: 'Failed Get Product',
          data: null,
        };
        dispatch(productError(respGetProduct));
        toast.error('error!');

        return respGetProduct;
      }
    } else {
      const respGetProduct: IErrorType = {
        code: 500,
        message: 'Failed Get Product',
        data: null,
      };
      dispatch(productError(respGetProduct));
      toast.error('error!');

      return respGetProduct;
    }
  } catch (e) {
    const respGetProduct: IErrorType = {
      code: 500,
      message: 'Failed Get Product',
      data: null,
    };
    dispatch(productError(respGetProduct));
    toast.error('error!');

    return respGetProduct;
  }
};

export const getProductImage =
  (id: string, productDetail: IProductDetail) => async (dispatch: any) => {
    let body = {
      id_product: id,
    };
    try {
      const response = await apiGet(API_URL.productImg, body);

      if (response.status === 200) {
        let data = response.data.data;
        let newProductDetail = { ...productDetail };
        let imageProduct: IProductImage[] = [
          {
            id: id,
            imageBase64: productDetail.main_img,
          },
        ];
        (data ?? []).map((x: any) => {
          let objImage: IProductImage = {
            id: id.toString() + '-' + x.id,
            imageBase64: x.img,
          };
          imageProduct.push(objImage);
        });

        newProductDetail.productImage = imageProduct;
        const respGetProduct: ICallbackProduct = {
          code: 200,
          message: 'Success Get Image Product',
          data: {
            productDetail: newProductDetail,
          },
        };
        dispatch(
          productSuccess({
            productDetail: newProductDetail,
          })
        );

        return respGetProduct;
      } else {
        const respGetProduct: IErrorType = {
          code: 500,
          message: 'Failed Get Product Image',
          data: null,
        };
        dispatch(productError(respGetProduct));
        toast.error('error!');

        return respGetProduct;
      }
    } catch (e) {
      const respGetProduct: IErrorType = {
        code: 500,
        message: 'Failed Get Product Image',
        data: null,
      };
      dispatch(productError(respGetProduct));
      toast.error('error!');

      return respGetProduct;
    }
  };
