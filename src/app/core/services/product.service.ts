import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return of([
      {
        id: '1',
        name: 'Filtro de aceite',
        description:
          'Filtro de aceite para motor 1.6L, compatible con varias marcas.',
        price: 1200,
        stock: 25,
        categories: ['Filtros', 'Motor'],
        brand: 'Mann',
        location: 'Estante A1',
      },
      {
        id: '2',
        name: 'Pastillas de freno',
        description: 'Juego de pastillas de freno delanteras para VW Gol.',
        price: 3500,
        stock: 15,
        categories: ['Frenos'],
        brand: 'Brembo',
        location: 'Estante B2',
      },
      {
        id: '3',
        name: 'Aceite sintético 5W30',
        description: 'Bidón de aceite sintético 5W30, 4 litros.',
        price: 8000,
        stock: 10,
        categories: ['Lubricantes', 'Motor'],
        brand: 'Shell',
        location: 'Depósito',
      },
      {
        id: '4',
        name: 'Bujía de encendido',
        description: 'Bujía de encendido para motores nafteros.',
        price: 600,
        stock: 40,
        categories: ['Encendido'],
        brand: 'NGK',
        location: 'Estante C3',
      },
      {
        id: '5',
        name: 'Correa de distribución',
        description: 'Correa de distribución para Peugeot 206 1.4.',
        price: 4500,
        stock: 8,
        categories: ['Motor'],
        brand: 'Gates',
        location: 'Estante D4',
      },
    ]);
  }
}
