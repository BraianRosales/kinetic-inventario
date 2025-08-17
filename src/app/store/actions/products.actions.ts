import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/core/models/product.model';

export const loadProducts = createAction('[Product API] Load products');

export const loadedProducts = createAction(
  '[Product API] Loaded products success',
  props<{ products: Product[] }>()
);
