import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/core/services/product.service';
import * as ProductActions from '../actions/products.actions';
import { Product } from 'src/app/core/models/product.model';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap(() =>
        this.productsService
          .getProducts()
          .pipe(
            map((products: Product[]) =>
              ProductActions.loadedProducts({ products })
            )
          )
      )
    )
  );
}
