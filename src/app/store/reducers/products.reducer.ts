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
  ),

  on(ProductActions.addProduct, (state) => ({
    ...state,
    loading: true,
    messageSuccess: null,
    messageError: null,
  })),

  on(ProductActions.addProductSuccess, (state, { message, product }) =>
    productsAdapter.addOne(product, {
      ...state,
      loading: false,
      messageSuccess: message,
      messageError: null,
    })
  ),

  on(ProductActions.updateProduct, (state) => ({
    ...state,
    loading: true,
    messageSuccess: null,
    messageError: null,
  })),

  on(ProductActions.updateProductSuccess, (state, { message, product }) =>
    productsAdapter.updateOne(
      { id: Number(product.id), changes: product },
      {
        ...state,
        loading: false,
        messageSuccess: message,
        messageError: null,
      }
    )
  ),

  on(ProductActions.deleteProduct, (state) => ({
    ...state,
    loading: true,
    messageSuccess: null,
    messageError: null,
  })),

  on(ProductActions.deleteProductSuccess, (state, { message, id }) =>
    productsAdapter.removeOne(id, {
      ...state,
      loading: false,
      messageSuccess: message,
      messageError: null,
    })
  ),
);
