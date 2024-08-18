import React from 'react';
import { Payment } from '@/components/payment';

export default async function PaymentsPage() {
  return (
    <div className="grid grid-flow-row gap-6 grid-cols-1 md:grid-cols-3">
      <Payment />
    </div>
  );
}
