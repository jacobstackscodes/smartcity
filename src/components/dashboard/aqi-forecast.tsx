'use client';

import { useDragScroll } from '@/lib/hooks/use-drag-scroll';
import { aqiStatus, cn } from '@/lib/utils';

type ItemProps = {
    aqi: number;
    time?: string;
};

const ForecastItem = ({ aqi, time = '0:00' }: ItemProps) => {
    const aqi_state = aqiStatus(aqi);

    return (
        <div className="h-23 px-2.5 py-4 text-center">
            <span className="text-sm text-black">{time}</span>
            <div
                className={cn(
                    'flex h-7 w-14 items-center justify-center rounded text-sm',
                    {
                        'bg-good text-black': aqi_state === 'good',
                        'bg-moderate text-black': aqi_state === 'moderate',
                        'bg-sensitive text-black': aqi_state === 'sensitive',
                        'bg-unhealthy text-white': aqi_state === 'unhealthy',
                        'bg-very-unhealthy text-white':
                            aqi_state === 'very-unhealthy',
                        'bg-hazardous text-white': aqi_state === 'hazardous',
                    },
                )}
            >
                {aqi}
            </div>
        </div>
    );
};

export const AQIForecast = () => {
    const dragscrollRef = useDragScroll({ speed: 0.7 });

    return (
        <section className="px-20">
            <h4 className="mb-4 text-lg font-semibold text-black">
                Hourly Forecast
            </h4>
            <div
                className="scrollbar-none flex cursor-grab flex-nowrap gap-2 overflow-x-auto active:cursor-grabbing"
                ref={dragscrollRef}
            >
                <div className="flex flex-col items-start justify-center gap-2">
                    <h6 className="text-sm font-semibold text-black">Today</h6>
                    <div className="flex shrink-0 grow divide-x divide-border overflow-hidden rounded-md border border-border">
                        <ForecastItem aqi={80} time="1:00" />
                        <ForecastItem aqi={190} time="2:00" />
                        <ForecastItem aqi={200} time="3:00" />
                        <ForecastItem aqi={210} time="4:00" />
                    </div>
                </div>
                <div className="flex flex-col items-start justify-center gap-2">
                    <h6 className="text-sm font-semibold text-black">
                        21st Feb, 2025
                    </h6>
                    <div className="flex shrink-0 grow divide-x divide-border overflow-hidden rounded-md border border-border">
                        <ForecastItem aqi={220} time="5:00" />
                        <ForecastItem aqi={230} time="6:00" />
                        <ForecastItem aqi={240} time="7:00" />
                        <ForecastItem aqi={250} time="8:00" />
                        <ForecastItem aqi={260} time="9:00" />
                        <ForecastItem aqi={270} time="10:00" />
                        <ForecastItem aqi={280} time="11:00" />
                        <ForecastItem aqi={290} time="12:00" />
                        <ForecastItem aqi={300} time="13:00" />
                        <ForecastItem aqi={310} time="14:00" />
                        <ForecastItem aqi={320} time="15:00" />
                        <ForecastItem aqi={330} time="16:00" />
                        <ForecastItem aqi={340} time="17:00" />
                        <ForecastItem aqi={350} time="18:00" />
                        <ForecastItem aqi={360} time="19:00" />
                        <ForecastItem aqi={370} time="20:00" />
                        <ForecastItem aqi={380} time="21:00" />
                        <ForecastItem aqi={390} time="22:00" />
                        <ForecastItem aqi={400} time="23:00" />
                        <ForecastItem aqi={410} time="24:00" />
                    </div>
                </div>
                <div className="flex flex-col items-start justify-center gap-2">
                    <h6 className="text-sm font-semibold text-black">
                        22nd Feb, 2025
                    </h6>
                    <div className="flex shrink-0 grow divide-x divide-border overflow-hidden rounded-md border border-border">
                        <ForecastItem aqi={220} time="5:00" />
                        <ForecastItem aqi={230} time="6:00" />
                        <ForecastItem aqi={240} time="7:00" />
                        <ForecastItem aqi={250} time="8:00" />
                        <ForecastItem aqi={260} time="9:00" />
                        <ForecastItem aqi={270} time="10:00" />
                        <ForecastItem aqi={280} time="11:00" />
                        <ForecastItem aqi={290} time="12:00" />
                        <ForecastItem aqi={300} time="13:00" />
                        <ForecastItem aqi={310} time="14:00" />
                        <ForecastItem aqi={320} time="15:00" />
                        <ForecastItem aqi={330} time="16:00" />
                        <ForecastItem aqi={340} time="17:00" />
                        <ForecastItem aqi={350} time="18:00" />
                        <ForecastItem aqi={360} time="19:00" />
                        <ForecastItem aqi={370} time="20:00" />
                        <ForecastItem aqi={380} time="21:00" />
                        <ForecastItem aqi={390} time="22:00" />
                        <ForecastItem aqi={400} time="23:00" />
                        <ForecastItem aqi={410} time="24:00" />
                    </div>
                </div>
            </div>
        </section>
    );
};
