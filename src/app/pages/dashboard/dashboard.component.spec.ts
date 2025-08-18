import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { CategoryService } from '../../core/services/category.service';
import { Product } from '../../core/models/product.model';
import { AddProductDialogComponent } from '../../shared/components/add-product-dialog/add-product-dialog.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import * as ProductActions from '../../store/actions/products.actions';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: jasmine.SpyObj<Store>;
  let router: jasmine.SpyObj<Router>;
  let dialog: jasmine.SpyObj<MatDialog>;
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
    }
  ];

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategories']);

    storeSpy.select.and.returnValue(of(mockProducts));

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [MatIconModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: CategoryService, useValue: categoryServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    categoryService = TestBed.inject(CategoryService) as jasmine.SpyObj<CategoryService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadProducts on init', () => {
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(ProductActions.loadProducts());
  });

  it('should calculate stats correctly', () => {
    component.ngOnInit();
    
    expect(component.totalProducts).toBe(2);
    expect(component.lowStockProducts).toBe(1); // Product 2 has stock < 5
    expect(component.totalValue).toBe(1000 * 10 + 2000 * 3); // 16000
  });

  it('should format price correctly', () => {
    const formattedPrice = component.formatPrice(1000);
    expect(formattedPrice).toContain('$');
    expect(formattedPrice).toContain('1.000');
  });

  it('should filter products by category', () => {
    component.ngOnInit();
    component.onCategorySelected('1');
    
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].id).toBe('1');
    expect(component.totalProducts).toBe(1);
  });

  it('should show all products when category is "all"', () => {
    component.ngOnInit();
    component.onCategorySelected('all');
    
    expect(component.filteredProducts.length).toBe(2);
    expect(component.totalProducts).toBe(2);
  });

  it('should open add product dialog', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(null));
    dialog.open.and.returnValue(dialogRefSpy);

    component.openAddProductDialog();

    expect(dialog.open).toHaveBeenCalledWith(AddProductDialogComponent, {
      width: '600px',
      maxWidth: '90vw',
      disableClose: false,
      autoFocus: false,
    });
  });

  it('should dispatch addProduct when dialog returns product', () => {
    const newProduct: Product = {
      id: '3',
      name: 'New Product',
      description: 'New Description',
      price: 3000,
      stock: 5,
      categories: ['1'],
      brand: 'New Brand',
      location: 'New Location'
    };

    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(newProduct));
    dialog.open.and.returnValue(dialogRefSpy);

    component.openAddProductDialog();

    expect(store.dispatch).toHaveBeenCalledWith(ProductActions.addProduct({ product: newProduct }));
  });

  it('should navigate to product detail', () => {
    const product = mockProducts[0];
    component.onViewProduct(product);
    
    expect(router.navigate).toHaveBeenCalledWith(['/product', product.id]);
  });

  it('should open edit product dialog', () => {
    const product = mockProducts[0];
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(null));
    dialog.open.and.returnValue(dialogRefSpy);

    component.onEditProduct(product);

    expect(dialog.open).toHaveBeenCalledWith(AddProductDialogComponent, {
      width: '600px',
      maxWidth: '90vw',
      disableClose: false,
      autoFocus: false,
      data: { product }
    });
  });

  it('should dispatch updateProduct when edit dialog returns product', () => {
    const product = mockProducts[0];
    const updatedProduct = { ...product, name: 'Updated Product' };
    
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(updatedProduct));
    dialog.open.and.returnValue(dialogRefSpy);

    component.onEditProduct(product);

    expect(store.dispatch).toHaveBeenCalledWith(ProductActions.updateProduct({ productToUpdate: updatedProduct }));
  });

  it('should open delete confirmation dialog', () => {
    const product = mockProducts[0];
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(false));
    dialog.open.and.returnValue(dialogRefSpy);

    component.onDeleteProduct(product);

    expect(dialog.open).toHaveBeenCalledWith(ConfirmDialogComponent, {
      width: '400px',
      maxWidth: '90vw',
      disableClose: false,
      autoFocus: false,
      data: {
        title: 'Eliminar Producto',
        message: `¿Estás seguro de que queres eliminar "${product.name}"?`,
        confirmText: 'Eliminar',
        cancelText: 'Cancelar',
        type: 'danger'
      }
    });
  });

  it('should dispatch deleteProduct when confirmation dialog returns true', () => {
    const product = mockProducts[0];
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(true));
    dialog.open.and.returnValue(dialogRefSpy);

    component.onDeleteProduct(product);

    expect(store.dispatch).toHaveBeenCalledWith(ProductActions.deleteProduct({ id: parseInt(product.id) }));
  });
});
