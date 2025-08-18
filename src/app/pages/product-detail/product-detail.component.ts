import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product$!: Observable<Product | undefined>;
  movements$!: Observable<ProductMovement[]>;

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
            )
          );
      })
    );
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
