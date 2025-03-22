'use client';

import { useSearch } from '@/lib/hooks/use-search';

export const Search = () => {
    const { value, handleChange, handleSearch } = useSearch();

    return (
        <section className="flex items-center gap-2 border-y border-border px-20 py-2">
            <input
                type="text"
                className="h-10 grow outline-none"
                placeholder="Search a locality inside Bangalore"
                value={value}
                onChange={handleChange}
                onKeyDown={handleSearch}
            />
            <button
                type="button"
                className="inline-flex h-12 min-w-36 cursor-pointer items-center justify-center gap-2.5 rounded-md bg-emerald-600 px-4 text-white transition-[background] duration-300 hover:bg-emerald-700"
                onClick={handleSearch}
            >
                <i className="ri-search-line"></i>
                Search
            </button>
        </section>
    );
};
