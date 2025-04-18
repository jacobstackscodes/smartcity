'use client';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { useEffect, useState } from 'react';

export const AvailabilityChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/api/insights/availablity-vs-crime')
            .then((res) => res.json())
            .then(setData);
    }, []);

    return (
        <div className="rounded-xl bg-white p-4 shadow">
            <h2 className="mb-4 text-xl font-semibold">
                Availability vs Crime (by Area)
            </h2>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data}>
                    <XAxis dataKey="location" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                        dataKey="readyToMoveCount"
                        fill="#82ca9d"
                        name="Ready to Move"
                    />
                    <Bar
                        dataKey="crimeCount"
                        fill="#ff6961"
                        name="Crime Reports"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
