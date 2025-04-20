import { db } from '@/server/mongoose';
import { Crime } from '@/server/schema/crime';

function capitalize(input: string): string {
    if (!input || typeof input !== 'string') return 'Unknown';

    return input.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of every word
}

export async function GET() {
    const data: { count: number; crimeType: string }[] = (
        await db(() =>
            Crime.aggregate([
                {
                    $group: {
                        _id: '$crimeDescription',
                        count: { $sum: 1 },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        crimeType: '$_id',
                        count: 1,
                    },
                },
            ]),
        )
    ).map((item) => ({
        ...item,
        crimeType: capitalize(item.crimeType),
    }));

    return Response.json(data);
}
