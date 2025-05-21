import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export type CrimeByCity = {
    _id: string;
    count: number;
};

export const CrimeCountByCityChart = ({ data }: { data: CrimeByCity[] }) => (
    <div className="h-[500px] w-full">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" angle={-45} textAnchor="end" interval={0} height={100} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Crime Count" />
            </BarChart>
        </ResponsiveContainer>
    </div>
);