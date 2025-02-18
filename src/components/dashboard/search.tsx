'use client';

import { cn } from '@/lib/utils';
import { useDebouncedSearch } from '@/lib/hooks/use-debounced-search';

type Props = {
    value?: string | undefined;
    className?: string;
};

export const Search = ({ className, value: initialValue }: Props) => {
    const { value, handleChange } = useDebouncedSearch(initialValue);

    return (
        <div className="relative flex">
            <i className="absolute left-3 inset-y-0 size-fit ri-search-line text-lg text-foreground/70 pointer-events-none my-auto" />
            <input
                className={cn(
                    'h-10 w-full rounded-lg pl-11 pr-3 py-2 text-xl font-semibold text-black transition-all duration-300 outline-none focus:ring-2 focus:ring-black focus:pl-10 focus:text-base focus:font-normal',
                    className
                )}
                type="text"
                defaultValue={value}
                placeholder="Search city..."
                onChange={handleChange}
            />
        </div>
    );
};
