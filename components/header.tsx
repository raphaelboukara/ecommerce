import { Button } from '@/components/ui/button';
import { Logo } from './logo';
import { Cart } from './cart';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-2 md:px-6 flex h-14 items-center justify-between gap-2">
        <a href="/">
          <Logo />
        </a>
        <Button variant="outline" asChild>
          <a href="/settings">Mon Espace Personnel</a>
        </Button>
        <Cart />
      </div>
    </header>
  );
}
