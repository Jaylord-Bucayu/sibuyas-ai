import Header from '@/layout/header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Onion Guard AI',
  description: 'Onion Guard AI'
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return ( 
      <main className="w-full flex-1 overflow-hidden">
        <Header />
        {children}
      </main>

  );
}