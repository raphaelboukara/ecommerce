'use client';

import React, { useState, useTransition } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/schemas';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Error } from '@/components/ui/alert';
import { login } from '@/actions/login';

const OrSperator = () => (
  <div className="relative">
    <div className="absolute inset-0 flex items-center">
      <span className="w-full border-t" />
    </div>
    <div className="relative flex justify-center text-xs uppercase ">
      <span className="bg-background px-2 text-muted-foreground">Ou</span>
    </div>
  </div>
);

type AuthLoginFormProps = {
  redirectTo?: string;
};

export const AuthLoginForm = ({ redirectTo }: AuthLoginFormProps) => {
  const [error, setError] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      setError('');

      login(values, redirectTo).then((data) => {
        data?.error && setError(data.error);
      });
    });
  };

  const cardDescription = redirectTo?.includes('payments')
    ? "Pour garantir la protection de vos données personnelles et financières, une étape d'authentification est requise avant d'accéder à la page de paiement sécurisée."
    : 'Accédez à votre espace personnel et sécurisé';

  const buttonText = redirectTo?.includes('payments')
    ? 'Accédez à la page de paiement'
    : 'Accédez à votre espace personnel';

  return (
    <Card className="md:w-6/12 xl:w-4/12">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Authentification</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Error message={error} />
            <Button className="w-full" type="submit" disabled={isPending}>
              {buttonText}
            </Button>
          </form>
        </Form>
        <OrSperator />
        <Button variant="link" asChild disabled={isPending}>
          <a href={`/auth/register?from=${redirectTo}`}>
            Cliquez ici pour créer un nouveau compte.
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};
