import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CartTrigger } from './cart-trigger';
import { CartContent } from './cart-content';
import { CartFooter } from './cart-footer';

export function Cart() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <CartTrigger />
      </SheetTrigger>
      <SheetContent className="flex flex-col min-h-svh">
        <SheetHeader>
          <SheetTitle>Votre panier</SheetTitle>
        </SheetHeader>
        <CartContent />
        <SheetFooter>
          <CartFooter />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
