'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';

import { RegisterSchema } from '@/schemas';
import { login } from '@/actions/login';

export const register = async (
  values: z.infer<typeof RegisterSchema>,
  redirectTo: string | undefined
) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error:
        "L'adresse e-mail que vous avez saisie est déjà associée à un compte. Veuillez utiliser une autre adresse e-mail ou vous connecter si vous avez déjà un compte.",
    };
  }

  await db.user.create({
    data: {
      email,
      password: await bcrypt.hash(password, 10),
    },
  });

  return await login({ email, password }, redirectTo);
};
