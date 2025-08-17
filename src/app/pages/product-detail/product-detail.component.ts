import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state.';
import { selectProducts } from '../../store/selectors/products.selectors';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product | undefined>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<AppState>
  ) {
    this.product$ = this.route.params.pipe(
      switchMap(params => 
        this.store.select(selectProducts).pipe(
          map(products => products.find(p => p.id === params['id']))
        )
      )
    );
  }

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }
}
