import { combineReducers } from 'redux';
import ProductReducer from './ProductReducer';

const reducers = {
    productStore: ProductReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
