import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import { getProducts } from '@/api/products';

export default async function RootPage() {
  const products = await getProducts();

  return (
    <ul className="grid grid-flow-row gap-2 md:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {products.map((product) => (
        <li
          className="group aspect-square animate-fadeIn cursor-pointer"
          key={product.id}
        >
          <Link href={`/products/${product.slug}`}>
            <Card className="relative h-full w-full overflow-hidden">
              <CardContent>
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fill
                  className="object-cover transition duration-300 ease-in-out group-hover:scale-105"
                  loading="lazy"
                />
                <Badge className="absolute bottom-4 right-4">
                  {formatPrice(product.price)}
                </Badge>
              </CardContent>
            </Card>
            <p className="leading-6 mt-1">{product.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
