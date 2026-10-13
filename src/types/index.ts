export type ProductCategory = 'All' | 'Pens' | 'Notebooks' | 'Art Supplies' | 'Office Essentials';

export interface Product {
  id: string;
  name: string;
  category: 'Pens' | 'Notebooks' | 'Art Supplies' | 'Office Essentials';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  features: string[];
  specs: {
    material?: string;
    paperWeight?: string;
    dimensions?: string;
    inkType?: string;
    pages?: number;
    origin?: string;
  };
  inStock: boolean;
  tag?: 'Bestseller' | 'Staff Pick' | 'New Arrival' | 'Eco Friendly';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CategoryInfo {
  id: string;
  name: 'Pens' | 'Notebooks' | 'Art Supplies' | 'Office Essentials';
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}
