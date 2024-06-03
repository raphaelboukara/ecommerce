'use client';

import { ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Product } from '@/api/types';
import { Button } from '@/components/ui/button';
import { addProductToCart } from '@/store';

export function AddToCartButton({ product }: { product: Product }) {
  const dispatch = useDispatch();

  return (
    <Button
      size="lg"
      className="flex gap-2 text-md"
      onClick={() => dispatch(addProductToCart(product))}
    >
      <ShoppingCart />
      Ajouter au panier
    </Button>
  );
}
