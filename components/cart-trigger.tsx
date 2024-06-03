import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartBadge } from './cart-badge';

export function CartTrigger() {
  return (
    <Button variant="ghost" size="icon" className="relative">
      <ShoppingCart />
      <CartBadge />
    </Button>
  );
}
