import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ProductsService } from 'src/app/core/services/product.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import * as ProductActions from '../actions/products.actions';
import { Product } from 'src/app/core/models/product.model';
import { of } from 'rxjs';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private notificationService: NotificationService
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

  addProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.addProduct),
      switchMap(({ product }) =>
        this.productsService.postProduct(product).pipe(
          map((res) =>
            ProductActions.addProductSuccess({
              message: res.message,
              product: res.product,
            })
          ),
          catchError((error) =>
            of(ProductActions.addProductFailure({ error: error.message }))
          )
        )
      )
    );
  });

  // Alerts Effects
  showAddProductSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.addProductSuccess),
        tap(({ message }) => {
          this.notificationService.success('¡Producto agregado!', message);
        })
      ),
    { dispatch: false }
  );
}
