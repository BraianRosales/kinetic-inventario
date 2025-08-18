import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { KineticTableComponent } from './kinetic-table.component';
import { CategoryService } from '../../../core/services/category.service';
import { Product } from '../../../core/models/product.model';

describe('KineticTableComponent', () => {
  let component: KineticTableComponent;
  let fixture: ComponentFixture<KineticTableComponent>;
  let categoryService: jasmine.SpyObj<CategoryService>;

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Test Product 1',
      description: 'Test Description 1',
      price: 1000,
      stock: 10,
      categories: ['1'],
      brand: 'Test Brand 1',
      location: 'Test Location 1'
    },
    {
      id: '2',
      name: 'Test Product 2',
      description: 'Test Description 2',
      price: 2000,
      stock: 3,
      categories: ['2'],
      brand: 'Test Brand 2',
      location: 'Test Location 2'
    },
    {
      id: '3',
      name: 'Test Product 3',
      description: 'Test Description 3',
      price: 3000,
      stock: 0,
      categories: ['1', '2'],
      brand: 'Test Brand 3',
      location: 'Test Location 3'
    }
  ];

  beforeEach(async () => {
    const categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategoryNameById']);
    categoryServiceSpy.getCategoryNameById.and.callFake((id: string) => {
      const categories: { [key: string]: string } = {
        '1': 'Filtros',
        '2': 'Lubricantes'
      };
      return categories[id] || 'Sin categoría';
    });

    await TestBed.configureTestingModule({
      declarations: [KineticTableComponent],
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatButtonModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: CategoryService, useValue: categoryServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(KineticTableComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService) as jasmine.SpyObj<CategoryService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default title', () => {
    expect(component.title).toBe('Lista de Productos');
  });

  it('should have showActions enabled by default', () => {
    expect(component.showActions).toBe(true);
  });

  it('should update dataSource when products input changes', () => {
    component.products = mockProducts;
    component.ngOnChanges();
    
    expect(component.dataSource.data).toEqual(mockProducts);
  });

  it('should include actions column when showActions is true', () => {
    component.showActions = true;
    component.ngOnChanges();
    
    expect(component.displayedColumns).toContain('actions');
  });

  it('should not include actions column when showActions is false', () => {
    component.showActions = false;
    component.ngOnChanges();
    
    expect(component.displayedColumns).not.toContain('actions');
  });

  it('should format price correctly', () => {
    const formattedPrice = component.formatPrice(1000);
    expect(formattedPrice).toContain('$');
    expect(formattedPrice).toContain('1.000');
  });

  it('should return correct stock status for empty stock', () => {
    const status = component.getStockStatus(0);
    expect(status.text).toBe('Sin stock');
    expect(status.class).toBe('stock-empty');
  });

  it('should return correct stock status for low stock', () => {
    const status = component.getStockStatus(3);
    expect(status.text).toBe('Stock bajo');
    expect(status.class).toBe('stock-low');
  });

  it('should return correct stock status for available stock', () => {
    const status = component.getStockStatus(10);
    expect(status.text).toBe('Disponible');
    expect(status.class).toBe('stock-ok');
  });

  it('should get category names correctly', () => {
    const categoryNames = component.getCategoryNames(['1', '2']);
    expect(categoryNames).toBe('Filtros, Lubricantes');
  });

  it('should emit viewProduct event', () => {
    spyOn(component.viewProduct, 'emit');
    const product = mockProducts[0];
    
    component.onViewProduct(product);
    
    expect(component.viewProduct.emit).toHaveBeenCalledWith(product);
  });

  it('should emit editProduct event', () => {
    spyOn(component.editProduct, 'emit');
    const product = mockProducts[0];
    
    component.onEditProduct(product);
    
    expect(component.editProduct.emit).toHaveBeenCalledWith(product);
  });

  it('should emit deleteProduct event', () => {
    spyOn(component.deleteProduct, 'emit');
    const product = mockProducts[0];
    
    component.onDeleteProduct(product);
    
    expect(component.deleteProduct.emit).toHaveBeenCalledWith(product);
  });

  it('should handle empty products array', () => {
    component.products = [];
    component.ngOnChanges();
    
    expect(component.dataSource.data).toEqual([]);
  });

  it('should handle undefined products', () => {
    component.products = undefined as any;
    component.ngOnChanges();
    
    expect(component.dataSource.data).toEqual([]);
  });

  it('should call categoryService.getCategoryNameById for each category id', () => {
    component.getCategoryNames(['1', '2']);
    
    expect(categoryService.getCategoryNameById).toHaveBeenCalledWith('1');
    expect(categoryService.getCategoryNameById).toHaveBeenCalledWith('2');
  });
});
