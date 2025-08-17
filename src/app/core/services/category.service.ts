import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: Category[] = [
    {
      id: '1',
      name: 'Filtros',
      parentId: undefined,
      children: [
        { id: '1-1', name: 'Filtro de Aceite', parentId: '1' },
        { id: '1-2', name: 'Filtro de Aire', parentId: '1' },
      ],
    },
    {
      id: '2',
      name: 'Lubricantes',
      parentId: undefined,
      children: [
        { id: '2-1', name: 'Aceite de Motor', parentId: '2' },
        { id: '2-2', name: 'Aceite de Transmisión', parentId: '2' },
      ],
    },
    {
      id: '3',
      name: 'Frenos',
      parentId: undefined,
      children: [
        { id: '3-1', name: 'Pastillas de Freno', parentId: '3' },
        { id: '3-2', name: 'Líquido de Frenos', parentId: '3' },
      ],
    },
  ];

  constructor() {}

  getCategories(): Observable<Category[]> {
    return of(this.categories);
  }

  getAllCategoriesFlat(): Observable<Category[]> {
    const flatCategories: Category[] = [];
    
    this.categories.forEach(category => {
      flatCategories.push(category);
      if (category.children) {
        category.children.forEach(child => {
          flatCategories.push(child);
        });
      }
    });
    
    return of(flatCategories);
  }

  getCategoryById(id: string): Category | undefined {
    for (const category of this.categories) {
      if (category.id === id) return category;
      if (category.children) {
        const child = category.children.find(c => c.id === id);
        if (child) return child;
      }
    }
    return undefined;
  }

  getCategoryNameById(id: string): string {
    const category = this.getCategoryById(id);
    return category ? category.name : 'Sin categoría';
  }
}
