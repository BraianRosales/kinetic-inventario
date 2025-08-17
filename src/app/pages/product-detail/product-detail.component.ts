import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state.';
import { selectProducts } from '../../store/selectors/products.selectors';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product, ProductMovement } from 'src/app/core/models/product.model';
import { MovementService } from 'src/app/core/services/movement.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product | undefined>;
  movements$!: Observable<ProductMovement[]>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<AppState>,
    private movementService: MovementService
  ) {
    this.product$ = this.route.params.pipe(
      switchMap((params) =>
        this.store
          .select(selectProducts)
          .pipe(map((products) => products.find((p) => p.id === params['id'])))
      )
    );
  }

  ngOnInit(): void {
    this.movements$ = this.route.params.pipe(
      switchMap((params) =>
        this.movementService.getMovementsByProductId(params['id'])
      )
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
