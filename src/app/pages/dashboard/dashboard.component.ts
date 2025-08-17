import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AppState } from '../../store/app.state.';
import { selectProducts } from '../../store/selectors/products.selectors';
import { loadProducts, addProduct, updateProduct } from '../../store/actions/products.actions';
import { Product } from '../../core/models/product.model';
import { AddProductDialogComponent } from '../../shared/components/add-product-dialog/add-product-dialog.component';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  products$ = this.store.select(selectProducts);

  // Estadísticas del inventario
  totalProducts = 0;
  lowStockProducts = 0;
  totalValue = 0;

  // Filtrado por categorías
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategoryId: string | null = null;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private dialog: MatDialog,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadProducts());

    // Suscribirse a los productos para calcular estadísticas
    this.products$.subscribe((products) => {
      this.allProducts = products || [];
      this.filteredProducts = [...this.allProducts];
      this.calculateStats(this.filteredProducts);
    });
  }

  // Método para calcular estadísticas
  private calculateStats(products: Product[]): void {
    this.totalProducts = products.length;
    this.lowStockProducts = products.filter((p) => p.stock < 5).length;
    this.totalValue = products.reduce(
      (sum, product) => sum + product.price * product.stock,
      0
    );
  }

  // Método para formatear el precio
  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(price);
  }

  // Método para manejar la selección de categoría
  onCategorySelected(categoryId: string): void {
    this.selectedCategoryId = categoryId === 'all' ? null : categoryId;
    this.filterProductsByCategory();
  }

  // Método para filtrar productos por categoría
  private filterProductsByCategory(): void {
    if (!this.selectedCategoryId) {
      this.filteredProducts = [...this.allProducts];
    } else {
      this.filteredProducts = this.allProducts.filter((product) =>
        product.categories.includes(this.selectedCategoryId!)
      );
    }
    this.calculateStats(this.filteredProducts);
  }

  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '600px',
      maxWidth: '90vw',
      disableClose: false,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((product: Product) => {
      if (product) {
        this.store.dispatch(addProduct({ product }));
      }
    });
  }

  // Métodos para manejar eventos de la tabla
  onViewProduct(product: Product): void {
    this.router.navigate(['/product', product.id]);
  }

  onEditProduct(product: Product): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '600px',
      maxWidth: '90vw',
      disableClose: false,
      autoFocus: false,
      data: { product }
    });

    dialogRef.afterClosed().subscribe((updatedProduct: Product) => {
      if (updatedProduct) {
        this.store.dispatch(updateProduct({ productToUpdate: updatedProduct }));
      }
    });
  }

  onDeleteProduct(product: Product): void {
    console.log('Eliminar producto:', product);
  }
}
