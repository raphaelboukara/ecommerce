export interface Product {
  id: number;
  slug: string;
  images: string[];
  name: string;
  keywords: string[];
  price: number;
  description: string;
}

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
}

export type Cart = {
  [K in CartItem['id']]: CartItem & { id: K };
};
