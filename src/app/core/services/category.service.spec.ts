import { TestBed } from '@angular/core/testing';
import { CategoryService } from './category.service';
import { Category } from '../models/product.model';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryService]
    });
    service = TestBed.inject(CategoryService);
  });

  it('should be created the service', () => {
    expect(service).toBeTruthy();
  });

  describe('getCategories', () => {
    it('must return all categories', (done) => {
      service.getCategories().subscribe(categories => {
        expect(categories).toBeDefined();
        expect(categories.length).toBeGreaterThan(0);
        expect(categories[0].id).toBeDefined();
        expect(categories[0].name).toBeDefined();
        done();
      });
    });

    it('must return categories with children', (done) => {
      service.getCategories().subscribe(categories => {
        const filtrosCategory = categories.find(c => c.id === '1');
        expect(filtrosCategory?.children).toBeDefined();
        expect(filtrosCategory?.children?.length).toBe(2);
        done();
      });
    });
  });

  describe('getAllCategoriesFlat', () => {
    it('should return flat list of all categories', (done) => {
      service.getAllCategoriesFlat().subscribe(categories => {
        expect(categories).toBeDefined();
        expect(categories.length).toBeGreaterThan(0);
        
        // Should include both parent and child categories
        const parentCategories = categories.filter(c => !c.parentId);
        const childCategories = categories.filter(c => c.parentId);
        
        expect(parentCategories.length).toBeGreaterThan(0);
        expect(childCategories.length).toBeGreaterThan(0);
        done();
      });
    });

    it('must include all child categories', (done) => {
      service.getAllCategoriesFlat().subscribe(categories => {
        const childCategory = categories.find(c => c.id === '1-1');
        expect(childCategory).toBeDefined();
        expect(childCategory?.name).toBe('Filtro de Aceite');
        expect(childCategory?.parentId).toBe('1');
        done();
      });
    });
  });

  describe('getCategoryById', () => {
    it('should return parent category by id', () => {
      const category = service.getCategoryById('1');
      expect(category).toBeDefined();
      expect(category?.name).toBe('Filtros');
      expect(category?.parentId).toBeUndefined();
    });

    it('should return child category by id', () => {
      const category = service.getCategoryById('1-1');
      expect(category).toBeDefined();
      expect(category?.name).toBe('Filtro de Aceite');
      expect(category?.parentId).toBe('1');
    });

    it('should return undefined for non-existent id', () => {
      const category = service.getCategoryById('999');
      expect(category).toBeUndefined();
    });
  });

  describe('getCategoryNameById', () => {
    it('should return category name for existing id', () => {
      const name = service.getCategoryNameById('1');
      expect(name).toBe('Filtros');
    });

    it('should return category name for child id', () => {
      const name = service.getCategoryNameById('1-1');
      expect(name).toBe('Filtro de Aceite');
    });

    it('must return default name for no existent id', () => {
      const name = service.getCategoryNameById('999');
      expect(name).toBe('Sin categoría');
    });
  });
});
