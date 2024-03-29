import { Category } from './Category';

export type Product = {
  id: number; // Omit loai bo
  title: string;
  price: number;
  img: string;
  description: string;
  category: string; // Omit loai bo
  rating: {
    rate: number;
    count: number;
  };
};

export type ProductAdmin = {
  id: number | null;
  category: string | null;
  title: string | null;
  description: string | null;
  price: string | null;
  img: string | null;
};

// export type CreateProductAdmin = Omit<ProductAdmin, 'id'>;
