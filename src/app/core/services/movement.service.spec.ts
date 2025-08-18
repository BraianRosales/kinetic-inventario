import { TestBed } from '@angular/core/testing';
import { MovementService } from './movement.service';

describe('MovementService', () => {
  let service: MovementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovementService]
    });
    service = TestBed.inject(MovementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMovementsByProductId', () => {
    it('should return movements for existing product', (done) => {
      service.getMovementsByProductId('1').subscribe(movements => {
        expect(movements).toBeDefined();
        expect(movements.length).toBeGreaterThan(0);
        expect(movements[0].productId).toBe('1');
        expect(movements[0].type).toBeDefined();
        expect(movements[0].quantity).toBeDefined();
        expect(movements[0].date).toBeDefined();
        done();
      });
    });

    it('should return movements sorted by date descending', (done) => {
      service.getMovementsByProductId('2').subscribe(movements => {
        expect(movements.length).toBe(2);
        
        // Check if sorted by date descending (newest first)
        const firstDate = new Date(movements[0].date);
        const secondDate = new Date(movements[1].date);
        expect(firstDate.getTime()).toBeGreaterThanOrEqual(secondDate.getTime());
        done();
      });
    });

    it('should return empty array for non-existent product', (done) => {
      service.getMovementsByProductId('999').subscribe(movements => {
        expect(movements).toEqual([]);
        done();
      });
    });

    it('should return correct movement types', (done) => {
      service.getMovementsByProductId('1').subscribe(movements => {
        const movement = movements[0];
        expect(['IN', 'OUT']).toContain(movement.type);
        done();
      });
    });

    it('should return movements with correct structure', (done) => {
      service.getMovementsByProductId('3').subscribe(movements => {
        const movement = movements[0];
        expect(movement.id).toBeDefined();
        expect(movement.productId).toBeDefined();
        expect(movement.type).toBeDefined();
        expect(movement.quantity).toBeDefined();
        expect(movement.previousStock).toBeDefined();
        expect(movement.newStock).toBeDefined();
        expect(movement.reason).toBeDefined();
        expect(movement.date).toBeDefined();
        done();
      });
    });

    it('should return movements for product with multiple entries', (done) => {
      service.getMovementsByProductId('10').subscribe(movements => {
        expect(movements.length).toBe(2);
        
        // Check that all movements belong to the same product
        movements.forEach(movement => {
          expect(movement.productId).toBe('10');
        });
        done();
      });
    });
  });
});
