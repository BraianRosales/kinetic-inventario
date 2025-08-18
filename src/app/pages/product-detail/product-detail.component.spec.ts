import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { ProductDetailComponent } from './product-detail.component';
import { Product, ProductMovement } from '../../core/models/product.model';
import * as ProductActions from '../../store/actions/products.actions';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let store: jasmine.SpyObj<Store>;
  let route: jasmine.SpyObj<ActivatedRoute>;
  let location: jasmine.SpyObj<Location>;

  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    price: 1000,
    stock: 10,
    categories: ['1'],
    brand: 'Test Brand',
    location: 'Test Location'
  };

  const mockMovements: ProductMovement[] = [
    {
      id: '1',
      productId: '1',
      type: 'IN',
      quantity: 10,
      previousStock: 0,
      newStock: 10,
      reason: 'Stock inicial',
      date: new Date('2024-01-01')
    },
    {
      id: '2',
      productId: '1',
      type: 'OUT',
      quantity: 3,
      previousStock: 10,
      newStock: 7,
      reason: 'Venta',
      date: new Date('2024-01-02')
    }
  ];

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      params: of({ id: '1' })
    });
    const locationSpy = jasmine.createSpyObj('Location', ['back']);

    storeSpy.select.and.callFake((selector: any) => {
      if (selector && typeof selector === 'function') {
        // Si es un selector con parámetros (como selectProductById)
        return of(mockProduct);
      }
      // Para otros selectores como selectMovements
      return of([]);
    });

    await TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
      imports: [MatIconModule],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: ActivatedRoute, useValue: routeSpy },
        { provide: Location, useValue: locationSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    route = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadProductById on init', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(ProductActions.loadProductById({ id: '1' }));
  });

  it('should dispatch loadMovementsByProductId on init', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(ProductActions.loadMovementsByProductId({ productId: '1' }));
  });

  it('should return correct movement icon for IN type', () => {
    const icon = component.getMovementIcon('IN');
    expect(icon).toBe('add');
  });

  it('should return correct movement icon for OUT type', () => {
    const icon = component.getMovementIcon('OUT');
    expect(icon).toBe('remove');
  });

  it('should return correct movement icon for ADJUSTMENT type', () => {
    const icon = component.getMovementIcon('ADJUSTMENT');
    expect(icon).toBe('edit');
  });

  it('should return default movement icon for unknown type', () => {
    const icon = component.getMovementIcon('UNKNOWN');
    expect(icon).toBe('info');
  });

  it('should return correct movement color for IN type', () => {
    const color = component.getMovementColor('IN');
    expect(color).toBe('success');
  });

  it('should return correct movement color for OUT type', () => {
    const color = component.getMovementColor('OUT');
    expect(color).toBe('warn');
  });

  it('should return correct movement color for ADJUSTMENT type', () => {
    const color = component.getMovementColor('ADJUSTMENT');
    expect(color).toBe('accent');
  });

  it('should return default movement color for unknown type', () => {
    const color = component.getMovementColor('UNKNOWN');
    expect(color).toBe('primary');
  });

  it('should call location.back when goBack is called', () => {
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  });

  it('should update line chart data correctly', () => {
    component.updateCharts(mockMovements);
    
    expect(component.lineChartData.labels?.length).toBe(2);
    expect(component.lineChartData.datasets[0].data).toEqual([10, 7]);
  });

  it('should update bar chart data correctly', () => {
    component.updateCharts(mockMovements);
    
    expect(component.barChartData.datasets[0].data).toEqual([10, 3, 0]);
  });

  it('should not update charts when movements array is empty', () => {
    const initialLabels = component.lineChartData.labels;
    const initialData = component.lineChartData.datasets[0].data;
    
    component.updateCharts([]);
    
    expect(component.lineChartData.labels).toBe(initialLabels);
    expect(component.lineChartData.datasets[0].data).toBe(initialData);
  });

  it('should sort movements by date for line chart', () => {
    const unsortedMovements: ProductMovement[] = [
      {
        id: '2',
        productId: '1',
        type: 'OUT',
        quantity: 3,
        previousStock: 10,
        newStock: 7,
        reason: 'Venta',
        date: new Date('2024-01-02')
      },
      {
        id: '1',
        productId: '1',
        type: 'IN',
        quantity: 10,
        previousStock: 0,
        newStock: 10,
        reason: 'Stock inicial',
        date: new Date('2024-01-01')
      }
    ];

    component.updateCharts(unsortedMovements);
    
    expect(component.lineChartData.datasets[0].data).toEqual([10, 7]);
  });

  it('should handle ADJUSTMENT movement type in bar chart', () => {
    const movementsWithAdjustment: ProductMovement[] = [
      {
        id: '1',
        productId: '1',
        type: 'IN',
        quantity: 10,
        previousStock: 0,
        newStock: 10,
        reason: 'Stock inicial',
        date: new Date('2024-01-01')
      },
      {
        id: '2',
        productId: '1',
        type: 'ADJUSTMENT',
        quantity: -2,
        previousStock: 10,
        newStock: 8,
        reason: 'Ajuste de inventario',
        date: new Date('2024-01-02')
      }
    ];

    component.updateCharts(movementsWithAdjustment);
    
    expect(component.barChartData.datasets[0].data).toEqual([10, 0, 2]);
  });
});
