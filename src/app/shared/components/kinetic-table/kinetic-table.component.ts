import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../../core/models/product.model';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-kinetic-table',
  templateUrl: './kinetic-table.component.html',
  styleUrls: ['./kinetic-table.component.scss'],
})
export class KineticTableComponent implements AfterViewInit {
  @Input() products: Product[] = [];
  @Input() title: string = 'Lista de Productos';
  @Input() showActions: boolean = true;

  @Output() viewProduct = new EventEmitter<Product>();
  @Output() editProduct = new EventEmitter<Product>();
  @Output() deleteProduct = new EventEmitter<Product>();

  // Tabla configuration
  displayedColumns: string[] = [
    'id',
    'name',
    'brand',
    'stock',
    'price',
    'location',
    'categories',
  ];
  dataSource = new MatTableDataSource<Product>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private categoryService: CategoryService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges() {
    this.updateDataSource();
    this.updateDisplayedColumns();
  }

  private updateDataSource(): void {
    this.dataSource.data = this.products || [];
  }

  private updateDisplayedColumns(): void {
    this.displayedColumns = [
      'id',
      'name',
      'brand',
      'stock',
      'price',
      'location',
      'categories',
    ];
    if (this.showActions) {
      this.displayedColumns.push('actions');
    }
  }

  // Método para formatear el precio
  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(price);
  }

  // Método para obtener el estado del stock
  getStockStatus(stock: number): { text: string; class: string } {
    if (stock === 0) {
      return { text: 'Sin stock', class: 'stock-empty' };
    } else if (stock < 5) {
      return { text: 'Stock bajo', class: 'stock-low' };
    } else {
      return { text: 'Disponible', class: 'stock-ok' };
    }
  }

  getCategoryNames(categoryIds: string[]): string {
    return categoryIds
      .map(id => this.categoryService.getCategoryNameById(id))
      .join(', ');
  }

  // Métodos para manejar eventos
  onViewProduct(product: Product): void {
    this.viewProduct.emit(product);
  }

  onEditProduct(product: Product): void {
    this.editProduct.emit(product);
  }

  onDeleteProduct(product: Product): void {
    this.deleteProduct.emit(product);
  }
}
