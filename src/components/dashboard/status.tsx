import { cn } from '@/lib/utils';
import { Index } from '@/types/google-aqi';

type Props = {
    className?: string;
    data: Pick<Index, 'aqi' | 'displayName'> | undefined;
};

export const Status = ({ className, data }: Props) => {
    const { displayName, aqi } = data || { displayName: 'N/A', aqi: 0 };

    const categories = [
        {
            limit: 50,
            name: 'good',
            text: 'Good',
            bg: 'bg-good',
            muted: 'bg-good-muted',
        },
        {
            limit: 100,
            name: 'moderate',
            text: 'Moderate',
            bg: 'bg-moderate',
            muted: 'bg-moderate-muted',
        },
        {
            limit: 150,
            name: 'sensitive',
            text: 'Unhealthy for sensitive groups',
            bg: 'bg-sensitive',
            muted: 'bg-sensitive-muted',
        },
        {
            limit: 200,
            name: 'unhealthy',
            text: 'Unhealthy',
            bg: 'bg-unhealthy',
            muted: 'bg-unhealthy-muted',
            textColor: 'text-white',
        },
        {
            limit: 300,
            name: 'veryUnhealthy',
            text: 'Very Unhealthy',
            bg: 'bg-very-unhealthy',
            muted: 'bg-very-unhealthy-muted',
            textColor: 'text-white',
        },
        {
            limit: 500,
            name: 'hazardous',
            text: 'Hazardous',
            bg: 'bg-hazardous',
            muted: 'bg-hazardous-muted',
            textColor: 'text-white',
        },
    ];

    const { bg, muted, text, textColor } = categories.find(
        ({ limit }) => aqi <= limit,
    )!;

    return (
        <div
            className={cn(
                'flex items-center gap-4 rounded-lg p-2 text-black',
                muted,
                textColor,
                className,
            )}
        >
            <div
                className={cn(
                    'flex w-26 shrink-0 flex-col items-center gap-1 rounded-md px-2 py-3',
                    bg,
                )}
            >
                <span className="text-xl/none">{aqi}</span>
                <span className="text-sm/none font-light">{displayName}</span>
            </div>
            <div className="grow text-base/none font-light">{text}</div>
        </div>
    );
};
