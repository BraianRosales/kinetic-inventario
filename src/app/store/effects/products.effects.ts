import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ProductsService } from 'src/app/core/services/product.service';
import { MovementService } from 'src/app/core/services/movement.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import * as ProductActions from '../actions/products.actions';
import { Product, ProductMovement } from 'src/app/core/models/product.model';
import { of } from 'rxjs';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private movementService: MovementService,
    private notificationService: NotificationService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap(() =>
        this.productsService.getProducts().pipe(
          map((products: Product[]) =>
            ProductActions.loadedProducts({ products })
          ),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadProductById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProductById),
      switchMap(({ id }) =>
        this.productsService.getProductById(id).pipe(
          map((product) => {
            if (product) {
              return ProductActions.loadedProductById({ product });
            } else {
              throw new Error('Producto no encontrado');
            }
          }),
          catchError((error) =>
            of(ProductActions.loadProductByIdFailure({ error: error.message }))
          )
        )
      )
    );
  });

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

  loadMovementsByProductId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadMovementsByProductId),
      switchMap(({ productId }) =>
        this.movementService.getMovementsByProductId(productId).pipe(
          map((movements: ProductMovement[]) =>
            ProductActions.loadedMovementsByProductId({ movements, productId })
          ),
          catchError((error) =>
            of(
              ProductActions.loadMovementsByProductIdFailure({
                error: error.message,
              })
            )
          )
        )
      )
    );
  });
}
