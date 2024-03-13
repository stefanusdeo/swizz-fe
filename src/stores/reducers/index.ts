import { combineReducers } from 'redux';
import generalReducer from './generalReducer';
import subCategoryReducer from './subCategoryReducer';
import productReducer from './productReducer';
import orderReducer from './orderReducer';

export default combineReducers({
  general: generalReducer,
  subCategory: subCategoryReducer,
  product: productReducer,
  order: orderReducer
});
