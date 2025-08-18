import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryTreeComponent } from './category-tree.component';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/product.model';
import { of } from 'rxjs';

describe('CategoryTreeComponent', () => {
  let component: CategoryTreeComponent;
  let fixture: ComponentFixture<CategoryTreeComponent>;
  let categoryService: jasmine.SpyObj<CategoryService>;

  const mockCategories: Category[] = [
    { id: '1', name: 'Filtros', parentId: undefined },
    { id: '1-1', name: 'Filtro de Aceite', parentId: '1' },
    { id: '2', name: 'Lubricantes', parentId: undefined }
  ];

  beforeEach(async () => {
    const categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategories']);
    categoryServiceSpy.getCategories.and.returnValue(of(mockCategories));

    await TestBed.configureTestingModule({
      declarations: [CategoryTreeComponent],
      imports: [
        MatIconModule,
        MatButtonModule,
        MatTreeModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: CategoryService, useValue: categoryServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryTreeComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService) as jasmine.SpyObj<CategoryService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load categories on init', () => {
    component.ngOnInit();
    expect(categoryService.getCategories).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockCategories);
  });

  it('should emit categorySelected event', () => {
    spyOn(component.categorySelected, 'emit');
    component.onCategoryClick('1');
    expect(component.categorySelected.emit).toHaveBeenCalledWith('1');
  });

  it('should return false for isSelected by default', () => {
    expect(component.isSelected('1')).toBe(false);
  });
});
