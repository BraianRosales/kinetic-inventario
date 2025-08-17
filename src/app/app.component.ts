import { Component, OnInit } from '@angular/core';
import { AppState } from './store/app.state.';
import { Store } from '@ngrx/store';
import { loadProducts } from './store/actions/products.actions';
import { selectProducts } from './store/selectors/products.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'kinetic-inventario';
  products$ = this.store.select(selectProducts);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }
}
