import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Product } from 'src/app/core/models/product.model';

export interface ProductsState extends EntityState<Product> {
  loading: boolean;
  messageSuccess: string | null;
  messageError: string | null;
}

export const productsAdapter: EntityAdapter<Product> =
  createEntityAdapter<Product>({
    selectId: (product: Product) =>
      product.id !== undefined ? product.id.toString() : '',
  });

export const initialProductsState: ProductsState =
  productsAdapter.getInitialState({
    loading: false,
    messageSuccess: null,
    messageError: null,
  });
