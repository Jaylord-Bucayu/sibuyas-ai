import {ThemeToggle} from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { UserNav } from './user-nav';
import { Shield } from 'lucide-react';

export default function Header() {
  return (
    <header className="inset-x-0 top-0 w-full border-b">
      <nav className="w-full flex items-center justify-between px-8 py-2">
      <div className='flex gap-1 items-center  p-2 rounded-md'><Shield /> <h2 className='font-semibold'> OnionGuard AI</h2></div>
        <div className="flex items-center gap-2">
          <UserNav />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}