import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail.component';
import { SharedModule } from '../../shared/shared.module';
import { NgChartsModule } from 'ng2-charts';

const routes: Routes = [{ path: '', component: ProductDetailComponent }];

@NgModule({
  declarations: [ProductDetailComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes), NgChartsModule],
})
export class ProductDetailModule {}
