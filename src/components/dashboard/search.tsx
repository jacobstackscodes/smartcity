'use client';

import { cn } from '@/lib/utils';
import { useSearch } from '@/lib/hooks/use-search';

type Props = {
    value?: string | undefined;
    className?: string;
};

export const Search = ({ className, value: initialValue }: Props) => {
    const { value, handleChange, handleSearch } = useSearch(initialValue);

    return (
        <div className="relative flex">
            <i className="ri-search-line pointer-events-none absolute inset-y-0 left-3 my-auto size-fit text-lg text-foreground/70" />
            <input
                className={cn(
                    'h-10 w-full rounded-lg py-2 pr-33 pl-11 text-xl font-semibold text-black transition-all duration-300 outline-none focus:pl-10 focus:text-base focus:font-normal focus:ring-2 focus:ring-black',
                    className,
                )}
                type="text"
                defaultValue={value}
                placeholder="Search city..."
                onChange={handleChange}
            />
            <button
                className="absolute top-0 right-0 z-2 h-10 min-w-30 cursor-pointer rounded-md bg-emerald-600 px-4 text-white transition-[background] duration-300 hover:bg-emerald-700"
                type="button"
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    );
};
