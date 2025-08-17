import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductMovement } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class MovementService {
  private movements: ProductMovement[] = [
    // Movimientos para producto ID 1 (Stock actual: 25)
    {
      id: '1',
      productId: '1',
      type: 'IN',
      quantity: 25,
      previousStock: 0,
      newStock: 25,
      reason: 'Stock inicial',
      date: new Date('2024-01-15'),
    },
    // Movimientos para producto ID 2 (Stock actual: 3)
    {
      id: '2',
      productId: '2',
      type: 'IN',
      quantity: 50,
      previousStock: 0,
      newStock: 50,
      reason: 'Stock inicial',
      date: new Date('2024-01-10'),
    },
    {
      id: '3',
      productId: '2',
      type: 'OUT',
      quantity: 47,
      previousStock: 50,
      newStock: 3,
      reason: 'Venta mayorista',
      date: new Date('2024-01-18'),
    },
    // Movimientos para producto ID 3 (Stock actual: 10)
    {
      id: '4',
      productId: '3',
      type: 'IN',
      quantity: 30,
      previousStock: 0,
      newStock: 30,
      reason: 'Stock inicial',
      date: new Date('2024-01-12'),
    },
    {
      id: '5',
      productId: '3',
      type: 'OUT',
      quantity: 20,
      previousStock: 30,
      newStock: 10,
      reason: 'Venta',
      date: new Date('2024-01-19'),
    },
    // Movimientos para producto ID 4 (Stock actual: 12)
    {
      id: '6',
      productId: '4',
      type: 'IN',
      quantity: 40,
      previousStock: 0,
      newStock: 40,
      reason: 'Stock inicial',
      date: new Date('2024-01-08'),
    },
    {
      id: '7',
      productId: '4',
      type: 'OUT',
      quantity: 28,
      previousStock: 40,
      newStock: 12,
      reason: 'Venta',
      date: new Date('2024-01-16'),
    },
    // Movimientos para producto ID 5 (Stock actual: 15)
    {
      id: '8',
      productId: '5',
      type: 'IN',
      quantity: 20,
      previousStock: 0,
      newStock: 20,
      reason: 'Stock inicial',
      date: new Date('2024-01-14'),
    },
    {
      id: '9',
      productId: '5',
      type: 'OUT',
      quantity: 5,
      previousStock: 20,
      newStock: 15,
      reason: 'Venta',
      date: new Date('2024-01-21'),
    },
    // Movimientos para producto ID 6 (Stock actual: 2)
    {
      id: '10',
      productId: '6',
      type: 'IN',
      quantity: 25,
      previousStock: 0,
      newStock: 25,
      reason: 'Stock inicial',
      date: new Date('2024-01-10'),
    },
    {
      id: '11',
      productId: '6',
      type: 'OUT',
      quantity: 23,
      previousStock: 25,
      newStock: 2,
      reason: 'Venta',
      date: new Date('2024-01-20'),
    },
    // Movimientos para producto ID 7 (Stock actual: 40)
    {
      id: '12',
      productId: '7',
      type: 'IN',
      quantity: 40,
      previousStock: 0,
      newStock: 40,
      reason: 'Stock inicial',
      date: new Date('2024-01-15'),
    },
    // Movimientos para producto ID 8 (Stock actual: 1)
    {
      id: '13',
      productId: '8',
      type: 'IN',
      quantity: 10,
      previousStock: 0,
      newStock: 10,
      reason: 'Stock inicial',
      date: new Date('2024-01-12'),
    },
    {
      id: '14',
      productId: '8',
      type: 'OUT',
      quantity: 9,
      previousStock: 10,
      newStock: 1,
      reason: 'Venta',
      date: new Date('2024-01-25'),
    },
    // Movimientos para producto ID 9 (Stock actual: 4)
    {
      id: '15',
      productId: '9',
      type: 'IN',
      quantity: 15,
      previousStock: 0,
      newStock: 15,
      reason: 'Stock inicial',
      date: new Date('2024-01-08'),
    },
    {
      id: '16',
      productId: '9',
      type: 'OUT',
      quantity: 11,
      previousStock: 15,
      newStock: 4,
      reason: 'Venta',
      date: new Date('2024-01-22'),
    },
    // Movimientos para producto ID 10 (Stock actual: 0)
    {
      id: '17',
      productId: '10',
      type: 'IN',
      quantity: 5,
      previousStock: 0,
      newStock: 5,
      reason: 'Stock inicial',
      date: new Date('2024-01-10'),
    },
    {
      id: '18',
      productId: '10',
      type: 'OUT',
      quantity: 5,
      previousStock: 5,
      newStock: 0,
      reason: 'Venta',
      date: new Date('2024-01-28'),
    },
  ];

  getMovementsByProductId(productId: string): Observable<ProductMovement[]> {
    const productMovements = this.movements.filter(m => m.productId === productId);
    return of(productMovements.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }
}
