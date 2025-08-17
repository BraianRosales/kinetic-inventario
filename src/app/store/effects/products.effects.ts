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

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      switchMap(({ productToUpdate }) =>
        this.productsService.updateProduct(productToUpdate).pipe(
          map((res) =>
            ProductActions.updateProductSuccess({
              message: res.message,
              product: res.product,
            })
          ),
          catchError((res) =>
            of(ProductActions.addProductFailure({ error: res.error.message }))
          )
        )
      )
    );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      switchMap(({ id }) =>
        this.productsService.deleteProductById(id).pipe(
          map((res: any) =>
            ProductActions.deleteProductSuccess({
              message: res.message,
              success: res.success,
              id: id,
            })
          ),
          catchError((res) =>
            of(
              ProductActions.deleteProductFailure({ error: res.error.message })
            )
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

  showUpdateProductSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.updateProductSuccess),
        tap(({ message }) => {
          this.notificationService.success('¡Producto actualizado!', message);
        })
      ),
    { dispatch: false }
  );

  showDeleteProductSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.deleteProductSuccess),
        tap(({ message }) => {
          this.notificationService.success('¡Producto eliminado!', message);
        })
      ),
    { dispatch: false }
  );
}
