'use client';

import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

export type RegionCrimePriceData = {
    region: string;
    averagePrice: number;
    crimeCount: number;
    houseCount: number;
};

export const RegionCrimePriceChart = ({
    data,
}: {
    data: RegionCrimePriceData[];
}) => {
    return (
        <div className="h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                    margin={{ top: 20, right: 40, bottom: 60, left: 40 }}
                >
                    <CartesianGrid />
                    <XAxis
                        type="number"
                        dataKey="averagePrice"
                        name="Average Price"
                        unit="L"
                        label={{
                            value: 'Average Price (Lakh)',
                            position: 'bottom',
                            offset: -10,
                        }}
                    />
                    <YAxis
                        type="number"
                        dataKey="crimeCount"
                        name="Crime Count"
                        label={{
                            value: 'Crime Count',
                            angle: -90,
                            position: 'insideLeft',
                        }}
                    />
                    <ZAxis
                        type="number"
                        dataKey="houseCount"
                        range={[60, 400]}
                        name="House Count"
                    />
                    <Tooltip
                        cursor={{ strokeDasharray: '3 3' }}
                        formatter={(value: number, name: string) => {
                            return name === 'Average Price'
                                ? `${value.toFixed(2)} L`
                                : value;
                        }}
                        labelFormatter={() => ''}
                    />
                    <Legend />
                    <Scatter name="Regions" data={data} fill="#8884d8" />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
};
