import { Status } from '../status';
import { cn } from '@/lib/utils';
import { Index } from '@/types/google-aqi';
import { memo } from 'react';

type Props = {
    address: string | undefined;
    data: Index | undefined;
};

export const AQIHeader = memo(({ address, data }: Props) => {
    const gradientClass = data?.aqi
        ? cn({
              'bg-gradient-good': data.aqi <= 50,
              'bg-gradient-moderate': data.aqi > 50 && data.aqi <= 100,
              'bg-gradient-sensitive': data.aqi > 100 && data.aqi <= 150,
              'bg-gradient-unhealthy': data.aqi > 150 && data.aqi <= 200,
              'bg-gradient-very-unhealthy': data.aqi > 200 && data.aqi <= 300,
              'bg-gradient-hazardous': data.aqi > 300,
          })
        : '';

    return (
        <section
            className={cn(
                'flex flex-col gap-2 px-20 py-4 transition-[background] duration-1000',
                gradientClass,
            )}
        >
            <h2 className="mb-2 text-2xl font-semibold text-black">
                {address}
            </h2>
            <div className="grid grid-cols-12 gap-2">
                <Status className="col-span-3" data={data} />
            </div>
        </section>
    );
});
