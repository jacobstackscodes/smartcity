'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import debounce from 'lodash.debounce';
import { useCallback } from 'react';
import { cn } from '@/lib/utils';

type Props = {
    className?: string;
};

export const Search = ({ className }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set(name, value);
            } else {
                params.delete(name);
            }

            return params.toString();
        },
        [searchParams],
    );

    const onSearch = debounce((value: string) => {
        router.push(pathname + '?' + createQueryString('city', value));
    }, 500);

    return (
        <input
            className={cn(
                'h-10 w-full rounded-lg px-4 py-2 text-sm transition-[box-shadow] duration-300 outline-none focus:ring-2 focus:ring-black focus:ring-inset',
                className,
            )}
            type="text"
            placeholder="Search city or locality..."
            onChange={(e) => {
                onSearch(e.target.value);
            }}
        />
    );
};
