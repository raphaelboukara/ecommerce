import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Veuillez entrer un email valide',
  }),
  password: z.string().min(1, {
    message: 'Veuillez entrer votre mot de passe',
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Veuillez entrer un email valide',
  }),
  password: z.string().min(6, {
    message: 'Veuillez entrer un mot de passe valide (minimum 5 caractères)',
  }),
});
