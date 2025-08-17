import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/core/models/product.model';

export const loadProducts = createAction('[Product API] Load products');

export const loadedProducts = createAction(
  '[Product API] Loaded products success',
  props<{ products: Product[] }>()
);

export const addProduct = createAction(
  '[Product API] Post product',
  props<{ product: Product }>()
);

export const addProductSuccess = createAction(
  '[Product API] Post product success',
  props<{ message: string; product: Product }>()
);

export const addProductFailure = createAction(
  '[Product API] Post product failure',
  props<{ error: string }>()
);

export const updateProduct = createAction(
  '[Product API] Update product',
  props<{ productToUpdate: Product }>()
);

export const updateProductSuccess = createAction(
  '[Product API] Update product Success',
  props<{ message: string; product: Product }>()
);
