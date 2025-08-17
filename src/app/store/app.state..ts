import { ActionReducerMap } from '@ngrx/store';
import { productsReducer } from './reducers/products.reducer';
import { ProductsState } from './models/products.state';

export interface AppState {
  products: ProductsState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  products: productsReducer,
};
