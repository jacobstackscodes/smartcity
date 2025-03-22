import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useCallback, useMemo } from 'react';

export const useSearch = (key: string = 'search') => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const initialValue = searchParams.get(key) || '';
    const [value, setValue] = useState(initialValue);

    const createQueryString = useCallback(
        (value: string) => {
            const params = new URLSearchParams(searchParams);
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
            return params.toString();
        },
        [searchParams, key],
    );

    const searchUrl = useMemo(
        () => `${pathname}?${createQueryString(value)}`,
        [pathname, createQueryString, value],
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
        [],
    );
    const handleSearch = useCallback(
        (
            e:
                | React.KeyboardEvent<HTMLInputElement>
                | React.MouseEvent<HTMLButtonElement>,
        ) => {
            if ('key' in e && e.key !== 'Enter') return;
            router.push(searchUrl, { scroll: false });
        },
        [router, searchUrl],
    );

    return {
        value,
        handleChange,
        handleSearch,
    };
};
