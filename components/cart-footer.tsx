import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CartTotal } from './cart-total';

type CartFooterProps = {
  withSubmit?: boolean;
};

export function CartFooter({ withSubmit = true }: CartFooterProps) {
  return (
    <div className="flex flex-col space-y-2 md:space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <p className="leading-6 mt-1">Total</p>
          <p className="leading-6 mt-1 text-right text-base">
            <CartTotal />
          </p>
        </div>
        <Separator />
      </div>
      {withSubmit && (
        <Button asChild>
          <a href="/payments">Passer la commande</a>
        </Button>
      )}
    </div>
  );
}
