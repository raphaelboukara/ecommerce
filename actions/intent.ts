'use server';

import { auth } from '@/auth';
import { stripe } from '@/lib/stripe';
import { CartItem } from '@/api/types';

export const intent = async ({
  cartTotal,
  cartItems,
}: {
  cartTotal: number;
  cartItems: CartItem[];
}) => {
  const session = await auth();

  if (!session) {
    throw new Error(
      "Pour garantir la protection de vos données personnelles et financières, une étape d'authentification est requise avant d'accéder au système de paiement sécurisé."
    );
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: cartTotal,
    currency: 'eur',
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      userEmail: session.user.email || '',
      userId: session.user.id || '',
      cart: JSON.stringify(
        cartItems.map(({ slug, price, productId }) => ({ slug, price, productId })),
        null,
        2
      ),
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
  };
};
