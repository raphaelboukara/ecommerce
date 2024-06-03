/* eslint-disable react/no-unescaped-entities */
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
    <div className="p-2 md:p-6 flex flex-col md:flex-row gap-2 md:gap-6 md:items-start">
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

        {/* <h3 className="mt-8 mb-1 scroll-m-20 text-xl font-semibold tracking-tight">
          Taille
        </h3>
        <RadioGroup defaultValue="medium" className="grid grid-cols-4 gap-4">
          <div>
            <RadioGroupItem 
              value="small"
              id="small"
              className="peer sr-only" />
            <Label
              htmlFor="small"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              25cm
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="medium"
              id="medium"
              className="peer sr-only"
            />
            <Label
              htmlFor="medium"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              35cm
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="large"
              id="large"
              className="peer sr-only"
            />
            <Label
              htmlFor="large"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              45cm
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="xlarge"
              id="xlarge"
              className="peer sr-only"
            />
            <Label
              htmlFor="xlarge"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              45cm
            </Label>
          </div>
        </RadioGroup>

        <h3 className="mt-8 mb-1 scroll-m-20 text-xl font-semibold tracking-tight">
          Couleur
        </h3>
        <RadioGroup defaultValue="brown" className="grid grid-cols-2 gap-4">
          <div>
            <RadioGroupItem 
              value="brown"
              id="brown"
              className="peer sr-only" />
            <Label
              htmlFor="brown"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              Marron
            </Label>
          </div>
          <div>
            <RadioGroupItem 
              value="black"
              id="black"
              className="peer sr-only" />
            <Label
              htmlFor="black"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              Noire
            </Label>
          </div>
        </RadioGroup> */}

        {/* <h3 className="mt-8 mb-1 scroll-m-20 text-xl font-semibold tracking-tight">
          Description
        </h3> */}
        <Markdown>{product.description}</Markdown>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
