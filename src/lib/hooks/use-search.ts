import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useCallback, useMemo } from 'react';

export const useSearch = (initialValue?: string | null) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [value, setValue] = useState(initialValue ?? '');

    const createQueryString = useMemo(
        () => (name: string, value: string) => {
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

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
        [],
    );
    const handleSearch = useCallback(
        () => router.push(`${pathname}?${createQueryString('city', value)}`),
        [router, pathname, createQueryString, value],
    );

    return {
        value,
        handleChange,
        handleSearch,
    };
};
