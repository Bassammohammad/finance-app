'use client';
import { useState } from 'react';
import { NavButton } from './navButton';
import { usePathname, useRouter } from 'next/navigation';
import { useMedia } from 'react-use';
import { Sheet, SheetTrigger, SheetContent } from './ui/sheet';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLink = [
  {
    href: '/',
    label: 'Overview',
  },
  {
    href: '/transactions',
    label: 'Transactions',
  },
  {
    href: '/accounts',
    label: 'Accounts',
  },
  {
    href: '/categories',
    label: 'Categories',
  },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMedia('(max-width: 1024px)', false);

  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Button className="font-normal bg-white/10 hover:bg-white/20 border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition ">
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side={'left'} className="px-2 bg-white ">
          <nav className="flex flex-col gap-y-2 pt-6 ">
            {navLink.map((item) => (
              <Button
                variant={'ghost'}
                key={item.href}
                onClick={() => onClick(item.href)}
                className={cn(
                  'justify-start hover:bg-neutral-500/10',
                  item.href === pathname ? 'bg-neutral-500/20' : ''
                )}
              >
                {item.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className=" hidden lg:flex gap-x-4 px-8 ">
      {navLink.map((nav) => (
        <NavButton
          key={nav.href}
          href={nav.href}
          label={nav.label}
          isActive={pathname === nav.href}
        />
      ))}
    </div>
  );
};
