import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddProductDialogComponent } from './add-product-dialog.component';
import { CategoryService } from '../../../core/services/category.service';
import { Category, Product } from '../../../core/models/product.model';
import { of } from 'rxjs';

describe('AddProductDialogComponent', () => {
  let component: AddProductDialogComponent;
  let fixture: ComponentFixture<AddProductDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<AddProductDialogComponent>>;
  let categoryService: jasmine.SpyObj<CategoryService>;

  const mockCategories: Category[] = [
    { id: '1', name: 'Filtros', parentId: undefined },
    { id: '1-1', name: 'Filtro de Aceite', parentId: '1' },
    { id: '2', name: 'Lubricantes', parentId: undefined }
  ];

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

  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    const categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getAllCategoriesFlat']);

    categoryServiceSpy.getAllCategoriesFlat.and.returnValue(of(mockCategories));

    await TestBed.configureTestingModule({
      declarations: [AddProductDialogComponent],
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: CategoryService, useValue: categoryServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductDialogComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<AddProductDialogComponent>>;
    categoryService = TestBed.inject(CategoryService) as jasmine.SpyObj<CategoryService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with add mode by default', () => {
    expect(component.isEditMode).toBe(false);
    expect(component.dialogTitle).toBe('Agregar Producto');
  });

  it('should load categories on init', () => {
    component.ngOnInit();
    expect(categoryService.getAllCategoriesFlat).toHaveBeenCalled();
    expect(component.availableCategories).toEqual(mockCategories);
  });

  it('should initialize form with empty values in add mode', () => {
    component.ngOnInit();
    expect(component.productForm.get('name')?.value).toBe('');
    expect(component.productForm.get('description')?.value).toBe('');
    expect(component.productForm.get('price')?.value).toBe('');
    expect(component.productForm.get('stock')?.value).toBe('');
    expect(component.productForm.get('brand')?.value).toBe('');
    expect(component.productForm.get('location')?.value).toBe('');
    expect(component.productForm.get('categories')?.value).toEqual([]);
  });

  it('should initialize form with product data in edit mode', async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    const categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getAllCategoriesFlat']);
    categoryServiceSpy.getAllCategoriesFlat.and.returnValue(of(mockCategories));

    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      declarations: [AddProductDialogComponent],
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { product: mockProduct } },
        { provide: CategoryService, useValue: categoryServiceSpy }
      ]
    }).compileComponents();

    const editFixture = TestBed.createComponent(AddProductDialogComponent);
    const editComponent = editFixture.componentInstance;
    const editDialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<AddProductDialogComponent>>;
    const editCategoryService = TestBed.inject(CategoryService) as jasmine.SpyObj<CategoryService>;

    editComponent.ngOnInit();

    expect(editComponent.isEditMode).toBe(true);
    expect(editComponent.dialogTitle).toBe('Editar Producto');
    expect(editComponent.productForm.get('name')?.value).toBe(mockProduct.name);
    expect(editComponent.productForm.get('description')?.value).toBe(mockProduct.description);
    expect(editComponent.productForm.get('price')?.value).toBe(mockProduct.price);
    expect(editComponent.productForm.get('stock')?.value).toBe(mockProduct.stock);
    expect(editComponent.productForm.get('brand')?.value).toBe(mockProduct.brand);
    expect(editComponent.productForm.get('location')?.value).toBe(mockProduct.location);
    expect(editComponent.productForm.get('categories')?.value).toEqual(mockProduct.categories);
  });

  it('should close dialog with form data when valid in add mode', () => {
    component.ngOnInit();
    
    const formData = {
      name: 'New Product',
      description: 'New Description',
      price: 2000,
      stock: 5,
      brand: 'New Brand',
      location: 'New Location',
      categories: ['1']
    };

    component.productForm.patchValue(formData);
    component.onSave();

    expect(dialogRef.close).toHaveBeenCalledWith(formData);
  });

  it('should close dialog with updated product when valid in edit mode', async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    const categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getAllCategoriesFlat']);
    categoryServiceSpy.getAllCategoriesFlat.and.returnValue(of(mockCategories));

    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      declarations: [AddProductDialogComponent],
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { product: mockProduct } },
        { provide: CategoryService, useValue: categoryServiceSpy }
      ]
    }).compileComponents();

    const editFixture = TestBed.createComponent(AddProductDialogComponent);
    const editComponent = editFixture.componentInstance;
    const editDialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<AddProductDialogComponent>>;

    editComponent.ngOnInit();
    
    const updatedData = {
      name: 'Updated Product',
      description: 'Updated Description',
      price: 1500,
      stock: 8,
      brand: 'Updated Brand',
      location: 'Updated Location',
      categories: ['2']
    };

    editComponent.productForm.patchValue(updatedData);
    editComponent.onSave();

    const expectedResult = {
      ...mockProduct,
      ...updatedData
    };

    expect(editDialogRef.close).toHaveBeenCalledWith(expectedResult);
  });

  it('should not close dialog when form is invalid', () => {
    component.ngOnInit();
    component.onSave();

    expect(dialogRef.close).not.toHaveBeenCalled();
  });

  it('should mark all fields as touched when form is invalid', () => {
    component.ngOnInit();
    component.onSave();

    Object.keys(component.productForm.controls).forEach(key => {
      const control = component.productForm.get(key);
      expect(control?.touched).toBe(true);
    });
  });

  it('should close dialog when cancel is called', () => {
    component.onCancel();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should return true for invalid field', () => {
    component.ngOnInit();
    const nameControl = component.productForm.get('name');
    nameControl?.markAsTouched();
    nameControl?.setErrors({ required: true });

    expect(component.isFieldInvalid('name')).toBe(true);
  });

  it('should return false for valid field', () => {
    component.ngOnInit();
    const nameControl = component.productForm.get('name');
    nameControl?.setValue('Valid Name');
    nameControl?.markAsTouched();

    expect(component.isFieldInvalid('name')).toBe(false);
  });

  it('should return correct error message for required field', () => {
    component.ngOnInit();
    const nameControl = component.productForm.get('name');
    nameControl?.setErrors({ required: true });

    expect(component.getErrorMessage('name')).toBe('Este campo es requerido');
  });

  it('should return correct error message for minlength field', () => {
    component.ngOnInit();
    const nameControl = component.productForm.get('name');
    nameControl?.setErrors({ minlength: { requiredLength: 3 } });

    expect(component.getErrorMessage('name')).toBe('Mínimo 3 caracteres');
  });

  it('should return correct error message for min value field', () => {
    component.ngOnInit();
    const priceControl = component.productForm.get('price');
    priceControl?.setErrors({ min: true });

    expect(component.getErrorMessage('price')).toBe('El valor debe ser mayor a 0');
  });

  it('should return correct error message for categories minLength', () => {
    component.ngOnInit();
    const categoriesControl = component.productForm.get('categories');
    categoriesControl?.setErrors({ minLength: true });

    expect(component.getErrorMessage('categories')).toBe('Selecciona al menos una categoría');
  });

  it('should return empty string for field without errors', () => {
    component.ngOnInit();
    const nameControl = component.productForm.get('name');
    nameControl?.setValue('Valid Name');

    expect(component.getErrorMessage('name')).toBe('');
  });
});
