export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categories: string[]; // IDs de las categorías
  brand?: string;
  location?: string;
}

export interface ProductMovement {
  id: string;
  productId: string;
  type: 'IN' | 'OUT' | 'ADJUSTMENT';
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  date: Date;
  notes?: string;
  userId?: string;
}

export interface Category {
  id: string;
  name: string;
  parentId?: string;
  children?: Category[];
  level?: number;
  expandable?: boolean;
}

export interface CategoryNode {
  id: string;
  name: string;
  level: number;
  expandable: boolean;
  parentId?: string;
}

export interface InventoryStats {
  totalProducts: number;
  lowStockProducts: number;
  totalValue: number;
  categories: number;
}
