import { cn } from '@/lib/utils';

interface Props {
    className?: string;
}

export const Skeleton = ({ className }: Props) => {
    return (
        <div
            className={cn(
                'min-h-4 animate-pulse overflow-hidden rounded-lg bg-muted',
                className,
            )}
        />
    );
};
