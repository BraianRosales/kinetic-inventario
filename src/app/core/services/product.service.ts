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
        name: 'Filtro de aire',
        description: 'Filtro de aire de alto rendimiento para motores turbo.',
        price: 1800,
        stock: 3,
        categories: ['Filtros', 'Motor'],
        brand: 'K&N',
        location: 'Estante A2',
      },
      {
        id: '6',
        name: 'Líquido de frenos DOT4',
        description: 'Líquido de frenos DOT4, 500ml.',
        price: 950,
        stock: 2,
        categories: ['Frenos', 'Líquidos'],
        brand: 'Castrol',
        location: 'Estante B3',
      },
      {
        id: '7',
        name: 'Radiador de agua',
        description: 'Radiador de agua para Toyota Corolla 1.8.',
        price: 12500,
        stock: 1,
        categories: ['Refrigeración'],
        brand: 'Denso',
        location: 'Estante E1',
      },
      {
        id: '8',
        name: 'Amortiguadores delanteros',
        description: 'Par de amortiguadores delanteros para Ford Focus.',
        price: 8900,
        stock: 4,
        categories: ['Suspensión'],
        brand: 'Sachs',
        location: 'Estante F2',
      },
      {
        id: '9',
        name: 'Batería 60Ah',
        description: 'Batería de 60Ah para vehículos medianos.',
        price: 15000,
        stock: 0,
        categories: ['Eléctrico'],
        brand: 'Moura',
        location: 'Depósito',
      },
      {
        id: '10',
        name: 'Termostato',
        description: 'Termostato para motor 2.0L.',
        price: 1800,
        stock: 2,
        categories: ['Refrigeración'],
        brand: 'Mahle',
        location: 'Estante E2',
      },
    ]);
  }
}
