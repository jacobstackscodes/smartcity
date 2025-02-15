import { cn } from '@/lib/utils';
import type { Props } from '@/types/card';

const Card = ({ className, children }: Props.Card) => {
    return (
        <div
            className={cn(
                'rounded-md border border-border bg-white shadow-md',
                className,
            )}
        >
            {children}
        </div>
    );
};

const CardHeader = ({ className, children }: Props.Header) => {
    return (
        <div className={cn('flex flex-col gap-2 p-4', className)}>
            {children}
        </div>
    );
};

const CardTitle = ({ className, children }: Props.Title) => {
    return (
        <h2 className={cn('text-lg/none font-semibold', className)}>
            {children}
        </h2>
    );
};

const CardContent = ({ className, children }: Props.Content) => {
    return <div className={cn(className)}>{children}</div>;
};

export { Card, CardHeader, CardTitle, CardContent };
