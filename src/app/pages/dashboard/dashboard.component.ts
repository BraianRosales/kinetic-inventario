import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state.';
import { selectProducts } from '../../store/selectors/products.selectors';
import { loadProducts } from '../../store/actions/products.actions';
import { Product } from '../../core/models/product.model';

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

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadProducts());

    // Suscribirse a los productos para calcular estadísticas
    this.products$.subscribe((products) => {
      this.calculateStats(products || []);
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

  // Métodos para manejar eventos de la tabla
  onViewProduct(product: Product): void {
    console.log('Ver producto:', product);
  }

  onEditProduct(product: Product): void {
    console.log('Editar producto:', product);
  }

  onDeleteProduct(product: Product): void {
    console.log('Eliminar producto:', product);
  }
}
