import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state.';
import { productsAdapter, ProductsState } from '../models/products.state';

export const selectProductsFeature = (state: AppState) => state.products;

const { selectAll } = productsAdapter.getSelectors(selectProductsFeature);

export const selectLoadingProducts = createSelector(
  selectProductsFeature,
  (state: ProductsState) => state.loading
);

export const selectProducts = createSelector(selectAll, (products) => products);
