import { IGeneral } from "./generalTypes";
import { ISubCategory } from "./subCategoryTypes";
import { IProduct } from "./productTypes";
import { IOrder } from "./orderTypes";

export interface RootState {
  general: IGeneral;
  subCategory: ISubCategory;
  product: IProduct;
  order:IOrder;
}
