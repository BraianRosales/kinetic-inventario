import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { of } from 'rxjs';

import { ProductsEffects } from './products.effects';
import { ProductsService } from 'src/app/core/services/product.service';
import { MovementService } from 'src/app/core/services/movement.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import * as ProductActions from '../actions/products.actions';
import { Product, ProductMovement } from 'src/app/core/models/product.model';

describe('ProductsEffects', () => {
  let actions$: Actions;
  let effects: ProductsEffects;
  let productsService: jasmine.SpyObj<ProductsService>;
  let movementService: jasmine.SpyObj<MovementService>;
  let notificationService: jasmine.SpyObj<NotificationService>;

  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    price: 1000,
    stock: 10,
    categories: ['1'],
    brand: 'Test Brand',
    location: 'Test Location'
  };

  const mockMovements: ProductMovement[] = [
    {
      id: '1',
      productId: '1',
      type: 'IN',
      quantity: 10,
      previousStock: 0,
      newStock: 10,
      reason: 'Stock inicial',
      date: new Date()
    }
  ];

  beforeEach(() => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', [
      'getProducts',
      'getProductById',
      'postProduct',
      'updateProduct',
      'deleteProductById'
    ]);
    const movementServiceSpy = jasmine.createSpyObj('MovementService', [
      'getMovementsByProductId'
    ]);
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', [
      'success'
    ]);

    TestBed.configureTestingModule({
      providers: [
        ProductsEffects,
        provideMockActions(() => actions$),
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: MovementService, useValue: movementServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy }
      ]
    });

    effects = TestBed.inject(ProductsEffects);
    actions$ = TestBed.inject(Actions);
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    movementService = TestBed.inject(MovementService) as jasmine.SpyObj<MovementService>;
    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadProducts$', () => {
    it('should return loadedProducts action on success', (done) => {
      const products = [mockProduct];
      const action = ProductActions.loadProducts();
      const completion = ProductActions.loadedProducts({ products });

      actions$ = of(action);
      productsService.getProducts.and.returnValue(of(products));

      effects.loadProducts$.subscribe(result => {
        expect(result).toEqual(completion);
        done();
      });
    });
  });

  describe('loadProductById$', () => {
    it('should return loadedProductById action on success', (done) => {
      const action = ProductActions.loadProductById({ id: '1' });
      const completion = ProductActions.loadedProductById({ product: mockProduct });

      actions$ = of(action);
      productsService.getProductById.and.returnValue(of(mockProduct));

      effects.loadProductById$.subscribe(result => {
        expect(result).toEqual(completion);
        done();
      });
    });
  });

  describe('addProduct$', () => {
    it('should return addProductSuccess action on success', (done) => {
      const response = { message: 'Product added', product: mockProduct };
      const action = ProductActions.addProduct({ product: mockProduct });
      const completion = ProductActions.addProductSuccess(response);

      actions$ = of(action);
      productsService.postProduct.and.returnValue(of(response));

      effects.addProduct$.subscribe(result => {
        expect(result).toEqual(completion);
        done();
      });
    });
  });

  describe('updateProduct$', () => {
    it('should return updateProductSuccess action on success', (done) => {
      const response = { message: 'Product updated', product: mockProduct };
      const action = ProductActions.updateProduct({ productToUpdate: mockProduct });
      const completion = ProductActions.updateProductSuccess(response);

      actions$ = of(action);
      productsService.updateProduct.and.returnValue(of(response));

      effects.updateProduct$.subscribe(result => {
        expect(result).toEqual(completion);
        done();
      });
    });
  });

  describe('deleteProduct$', () => {
    it('should return deleteProductSuccess action on success', (done) => {
      const response = { message: 'Product deleted', success: true };
      const action = ProductActions.deleteProduct({ id: 1 });
      const completion = ProductActions.deleteProductSuccess({ 
        message: response.message, 
        success: response.success, 
        id: 1 
      });

      actions$ = of(action);
      productsService.deleteProductById.and.returnValue(of(response));

      effects.deleteProduct$.subscribe(result => {
        expect(result).toEqual(completion);
        done();
      });
    });
  });

  describe('loadMovementsByProductId$', () => {
    it('should return loadedMovementsByProductId action on success', (done) => {
      const action = ProductActions.loadMovementsByProductId({ productId: '1' });
      const completion = ProductActions.loadedMovementsByProductId({ 
        movements: mockMovements, 
        productId: '1' 
      });

      actions$ = of(action);
      movementService.getMovementsByProductId.and.returnValue(of(mockMovements));

      effects.loadMovementsByProductId$.subscribe(result => {
        expect(result).toEqual(completion);
        done();
      });
    });
  });

  describe('showAddProductSuccess$', () => {
    it('should call notification service on addProductSuccess', () => {
      const action = ProductActions.addProductSuccess({ 
        message: 'Product added', 
        product: mockProduct 
      });

      actions$ = of(action);

      effects.showAddProductSuccess$.subscribe();
      
      expect(notificationService.success).toHaveBeenCalledWith('¡Producto agregado!', 'Product added');
    });
  });

  describe('showUpdateProductSuccess$', () => {
    it('should call notification service on updateProductSuccess', () => {
      const action = ProductActions.updateProductSuccess({ 
        message: 'Product updated', 
        product: mockProduct 
      });

      actions$ = of(action);

      effects.showUpdateProductSuccess$.subscribe();
      
      expect(notificationService.success).toHaveBeenCalledWith('¡Producto actualizado!', 'Product updated');
    });
  });

  describe('showDeleteProductSuccess$', () => {
    it('should call notification service on deleteProductSuccess', () => {
      const action = ProductActions.deleteProductSuccess({ 
        message: 'Product deleted', 
        success: true, 
        id: 1 
      });

      actions$ = of(action);

      effects.showDeleteProductSuccess$.subscribe();
      
      expect(notificationService.success).toHaveBeenCalledWith('¡Producto eliminado!', 'Product deleted');
    });
  });
});
