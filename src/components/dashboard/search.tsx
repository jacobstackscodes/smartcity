'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import debounce from 'lodash.debounce';
import { useCallback } from 'react';
import { cn } from '@/lib/utils';

type Props = {
    value?: string | undefined;
    className?: string;
};

export const Search = ({ className, value }: Props) => {
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
        <div className='relative flex'>
            <i className='absolute left-3 inset-y-0 size-fit ri-search-line text-lg text-foreground/70 pointer-events-none my-auto' />
            <input
                className={cn(
                    'h-10 w-full rounded-lg pl-11 pr-3 py-2 text-xl font-semibold text-black transition-all duration-300 outline-none focus:ring-2 focus:ring-black focus:pl-10 focus:text-base focus:font-normal',
                    className,
                )}
                type="text"
                value={value || ''}
                placeholder="Search city or locality..."
                onChange={(e) => {
                    onSearch(e.target.value);
                }}
            />
        </div>
    );
};
