'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Badge } from '@/components/ui/badge';
import { useCartCount, addItemToCart } from '@/store';
import { CartItem } from '@/api/types';

export function CartBadge() {
  const dispatch = useDispatch();
  const cartCount = useCartCount();

  useEffect(() => {
    const storage = localStorage.getItem('kdal');
    if (!storage) {
      return;
    }

    const storedCartItems = JSON.parse(storage) as CartItem[];
    storedCartItems.map((storedCartItem) => {
      dispatch(addItemToCart(storedCartItem));
    });
  }, [dispatch]);

  if (!cartCount) {
    return;
  }

  return (
    <Badge className="absolute -right-1 top-0 h-4 w-auto px-1">
      {cartCount}
    </Badge>
  );
}
