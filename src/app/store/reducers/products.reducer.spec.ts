import { productsReducer } from './products.reducer';
import { initialProductsState } from '../models/products.state';
import * as ProductActions from '../actions/products.actions';
import { Product, ProductMovement } from 'src/app/core/models/product.model';

describe('ProductsReducer', () => {
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

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = { type: 'Unknown' };
      const result = productsReducer(initialProductsState, action);
      expect(result).toBe(initialProductsState);
    });
  });

  describe('loadProducts', () => {
    it('should set loading to true', () => {
      const action = ProductActions.loadProducts();
      const result = productsReducer(initialProductsState, action);
      expect(result.loading).toBe(true);
    });
  });

  describe('loadedProducts', () => {
    it('should set products and loading to false', () => {
      const action = ProductActions.loadedProducts({ products: [mockProduct] });
      const result = productsReducer(initialProductsState, action);
      expect(result.loading).toBe(false);
      expect(result.ids).toContain('1');
    });
  });

  describe('loadProductsFailure', () => {
    it('should set error message and loading to false', () => {
      const action = ProductActions.loadProductsFailure({ error: 'Error message' });
      const result = productsReducer(initialProductsState, action);
      expect(result.loading).toBe(false);
      expect(result.messageError).toBe('Error message');
    });
  });

  describe('addProduct', () => {
    it('should set loading to true and clear messages', () => {
      const action = ProductActions.addProduct({ product: mockProduct });
      const result = productsReducer(initialProductsState, action);
      expect(result.loading).toBe(true);
      expect(result.messageSuccess).toBeNull();
      expect(result.messageError).toBeNull();
    });
  });

  describe('addProductSuccess', () => {
    it('should add product and set success message', () => {
      const action = ProductActions.addProductSuccess({ 
        message: 'Product added', 
        product: mockProduct 
      });
      const result = productsReducer(initialProductsState, action);
      expect(result.loading).toBe(false);
      expect(result.messageSuccess).toBe('Product added');
      expect(result.messageError).toBeNull();
      expect(result.ids).toContain('1');
    });
  });

  describe('updateProduct', () => {
    it('should set loading to true and clear messages', () => {
      const action = ProductActions.updateProduct({ productToUpdate: mockProduct });
      const result = productsReducer(initialProductsState, action);
      expect(result.loading).toBe(true);
      expect(result.messageSuccess).toBeNull();
      expect(result.messageError).toBeNull();
    });
  });

  describe('updateProductSuccess', () => {
    it('should update product and set success message', () => {
      const stateWithProduct = productsReducer(
        initialProductsState, 
        ProductActions.loadedProducts({ products: [mockProduct] })
      );
      
      const updatedProduct = { ...mockProduct, name: 'Updated Product' };
      const action = ProductActions.updateProductSuccess({ 
        message: 'Product updated', 
        product: updatedProduct 
      });
      
      const result = productsReducer(stateWithProduct, action);
      expect(result.loading).toBe(false);
      expect(result.messageSuccess).toBe('Product updated');
      expect(result.messageError).toBeNull();
    });
  });

  describe('deleteProduct', () => {
    it('should set loading to true and clear messages', () => {
      const action = ProductActions.deleteProduct({ id: 1 });
      const result = productsReducer(initialProductsState, action);
      expect(result.loading).toBe(true);
      expect(result.messageSuccess).toBeNull();
      expect(result.messageError).toBeNull();
    });
  });

  describe('deleteProductSuccess', () => {
    it('should remove product and set success message', () => {
      const stateWithProduct = productsReducer(
        initialProductsState, 
        ProductActions.loadedProducts({ products: [mockProduct] })
      );
      
      const action = ProductActions.deleteProductSuccess({ 
        message: 'Product deleted', 
        success: true, 
        id: 1 
      });
      
      const result = productsReducer(stateWithProduct, action);
      expect(result.loading).toBe(false);
      expect(result.messageSuccess).toBe('Product deleted');
      expect(result.messageError).toBeNull();
      expect(result.ids).not.toContain('1');
    });
  });

  describe('loadProductById', () => {
    it('should set loading to true', () => {
      const action = ProductActions.loadProductById({ id: '1' });
      const result = productsReducer(initialProductsState, action);
      expect(result.loading).toBe(true);
    });
  });

  describe('loadedProductById', () => {
    it('should add product and set loading to false', () => {
      const action = ProductActions.loadedProductById({ product: mockProduct });
      const result = productsReducer(initialProductsState, action);
      expect(result.loading).toBe(false);
      expect(result.ids).toContain('1');
    });
  });

  describe('loadProductByIdFailure', () => {
    it('should set error message and loading to false', () => {
      const action = ProductActions.loadProductByIdFailure({ error: 'Error message' });
      const result = productsReducer(initialProductsState, action);
      expect(result.loading).toBe(false);
      expect(result.messageError).toBe('Error message');
    });
  });

  describe('loadMovementsByProductId', () => {
    it('should set movementsLoading to true and clear movementsError', () => {
      const action = ProductActions.loadMovementsByProductId({ productId: '1' });
      const result = productsReducer(initialProductsState, action);
      expect(result.movementsLoading).toBe(true);
      expect(result.movementsError).toBeNull();
    });
  });

  describe('loadedMovementsByProductId', () => {
    it('should set movements and movementsLoading to false', () => {
      const action = ProductActions.loadedMovementsByProductId({ 
        movements: mockMovements, 
        productId: '1' 
      });
      const result = productsReducer(initialProductsState, action);
      expect(result.movementsLoading).toBe(false);
      expect(result.movementsError).toBeNull();
      expect(result.movements).toEqual(mockMovements);
    });
  });

  describe('loadMovementsByProductIdFailure', () => {
    it('should set movementsError and movementsLoading to false', () => {
      const action = ProductActions.loadMovementsByProductIdFailure({ error: 'Error message' });
      const result = productsReducer(initialProductsState, action);
      expect(result.movementsLoading).toBe(false);
      expect(result.movementsError).toBe('Error message');
    });
  });
});
