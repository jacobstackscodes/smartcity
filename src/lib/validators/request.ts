import { z } from 'zod';
import { location } from '.';

const currentValidator = z.object({ location });

const forecastValidator = z.object({
    location,
    period: z.object(
        {
            startTime: z.string({
                required_error: 'Start time is required',
                invalid_type_error: 'Start time must be a string',
            }),
            endTime: z.string({
                required_error: 'End time is required',
                invalid_type_error: 'End time must be a string',
            }),
        },
        {
            required_error: 'Period is required',
            invalid_type_error: 'Period must be an object',
        },
    ),
});

type CurrentProps = z.infer<typeof currentValidator>;
type ForecastProps = z.infer<typeof forecastValidator>;

export { forecastValidator, currentValidator };
export type { ForecastProps, CurrentProps };
