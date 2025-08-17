import { createReducer, on } from '@ngrx/store';
import {
  initialProductsState,
  productsAdapter,
} from '../models/products.state';
import * as ProductActions from '../actions/products.actions';

export const productsReducer = createReducer(
  initialProductsState,

  on(ProductActions.loadProducts, (state) => ({
    ...state,
    loading: true,
  })),

  on(ProductActions.loadedProducts, (state, { products }) =>
    productsAdapter.setAll(products, {
      ...state,
      loading: false,
    })
  )
);
