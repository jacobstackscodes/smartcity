'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import debounce from 'lodash.debounce';
import { useCallback } from 'react';

export const Search = () => {
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
            className="h-12 w-full rounded-t-xl px-4 py-2 transition-[box-shadow] duration-300 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
            type="text"
            placeholder="Search..."
            onChange={(e) => {
                onSearch(e.target.value);
            }}
        />
    );
};
