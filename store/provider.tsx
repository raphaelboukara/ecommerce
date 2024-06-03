'use client';

import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { createStore } from '.';

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<ReturnType<typeof createStore> | null>(null);

  if (!storeRef.current) {
    storeRef.current = createStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
