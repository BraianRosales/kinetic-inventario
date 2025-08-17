import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Category, CategoryNode } from '../../../core/models/product.model';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.scss'],
})
export class CategoryTreeComponent implements OnInit {
  @Output() categorySelected = new EventEmitter<string>();

  private _transformer = (node: Category, level: number): CategoryNode => {
    return {
      id: node.id,
      name: node.name,
      level: level,
      expandable: !!(node.children && node.children.length > 0),
      parentId: node.parentId,
    };
  };

  treeControl = new FlatTreeControl<CategoryNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.dataSource.data = categories;
      // Expandir todas las categorías principales por defecto
      this.treeControl.expandAll();
    });
  }

  hasChild = (_: number, node: CategoryNode) => node.expandable;

  onCategoryClick(categoryId: string): void {
    this.categorySelected.emit(categoryId);
  }

  isSelected(categoryId: string): boolean {
    // TODO: Implementar lógica para mostrar categoría seleccionada
    return false;
  }
}
