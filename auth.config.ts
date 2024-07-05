import bcrypt from 'bcryptjs';
import Credentials from 'next-auth/providers/credentials';
import { CredentialsSignin, type NextAuthConfig } from 'next-auth';

import { LoginSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validateFields = LoginSchema.safeParse(credentials);
        if (validateFields.success) {
          const { email, password } = validateFields.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) {
            throw new CredentialsSignin();
          }

          if (await bcrypt.compare(password, user.password)) {
            return user;
          }

          throw new CredentialsSignin();
        }
        throw new CredentialsSignin();
      },
    }),
  ],
} satisfies NextAuthConfig;
