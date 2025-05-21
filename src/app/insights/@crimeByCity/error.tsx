'use client';

export default function Error({ error }: { error: Error }) {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-red-500">Error</h1>
            <p className="mt-4 text-lg text-gray-700">{error.message}</p>
            <p className="mt-2 text-sm text-gray-500">
                Please try again later or contact support.
            </p>
        </div>
    );
}
