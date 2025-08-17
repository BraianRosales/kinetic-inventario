export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categories: string[];
  brand?: string;
  location?: string;
}

export interface ProductMovement {
  id: string;
  productId: string;
  type: 'IN' | 'OUT';
  quantity: number;
  reason: string;
  date: Date;
  userId?: string;
}

export interface Category {
  id: string;
  name: string;
  parentId?: string;
  children?: Category[];
}

export interface InventoryStats {
  totalProducts: number;
  lowStockProducts: number;
  totalValue: number;
  categories: number;
}
