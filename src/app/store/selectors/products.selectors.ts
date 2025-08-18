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

export const selectProductById = (id: string) =>
  createSelector(selectAll, (products) =>
    products.find((product) => product.id === id)
  );

export const selectMovements = createSelector(
  selectProductsFeature,
  (state) => state.movements
);

export const selectMovementsLoading = createSelector(
  selectProductsFeature,
  (state) => state.movementsLoading
);

export const selectMovementsError = createSelector(
  selectProductsFeature,
  (state) => state.movementsError
);
