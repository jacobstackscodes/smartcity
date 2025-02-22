import { ZodError } from 'zod';
import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';
import { formatAxiosError, formatZodError } from './utils';

export const errorHandler = (error: unknown) => {
    if (error instanceof ZodError) {
        return NextResponse.json(formatZodError(error), { status: 400 });
    }

    if (error instanceof AxiosError) {
        return NextResponse.json(formatAxiosError(error), {
            status: error.response?.status || 500,
        });
    }

    return NextResponse.json(
        {
            error: 'Internal Server Error',
            message:
                error instanceof Error ? error.message : 'Something went wrong',
        },
        { status: 500 },
    );
};
