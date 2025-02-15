'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
    href: string;
    children: React.ReactNode;
};

export const NavItem = ({ href, children }: Props) => {
    const pathname = usePathname();

    return (
        <Link
            className={cn(
                'rounded-md px-4 py-2 font-medium transition-[background] duration-300 hover:bg-white/20',
                pathname === href && 'bg-white/20',
            )}
            href={href}
        >
            {children}
        </Link>
    );
};
