export interface Product {
  id: string;
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
  productId: string;
}

export type Cart = {
  [K in CartItem['id']]: CartItem & { id: K };
};
