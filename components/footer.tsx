import * as React from 'react';
import { ToggleMode } from '@/components/toggle-mode';

export function Footer() {
  return (
    <footer className="sw-full border-t border-border/40 bg-background/95">
      <div className="px-2 md:px-6 flex h-14 items-center justify-between">
        <ToggleMode />
      </div>
    </footer>
  );
}
