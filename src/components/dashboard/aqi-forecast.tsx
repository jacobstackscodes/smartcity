'use client';

import { useDragScroll } from '@/lib/hooks/use-drag-scroll';
import { aqiStatus, cn } from '@/lib/utils';
import { format } from 'date-fns';

type ItemProps = {
    aqi: number;
    time?: string;
};

type Props = {
    data: ForecastResponse;
};

const ForecastItem = ({ aqi, time = '0:00' }: ItemProps) => {
    const aqi_state = aqiStatus(aqi);

    return (
        <div className="flex min-h-23 flex-col justify-center gap-2 p-2.5 text-center">
            <span className="text-sm whitespace-nowrap text-black">{time}</span>
            <div
                className={cn('rounded px-2 py-1 text-sm', {
                    'bg-good text-black': aqi_state === 'good',
                    'bg-moderate text-black': aqi_state === 'moderate',
                    'bg-sensitive text-black': aqi_state === 'sensitive',
                    'bg-unhealthy text-white': aqi_state === 'unhealthy',
                    'bg-very-unhealthy text-white':
                        aqi_state === 'very-unhealthy',
                    'bg-hazardous text-white': aqi_state === 'hazardous',
                })}
            >
                {aqi}
            </div>
        </div>
    );
};

export const AQIForecast = ({ data }: Props) => {
    const dragscrollRef = useDragScroll({ speed: 0.7 });
    const today = format(new Date(), 'dd MMM');

    return (
        <div
            className="relative scrollbar-none flex cursor-grab flex-nowrap gap-2 overflow-x-auto active:cursor-grabbing"
            ref={dragscrollRef}
        >
            {data?.map((day, index) => (
                <div
                    key={index}
                    className="flex flex-col items-start justify-center gap-2"
                >
                    <h6 className="sticky top-0 left-0 text-sm font-semibold text-black">
                        {day.date === today ? 'Today' : day.date}
                    </h6>
                    <div className="flex shrink-0 grow divide-x divide-border overflow-hidden rounded-md border border-border">
                        {day.data?.map((item) => (
                            <ForecastItem
                                key={item.time}
                                aqi={item.aqi}
                                time={item.time}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
