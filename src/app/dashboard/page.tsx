import { AQIMap } from '@/components/dashboard/aqi-map';
import { Search } from '@/components/dashboard/search';
import { Card } from '@/components/ui/card';

export default async function Page({ searchParams }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const city = (await searchParams).city as string;
    
    return (
        <>
            <div className="absolute top-0 left-0 z-0 h-dvh w-dvw bg-gradient-to-r from-gray-500 to-gray-400">
                <AQIMap />
            </div>
            <Card className="absolute inset-x-0 bottom-16 z-5 mx-auto max-w-2xl flex flex-col gap-1 rounded-xl shadow-lg shadow-black">

                <div className='p-1'>
                    <Search value={city ?? "Bangalore"} />
                </div>
                <div className='w-full h-px bg-input' />
                <div className='grid grid-cols-4 p-1'>
                    <div className="col-span-1 bg-emerald-500 p-4 rounded-lg">
                        <div className='flex flex-col gap-2 items-center text-white'>
                            <span className='text-xl/none font-semibold'>120</span>
                            <span className='text-sm/none'>AQI&apos; US</span>
                        </div>
                    </div>
                    <div className="col-span-1"></div>
                    <div className="col-span-1"></div>
                    <div className="col-span-1"></div>
                </div>
            </Card>
        </>
    );
}
