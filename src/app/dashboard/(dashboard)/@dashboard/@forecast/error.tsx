'use client';

export default function Error({ error, reset }: ErrorProps) {
    return (
        <section className="px-20">
            <h4 className="mb-4 text-lg font-semibold text-black">
                Hourly Forecast
            </h4>
            <div
                className="flex cursor-pointer items-center gap-2 rounded-md border border-error bg-error-bg p-4 text-error"
                onClick={reset}
                role="button"
            >
                <i className="ri-error-warning-line text-2xl" />
                <span className="text-sm/none font-semibold">
                    {error.message + '. Click to retry'}
                </span>
            </div>
        </section>
    );
}
