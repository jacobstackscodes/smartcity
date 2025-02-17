import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useCallback, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';

export const useDebouncedSearch = (initialValue: string | undefined) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [value, setValue] = useState(initialValue ?? '');

    // Function to create the query string
    const createQueryString = useMemo(() => (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(name, value);
        } else {
            params.delete(name);
        }
        return params.toString();
    }, [searchParams]);

    // Create debounced search function
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onSearch = useCallback(
        debounce((searchValue: string) => {
            router.push(`${pathname}?${createQueryString('city', searchValue)}`);
        }, 500),
        [router, pathname, createQueryString]
    );

    // Handle input change and trigger debounced search
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        onSearch(newValue); // Trigger the debounced search
    };

    // Cleanup the debounced function when the component unmounts
    useEffect(() => {
        return () => {
            onSearch.cancel(); // Cancel any pending debounced calls when the component unmounts
        };
    }, [onSearch]);

    return {
        value,
        handleChange,
    };
};
