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

  const customerEmail = session.user.email;
  if (!customerEmail) {
    throw new Error(
      "Pour préparer votre transaction en toute sécurité et vous tenir informé de son avancement, la saisie d'une adresse email valide est requise avant de procéder au paiement."
    );
  }

  const customers = await stripe.customers.search({
    query: `email:'${customerEmail}'`,
  });

  let customer = customers.data[0];

  if (!customer) {
    customer = await stripe.customers.create({
      email: customerEmail,
      metadata: {
        id: session.user.id || ''
      }
    });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    customer: customer.id,
    amount: cartTotal,
    currency: 'eur',
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
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
