import { Category } from './Category';

export type Product = {
  id: number; // Omit loai bo
  title: string;
  price: number;
  image: string;
  description: string;
  category: string; // Omit loai bo
  rating: {
    rate: number;
    count: number;
  };
};

export type ProductAdmin = {
  id: number;
  category: string | null;
  title: string | null;
  description: string | null;
  price: number | null;
  img: string | null;
};

// export type CreateProductAdmin = Omit<ProductAdmin, 'id'>;
