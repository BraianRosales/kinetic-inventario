import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Product, ProductMovement } from 'src/app/core/models/product.model';

export interface ProductsState extends EntityState<Product> {
  loading: boolean;
  messageSuccess: string | null;
  messageError: string | null;
  movements: ProductMovement[];
  movementsLoading: boolean;
  movementsError: string | null;
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
    movements: [],
    movementsLoading: false,
    movementsError: null,
  });
