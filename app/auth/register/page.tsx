import React from 'react';
import { AuthRegisterForm } from '@/components/auth-register-form';

type RegisterPageProps = {
  searchParams: {
    from?: string;
  };
};

export default function RegisterPage({
  searchParams: { from },
}: RegisterPageProps) {
  return <AuthRegisterForm redirectTo={from} />;
}
