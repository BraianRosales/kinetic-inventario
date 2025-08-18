import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state.';
import {
  selectProductById,
  selectMovements,
  selectMovementsLoading,
} from '../../store/selectors/products.selectors';
import {
  loadProductById,
  loadMovementsByProductId,
} from '../../store/actions/products.actions';
import { map, switchMap, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product, ProductMovement } from 'src/app/core/models/product.model';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  
  product$!: Observable<Product | undefined>;
  movements$!: Observable<ProductMovement[]>;

  // Configuración del gráfico de líneas
  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Stock',
        fill: true,
        tension: 0.4,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        pointBackgroundColor: 'rgba(75,192,192,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75,192,192,1)'
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Evolución del Stock'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Fecha'
        }
      }
    }
  };

  public lineChartType = 'line' as const;

  // Configuración del gráfico de barras para tipos de movimiento
  public barChartData: ChartData<'bar'> = {
    labels: ['Entradas', 'Salidas', 'Ajustes'],
    datasets: [
      {
        data: [0, 0, 0],
        label: 'Total de Unidades',
        backgroundColor: [
          'rgba(40, 167, 69, 0.8)',
          'rgba(220, 53, 69, 0.8)',
          'rgba(23, 162, 184, 0.8)'
        ],
        borderColor: [
          'rgba(40, 167, 69, 1)',
          'rgba(220, 53, 69, 1)',
          'rgba(23, 162, 184, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Total de Unidades por Tipo de Movimiento'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Unidades'
        }
      }
    }
  };

  public barChartType = 'bar' as const;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    // Guarda un producto específico por id
    this.product$ = this.route.params.pipe(
      switchMap((params) => {
        const productId = params['id'];
        this.store.dispatch(loadProductById({ id: productId }));
        return this.store
          .select(selectProductById(productId))
          .pipe(filter((product) => product !== undefined));
      })
    );

    // Guarda los movimientos de un producto específico
    this.movements$ = this.route.params.pipe(
      switchMap((params) => {
        const productId = params['id'];
        this.store.dispatch(loadMovementsByProductId({ productId }));
        return this.store
          .select(selectMovements)
          .pipe(
            filter(
              (movements) =>
                movements.length > 0 ||
                !this.store.select(selectMovementsLoading)
            ),
            map(movements => {
              this.updateCharts(movements);
              return movements;
            })
          );
      })
    );
  }

  public updateCharts(movements: ProductMovement[]): void {
    if (movements.length === 0) return;

    // Actualizar gráfico de líneas
    const sortedMovements = [...movements].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const labels: string[] = [];
    const stockData: number[] = [];
    let currentStock = 0;

    sortedMovements.forEach(movement => {
      labels.push(new Date(movement.date).toLocaleDateString('es-ES'));
      currentStock = movement.newStock;
      stockData.push(currentStock);
    });

    this.lineChartData.labels = labels;
    this.lineChartData.datasets[0].data = stockData;

    // Actualizar gráfico de barras - SUMAR CANTIDADES, no contar movimientos
    const movementTotals = {
      IN: 0,
      OUT: 0,
      ADJUSTMENT: 0
    };

    movements.forEach(movement => {
      if (movement.type === 'IN') {
        movementTotals.IN += movement.quantity;
      } else if (movement.type === 'OUT') {
        movementTotals.OUT += movement.quantity;
      } else if (movement.type === 'ADJUSTMENT') {
        movementTotals.ADJUSTMENT += Math.abs(movement.quantity);
      }
    });

    this.barChartData.datasets[0].data = [
      movementTotals.IN,
      movementTotals.OUT,
      movementTotals.ADJUSTMENT
    ];

    // Forzar actualización del gráfico
    if (this.chart) {
      this.chart.update();
    }
  }

  goBack(): void {
    this.location.back();
  }

  getMovementIcon(type: string): string {
    switch (type) {
      case 'IN':
        return 'add';
      case 'OUT':
        return 'remove';
      case 'ADJUSTMENT':
        return 'edit';
      default:
        return 'info';
    }
  }

  getMovementColor(type: string): string {
    switch (type) {
      case 'IN':
        return 'success';
      case 'OUT':
        return 'warn';
      case 'ADJUSTMENT':
        return 'accent';
      default:
        return 'primary';
    }
  }
}
