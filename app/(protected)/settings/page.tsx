import React from 'react';
import { stripe } from '@/lib/stripe';
import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import { Order } from '@/components/order';

export default async function SettingsPage() {
  const session = await auth();
  if (!session) {
    return null;
  }

  const email = session.user.email;
  if (!email) {
    return null;
  }

  const customer = (await stripe.customers.search({
    query: `email:'${email}'`,
  })).data[0];
  if (!customer) {
    return null;
  }
  
  const payments = (await stripe.paymentIntents.list({
    customer: customer.id
  })).data.filter((payment) => payment.status === 'succeeded');

  const handleClick = async () => {
    'use server';
    await signOut();
  };

  return (
    <div className="flex flex-col gap-2 md:gap-6">
      <h2 className="text-xl font-semibold">Mes Commandes</h2>
      <div className="flex flex-col md:flex-row gap-2 md:gap-6 md:items-start">
        {
          payments.map((payment) =>
            <Order key={payment.id}
              amount={payment.amount} 
              created={payment.created}
              cart={JSON.parse(payment.metadata.cart)}
              address={payment.shipping?.address}/>
          )
        }
      </div>
      <h2 className="text-xl font-semibold">Mon Compte</h2>
      <form action={handleClick}>
        <Button variant="destructive" type="submit">
          Déconnecter {email}
        </Button>
      </form>
    </div>
  );
}
