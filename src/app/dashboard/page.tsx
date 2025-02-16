'use client';

import { AQIMap } from '@/components/dashboard/aqi-map';
import { Search } from '@/components/dashboard/search';
import { Card } from '@/components/ui/card';

export default function Page() {
    return (
        <>
            <div className="absolute top-0 left-0 z-0 h-dvh w-dvw bg-gradient-to-r from-gray-500 to-gray-400">
                <AQIMap />
            </div>
            <Card className="absolute inset-x-0 bottom-16 z-5 mx-auto flex max-w-2xl flex-col rounded-xl">
                <Search />
                <div className="grid grid-cols-4 p-2"></div>
            </Card>
        </>
    );
}
