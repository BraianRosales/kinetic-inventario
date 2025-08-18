import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import * as ProductSelectors from './products.selectors';
import { Product, ProductMovement } from 'src/app/core/models/product.model';
import * as ProductActions from '../actions/products.actions';
import { AppState, ROOT_REDUCERS } from '../app.state.';

describe('ProductsSelectors', () => {
  let store: Store<AppState>;

  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    price: 1000,
    stock: 10,
    categories: ['1'],
    brand: 'Test Brand',
    location: 'Test Location',
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
      date: new Date(),
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(ROOT_REDUCERS)],
    });
    store = TestBed.inject(Store);
  });

  describe('selectLoadingProducts', () => {
    it('should return loading state', (done) => {
      store
        .select(ProductSelectors.selectLoadingProducts)
        .subscribe((loading) => {
          expect(loading).toBe(false);
          done();
        });
    });

    it('should return true when loading', (done) => {
      store.dispatch(ProductActions.loadProducts());

      store
        .select(ProductSelectors.selectLoadingProducts)
        .subscribe((loading) => {
          expect(loading).toBe(true);
          done();
        });
    });
  });

  describe('selectProducts', () => {
    it('should return empty array initially', (done) => {
      store.select(ProductSelectors.selectProducts).subscribe((products) => {
        expect(products).toEqual([]);
        done();
      });
    });

    it('should return products when loaded', (done) => {
      store.dispatch(
        ProductActions.loadedProducts({ products: [mockProduct] })
      );

      store.select(ProductSelectors.selectProducts).subscribe((products) => {
        expect(products).toEqual([mockProduct]);
        done();
      });
    });
  });

  describe('selectProductById', () => {
    it('should return undefined for non-existent product', (done) => {
      store
        .select(ProductSelectors.selectProductById('999'))
        .subscribe((product) => {
          expect(product).toBeUndefined();
          done();
        });
    });

    it('should return product by id', (done) => {
      store.dispatch(
        ProductActions.loadedProducts({ products: [mockProduct] })
      );

      store
        .select(ProductSelectors.selectProductById('1'))
        .subscribe((product) => {
          expect(product).toEqual(mockProduct);
          done();
        });
    });
  });

  describe('selectMovements', () => {
    it('should return empty array initially', (done) => {
      store.select(ProductSelectors.selectMovements).subscribe((movements) => {
        expect(movements).toEqual([]);
        done();
      });
    });

    it('should return movements when loaded', (done) => {
      store.dispatch(
        ProductActions.loadedMovementsByProductId({
          movements: mockMovements,
          productId: '1',
        })
      );

      store.select(ProductSelectors.selectMovements).subscribe((movements) => {
        expect(movements).toEqual(mockMovements);
        done();
      });
    });
  });

  describe('selectMovementsLoading', () => {
    it('should return false initially', (done) => {
      store
        .select(ProductSelectors.selectMovementsLoading)
        .subscribe((loading) => {
          expect(loading).toBe(false);
          done();
        });
    });

    it('should return true when loading movements', (done) => {
      store.dispatch(
        ProductActions.loadMovementsByProductId({ productId: '1' })
      );

      store
        .select(ProductSelectors.selectMovementsLoading)
        .subscribe((loading) => {
          expect(loading).toBe(true);
          done();
        });
    });
  });

  describe('selectMovementsError', () => {
    it('should return null initially', (done) => {
      store.select(ProductSelectors.selectMovementsError).subscribe((error) => {
        expect(error).toBeNull();
        done();
      });
    });

    it('should return error when movements loading fails', (done) => {
      store.dispatch(
        ProductActions.loadMovementsByProductIdFailure({
          error: 'Error message',
        })
      );

      store.select(ProductSelectors.selectMovementsError).subscribe((error) => {
        expect(error).toBe('Error message');
        done();
      });
    });
  });
});
