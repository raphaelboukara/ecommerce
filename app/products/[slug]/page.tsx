import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Label } from '@/components/ui/label';
import { Markdown } from '@/components/ui/markdown';
import { AddToCartButton } from '@/components/add-to-cart-button';
import { formatPrice } from '@/lib/utils';
import { getProductBySlug } from '@/api/products';

export default async function ProductPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-6 md:items-start">
      <Card className="w-full md:w-1/2 overflow-hidden">
        <Carousel>
          <CarouselContent>
            {product.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-square">
                  <Image
                    src={image}
                    alt={product.name}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    width={1000}
                    height={1000}
                    className="aspect-square object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Card>
      <div className="w-full md:w-1/2 space-y-2 md:space-y-6">
        <div className="space-y-4">
          <h1 className="scroll-m-20 text-2xl md:text-3xl font-extrabold tracking-tight">
            {product.name}
          </h1>
          <Badge size="sm">{formatPrice(product.price)}</Badge>
          <Separator />
        </div>
        <Markdown>{product.description}</Markdown>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
