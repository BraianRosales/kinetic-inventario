import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products: Product[] = [
    {
      id: '1',
      name: 'Filtro de aceite Mann',
      description:
        'Filtro de aceite para motor 1.6L, compatible con varias marcas.',
      price: 1200,
      stock: 25,
      categories: ['1', '1-1'], // Filtros + Filtro de Aceite
      brand: 'Mann',
      location: 'Estante A1',
    },
    {
      id: '2',
      name: 'Filtro de aire K&N',
      description: 'Filtro de aire de alto rendimiento para motores turbo.',
      price: 1800,
      stock: 3,
      categories: ['1', '1-2'], // Filtros + Filtro de Aire
      brand: 'K&N',
      location: 'Estante A2',
    },
    {
      id: '3',
      name: 'Aceite sintético 5W30',
      description: 'Bidón de aceite sintético 5W30, 4 litros.',
      price: 8000,
      stock: 10,
      categories: ['2', '2-1'], // Lubricantes + Aceite de Motor
      brand: 'Shell',
      location: 'Depósito',
    },
    {
      id: '4',
      name: 'Aceite de transmisión',
      description: 'Aceite de transmisión automática, 1 litro.',
      price: 3200,
      stock: 12,
      categories: ['2', '2-2'], // Lubricantes + Aceite de Transmisión
      brand: 'Valvoline',
      location: 'Estante G1',
    },
    {
      id: '5',
      name: 'Pastillas de freno delanteras',
      description: 'Juego de pastillas de freno delanteras para VW Gol.',
      price: 3500,
      stock: 15,
      categories: ['3', '3-1'], // Frenos + Pastillas de Freno
      brand: 'Brembo',
      location: 'Estante B2',
    },
    {
      id: '6',
      name: 'Líquido de frenos DOT4',
      description: 'Líquido de frenos DOT4, 500ml.',
      price: 950,
      stock: 2,
      categories: ['3', '3-2'], // Frenos + Líquido de Frenos
      brand: 'Castrol',
      location: 'Estante B3',
    },
    {
      id: '7',
      name: 'Bujía de encendido NGK',
      description: 'Bujía de encendido para motores nafteros.',
      price: 600,
      stock: 40,
      categories: ['1'], // Solo Filtros (para mostrar múltiples categorías)
      brand: 'NGK',
      location: 'Estante C3',
    },
    {
      id: '8',
      name: 'Radiador de agua',
      description: 'Radiador de agua para Toyota Corolla 1.8.',
      price: 12500,
      stock: 1,
      categories: ['2'], // Solo Lubricantes
      brand: 'Denso',
      location: 'Estante E1',
    },
    {
      id: '9',
      name: 'Amortiguadores delanteros',
      description: 'Par de amortiguadores delanteros para Ford Focus.',
      price: 8900,
      stock: 4,
      categories: ['3'], // Solo Frenos
      brand: 'Sachs',
      location: 'Estante F2',
    },
    {
      id: '10',
      name: 'Batería 60Ah',
      description: 'Batería de 60Ah para vehículos medianos.',
      price: 15000,
      stock: 0,
      categories: ['1', '2'], // Múltiples categorías principales
      brand: 'Moura',
      location: 'Depósito',
    },
  ];

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  postProduct(
    product: Product
  ): Observable<{ message: string; product: Product }> {
    // Generar un ID único para el nuevo producto
    const newId = (this.products.length + 1).toString();
    const newProduct = { ...product, id: newId };

    this.products = [...this.products, newProduct];

    return of({
      message: `${newProduct.name} agregado correctamente`,
      product: newProduct,
    });
  }

  updateProduct(
    productToUpdate: Product
  ): Observable<{ message: string; product: Product }> {
    // Encontrar el índice del producto a actualizar
    const index = this.products.findIndex((p) => p.id === productToUpdate.id);

    if (index !== -1) {
      // Actualizar el producto en el array
      this.products = [
        ...this.products.slice(0, index),
        productToUpdate,
        ...this.products.slice(index + 1),
      ];

      return of({
        message: `${productToUpdate.name} actualizado correctamente`,
        product: productToUpdate,
      });
    } else {
      throw new Error('Producto no encontrado');
    }
  }
}
