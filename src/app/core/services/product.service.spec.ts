import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsService } from './product.service';
import { Product } from '../models/product.model';

describe('ProductsService', () => {
  let service: ProductsService;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    });
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProducts', () => {
    it('should return all products', (done) => {
      service.getProducts().subscribe(products => {
        expect(products).toBeDefined();
        expect(products.length).toBeGreaterThan(0);
        expect(products[0].id).toBeDefined();
        expect(products[0].name).toBeDefined();
        done();
      });
    });
  });

  describe('getProductById', () => {
    it('should return product by id', (done) => {
      service.getProductById('1').subscribe(product => {
        expect(product).toBeDefined();
        expect(product?.id).toBe('1');
        expect(product?.name).toBe('Filtro de aceite Mann');
        done();
      });
    });

    it('should return undefined for non-existent id', (done) => {
      service.getProductById('999').subscribe(product => {
        expect(product).toBeUndefined();
        done();
      });
    });
  });

  describe('postProduct', () => {
    it('should add new product', (done) => {
      const newProduct: Omit<Product, 'id'> = {
        name: 'New Product',
        description: 'New Description',
        price: 2000,
        stock: 5,
        categories: ['1'],
        brand: 'New Brand',
        location: 'New Location'
      };

      service.postProduct(newProduct as Product).subscribe(response => {
        expect(response.message).toContain('agregado correctamente');
        expect(response.product.name).toBe('New Product');
        expect(response.product.id).toBeDefined();
        done();
      });
    });
  });

  describe('updateProduct', () => {
    it('should update existing product', (done) => {
      const updatedProduct: Product = {
        ...mockProduct,
        name: 'Updated Product',
        price: 1500
      };

      service.updateProduct(updatedProduct).subscribe(response => {
        expect(response.message).toContain('actualizado correctamente');
        expect(response.product.name).toBe('Updated Product');
        expect(response.product.price).toBe(1500);
        done();
      });
    });

    it('should throw error for non-existent product', () => {
      const nonExistentProduct: Product = {
        ...mockProduct,
        id: '999'
      };

      expect(() => {
        service.updateProduct(nonExistentProduct).subscribe();
      }).toThrowError('Producto no encontrado');
    });
  });

  describe('deleteProductById', () => {
    it('should delete product by id', (done) => {
      service.deleteProductById(1).subscribe(response => {
        expect(response.success).toBe(true);
        expect(response.message).toContain('eliminado correctamente');
        done();
      });
    });

    it('should throw error for non-existent product id', () => {
      expect(() => {
        service.deleteProductById(999).subscribe();
      }).toThrowError('Producto no encontrado');
    });
  });
});
