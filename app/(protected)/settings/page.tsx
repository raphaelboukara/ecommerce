import React from 'react';
import { Button } from '@/components/ui/button';
import { auth, signOut } from '@/auth';

export default async function SettingsPage() {
  const session = await auth();

  const handleClick = async () => {
    'use server';
    await signOut();
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-3xl font-semibold">Settings Page</h2>
      <blockquote className="mt-6 mb-6">
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </blockquote>
      <form action={handleClick}>
        <Button variant="destructive" type="submit">
          Sign Out
        </Button>
      </form>
    </div>
  );
}
