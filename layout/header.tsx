import {ThemeToggle} from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { UserNav } from './user-nav';

export default function Header() {
  return (
    <header className="inset-x-0 top-0 w-full border-b">
      <nav className="w-full flex items-center justify-between px-8 py-2">
            <h2>Onion Ai</h2>
        <div className="flex items-center gap-2">
          <UserNav />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}