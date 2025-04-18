import { connectToDB } from '@/server/mongoose';
import House from '@/server/schema/houses'; // uses housedata collection
import Crime from '@/server/schema/crime'; // uses crimedata collection
import { NextResponse } from 'next/server';

type LocationData = {
    [key: string]: any;
};

const normalize = (str: string) => str.trim().toLowerCase();

export async function GET() {
    try {
        await connectToDB();

        // Step 1: Fetch and log raw house data
        const houseCount = await House.countDocuments();
        console.log(`Total houses in collection: ${houseCount}`);
        if (houseCount === 0) {
            return NextResponse.json(
                { message: 'No houses found in the database' },
                { status: 404 },
            );
        }

        // Step 2: Group houses by location and areaType
        const houseTypes = await House.aggregate([
            {
                $group: {
                    _id: { location: '$location', area_type: '$areaType' }, // Use areaType per schema
                    count: { $sum: 1 },
                },
            },
        ]);
        console.log('House aggregation result:', houseTypes);

        // Step 3: Create and log typeMap
        const typeMap: Record<string, string> = {};
        houseTypes.forEach(({ _id }) => {
            const location = normalize(_id.location);
            typeMap[location] = _id.area_type;
        });
        console.log('typeMap:', typeMap);

        // Step 4: Fetch and log raw crime data
        const crimeCount = await Crime.countDocuments();
        console.log(`Total crimes in collection: ${crimeCount}`);
        if (crimeCount === 0) {
            return NextResponse.json(
                { message: 'No crimes found in the database' },
                { status: 404 },
            );
        }

        // Step 5: Group crimes by city and crimeDescription
        const crimes = await Crime.aggregate([
            {
                $group: {
                    _id: {
                        city: '$city',
                        crimeDescription: '$crimeDescription',
                    },
                    count: { $sum: 1 },
                },
            },
        ]);
        console.log('Crime aggregation result:', crimes);

        // Step 6: Combine data into result object
        const result: LocationData = {};
        crimes.forEach(({ _id, count }) => {
            const city = normalize(_id.city);
            const crimeDescription = _id.crimeDescription;
            const areaType = typeMap[city];
            if (!areaType) {
                console.log(`No areaType found for city: ${city}`);
                return;
            }

            if (!result[areaType]) {
                result[areaType] = { propertyType: areaType };
            }
            result[areaType][crimeDescription] =
                (result[areaType][crimeDescription] || 0) + count;
        });
        console.log('Final result object:', result);

        // Step 7: Return the combined result
        const response = Object.values(result);
        if (response.length === 0) {
            console.log(
                'Response is empty. Check if Crime.city matches House.location.',
            );
        }
        return NextResponse.json(response);
    } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        );
    }
}
