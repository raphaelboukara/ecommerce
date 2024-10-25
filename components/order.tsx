import Link from 'next/link';
import { formatAddress, formatDate, formatPrice } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

type OrderProps = {
  amount: number;
  created: number;
  cart: {
    slug: string;
    price: number;
    productId: string;
    name: string;
  }[];
  address?: {
    city?: string | null;
    country?: string | null;
    line1?: string | null;
    line2?: string | null;
    postal_code?: string | null;
    state?: string | null;
  }
}

export function Order({
  amount,
  created,
  cart,
  address
}: OrderProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{formatDate(created * 1000)}</CardTitle>
        <Badge variant="secondary" className="self-start">
          Nous préparons votre commande
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <div>
          {cart.map((item, idx) => (
            <div className="flex justify-between" key={idx}>
              <Link href={`/products/${item.slug}`} className="hover:underline">
                {`article ${idx + 1}`}
              </Link>
              <p className="text-muted-foreground">
                {formatPrice(item.price)}
              </p>
            </div>
          ))} 
          <Separator/>
          <div className="flex justify-between flex-row-reverse">
            <p className="text-muted-foreground">
              {formatPrice(amount)}
            </p>
          </div>
        </div>
        {
          address ? (
            <div className="bg-secondary p-2 font-medium">
              {formatAddress(address).split('\n').map((addressPart, idx) => <p key={idx}>{addressPart}</p>)}
            </div>
          ) : null
        }
      </CardContent>
    </Card>
  );
}
