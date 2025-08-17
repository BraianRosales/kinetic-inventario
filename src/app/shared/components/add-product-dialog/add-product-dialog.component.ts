import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../../core/services/category.service';
import { Category, Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss'],
})
export class AddProductDialogComponent implements OnInit {
  productForm: FormGroup;
  isEditMode = false;
  dialogTitle = 'Agregar Producto';

  // Categorías disponibles
  availableCategories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddProductDialogComponent>,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: { product?: Product }
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      brand: ['', Validators.required],
      location: ['', Validators.required],
      categories: [[], [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.initializeForm();
  }

  private initializeForm(): void {
    if (this.data?.product) {
      this.isEditMode = true;
      this.dialogTitle = 'Editar Producto';

      // Prellenar el formulario con los datos del producto
      this.productForm.patchValue({
        name: this.data.product.name,
        description: this.data.product.description,
        price: this.data.product.price,
        stock: this.data.product.stock,
        brand: this.data.product.brand,
        location: this.data.product.location,
        categories: this.data.product.categories,
      });
    }
  }

  private loadCategories(): void {
    this.categoryService.getAllCategoriesFlat().subscribe((categories) => {
      this.availableCategories = categories;
    });
  }

  onSave(): void {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;

      if (this.isEditMode && this.data?.product) {
        const updatedProduct = {
          ...this.data.product,
          ...formValue,
        };
        this.dialogRef.close(updatedProduct);
      } else {
        this.dialogRef.close(formValue);
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private markFormGroupTouched(): void {
    Object.keys(this.productForm.controls).forEach((key) => {
      const control = this.productForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.productForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.productForm.get(fieldName);

    if (field?.hasError('required')) {
      return 'Este campo es requerido';
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.getError('minlength').requiredLength;
      return `Mínimo ${requiredLength} caracteres`;
    }

    if (field?.hasError('min')) {
      return 'El valor debe ser mayor a 0';
    }

    if (field?.hasError('minLength') && fieldName === 'categories') {
      return 'Selecciona al menos una categoría';
    }

    return '';
  }
}
