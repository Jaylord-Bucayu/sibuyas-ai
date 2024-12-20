'use client';
import React from 'react';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { ThemeProvider } from '@/components/theme-provider';

export default function Providers({
  children
}: {
  session: SessionProviderProps['session'];
  children: React.ReactNode;
}) {
  return (
    <>
     <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider>
          {children}
          </SessionProvider>
      </ThemeProvider>

    </>
  );
}

