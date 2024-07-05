import React from 'react';
import { AuthLoginForm } from '@/components/auth-login-form';

type LoginPageProps = {
  searchParams: {
    from?: string;
  };
};

export default function LoginPage({ searchParams: { from } }: LoginPageProps) {
  return (
    <>
      <AuthLoginForm redirectTo={from} />
    </>
  );
}
