import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { KineticTableComponent } from './components/kinetic-table/kinetic-table.component';
import { AddProductDialogComponent } from './components/add-product-dialog/add-product-dialog.component';
import { CategoryTreeComponent } from './components/category-tree/category-tree.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    KineticTableComponent,
    AddProductDialogComponent,
    CategoryTreeComponent,
    ConfirmDialogComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    KineticTableComponent,
    AddProductDialogComponent,
    CategoryTreeComponent,
    ConfirmDialogComponent
  ],
})
export class SharedModule {}
