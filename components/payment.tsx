'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import {
  loadStripe,
  StripeAddressElementOptions,
  StripeElementsOptions,
  StripePaymentElementOptions,
} from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  AddressElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { intent } from '@/actions/intent';
import { useTheme } from '@/components/theme-context';
import { Button } from '@/components/ui/button';
import { Note } from '@/components/ui/alert';
import { CartContent } from '@/components/cart-content';
import { CartFooter } from '@/components/cart-footer';
import { useCartItems, useCartTotal } from '@/store';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckoutForm = ({ clientSecret }: { clientSecret: string }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          setMessage('Paiement réussi ! Merci pour votre achat.');
          break;
        case 'processing':
          setMessage(
            'Votre paiement est en cours de traitement. Veuillez patienter.'
          );
          break;
        case 'requires_payment_method':
          break;
        default:
          setMessage(
            'Une erreur est survenue lors du paiement. Veuillez réessayer ou contacter notre service client.'
          );
          break;
      }
    });
  }, [stripe, clientSecret]);

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/settings`,
      },
    });

    if (
      (error.type === 'card_error' || error.type === 'validation_error') &&
      error.message
    ) {
      setMessage(error.message);
    } else {
      setMessage(
        'Une erreur est survenue lors du paiement. Veuillez réessayer ou contacter notre service client.'
      );
    }

    setIsLoading(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: 'tabs',
  };

  const addressElementOptions: StripeAddressElementOptions = {
    mode: 'shipping',
  };

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold mb-4">Adresse de livraison</h2>
        <AddressElement options={addressElementOptions} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Informations de paiement</h2>
        <PaymentElement options={paymentElementOptions} className="mb-4" />
        <CartFooter withSubmit={false} />
        <Button
          disabled={isLoading || !stripe || !elements}
          className="w-full mt-4 gap-2"
          onClick={handleSubmit}
        >
          <ShieldCheck />
          Procéder au paiement
        </Button>
        <Note message={message} className="mt-4" />
      </div>
    </>
  );
};

export const Payment = () => {
  const [clientSecret, setClientSecret] = React.useState('');
  const { resolvedTheme } = useTheme();
  const cartItems = useCartItems();
  const cartTotal = useCartTotal();

  React.useEffect(() => {
    if (!cartTotal || !cartItems) {
      return;
    }

    intent({
      cartTotal,
      cartItems,
    }).then((data) => setClientSecret(data.clientSecret || ''));
  }, [cartTotal, cartItems]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: resolvedTheme === 'dark' ? 'night' : 'stripe',
    },
    locale: 'fr',
  };

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold mb-4">Votre commande</h2>
        <CartContent isImmutable />
      </div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise} key={clientSecret}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </>
  );
};
