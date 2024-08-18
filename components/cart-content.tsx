'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2 as Trash } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { useCartItems, removeItemFromCart, addItemToCart } from '@/store';

export function CartContent({
  isImmutable = false,
}: {
  isImmutable?: boolean;
}) {
  const dispatch = useDispatch();
  const cartItems = useCartItems();

  return (
    <div className="flex-grow overflow-y-auto space-y-2 md:space-y-6">
      {cartItems.map((cartItem) => (
        <div
          className="flex items-center space-x-2 md:space-x-6"
          key={cartItem.id}
        >
          <Link
            href={`/products/${cartItem.slug}`}
            className="relative h-24 w-24"
          >
            <Image
              src={cartItem.image}
              alt={cartItem.name}
              sizes="(max-width: 768px) 50vw, 33vw"
              fill
              className="absolute object-cover rounded"
              loading="lazy"
            />
          </Link>
          <div className="flex flex-1 flex-col gap-1 self-start">
            <Link href={`/products/${cartItem.slug}`}>
              <p className="leading-6">{cartItem.name}</p>
              <p className="leading-6 text-muted-foreground">
                {formatPrice(cartItem.price)}
              </p>
            </Link>
            {!isImmutable && (
              <div className="flex items-center space-x-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => dispatch(removeItemFromCart(cartItem.id))}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
