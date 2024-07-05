'use server';

import * as z from 'zod';
import { AuthError } from 'next-auth';

import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';

export const login = async (
  values: z.infer<typeof LoginSchema>,
  redirectTo: string | undefined = '/'
) => {
  try {
    return await signIn('credentials', {
      ...values,
      redirectTo,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            error:
              "Échec de l'authentification. Veuillez vérifier votre e-mail et votre mot de passe, puis réessayer.",
          };

        default:
          return {
            error: `Échec de l'authentification. Veuillez réessayer et contacter le support en cas d'échec: ${error.type}.`,
          };
      }
    }

    throw error;
  }
};
