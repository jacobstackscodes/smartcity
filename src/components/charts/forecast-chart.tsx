import axios from 'axios';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

type Props = {
    location?: {
        latitude: number;
        longitude: number;
    };
    dateTime?: string;
};

const ForecastChart = ({
    location = {
        latitude: 37.4125333,
        longitude: -122.0840937,
    },
    dateTime = '2024-02-09T08:00:00Z',
}: Props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchAQI = async () => {
            try {
                const { data } = await axios.post(
                    `https://airquality.googleapis.com/v1/forecast:lookup?key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`,
                    {
                        location,
                        dateTime,
                    },
                );

                setData(data);
            } catch (error) {
                console.error('Error fetching AQI data:', error);
            }
        };

        fetchAQI();
    }, [location, dateTime]);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="0%"
                            stopColor="#ff5733"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="100%"
                            stopColor="#ff5733"
                            stopOpacity={0.2}
                        />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="date"
                    tick={{ fill: '#888' }}
                    tickLine={false}
                />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="aqi"
                    stroke="url(#gradient)"
                    strokeWidth={3}
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default ForecastChart;
