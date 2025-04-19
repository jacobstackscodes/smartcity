import { db } from '@/server/mongoose';
import { Crime } from '@/server/schema/crime';
import { NextResponse } from 'next/server';

export async function GET() {
    return db(async () => {
        const results = await Crime.aggregate([
            // Parse date
            {
                $addFields: {
                    dateParsed: {
                        $dateFromString: {
                            dateString: '$dateOfOccurrence',
                            format: '%m-%d-%Y %H:%M',
                        },
                    },
                },
            },
            // Extract year and month
            {
                $addFields: {
                    year: { $year: '$dateParsed' },
                    month: { $month: '$dateParsed' },
                },
            },
            // Group by city to find top 10
            {
                $group: {
                    _id: '$city',
                    total: { $sum: 1 },
                },
            },
            { $sort: { total: -1 } },
            { $limit: 10 },
            {
                $project: {
                    _id: 0,
                    city: '$_id',
                },
            },
            // Lookup original crimes for those top cities
            {
                $lookup: {
                    from: 'crime', // your collection name
                    localField: 'city',
                    foreignField: 'city',
                    as: 'crimes',
                },
            },
            { $unwind: '$crimes' },
            // Re-parse dates from joined crimes
            {
                $addFields: {
                    dateParsed: {
                        $dateFromString: {
                            dateString: '$crimes.dateOfOccurrence',
                            format: '%m-%d-%Y %H:%M',
                        },
                    },
                },
            },
            {
                $addFields: {
                    year: { $year: '$dateParsed' },
                    month: { $month: '$dateParsed' },
                },
            },
            // Group by city/year/month
            {
                $group: {
                    _id: {
                        city: '$city',
                        year: '$year',
                        month: '$month',
                    },
                    count: { $sum: 1 },
                },
            },
            // Format the data for front-end use
            {
                $group: {
                    _id: '$_id.city',
                    trends: {
                        $push: {
                            year: '$_id.year',
                            month: '$_id.month',
                            count: '$count',
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    region: '$_id',
                    trends: 1,
                },
            },
            { $sort: { region: 1 } },
        ]);

        return NextResponse.json(results);
    });
}
