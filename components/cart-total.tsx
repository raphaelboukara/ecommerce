'use client';

import { formatPrice } from '@/lib/utils';
import { useCartTotal } from '@/store';

export function CartTotal() {
  const cartTotal = useCartTotal();

  return formatPrice(cartTotal);
}
