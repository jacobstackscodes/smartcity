import { pollutionUnits } from '@/lib/utils';
import { PollutantsConcentration } from '@/types/google-aqi';

type Props = {
    data: PollutantsConcentration[] | undefined;
};

export const AQIPollutants = ({ data }: Props) => {
    const pollutants =
        data
            ?.sort((a, b) => b.concentration.value - a.concentration.value)
            .map((pollutant) => ({
                name: pollutant.displayName,
                description: pollutant.fullName,
                value: pollutant.concentration.value,
                unit: pollutionUnits(pollutant.concentration.units),
            })) || [];

    return (
        <div className="px-20">
            <h4 className="mb-4 text-lg font-semibold text-black">
                Pollutants
            </h4>
            <div className="grid grid-cols-12 gap-2">
                {pollutants.map((pollutant, index) => (
                    <div
                        key={index}
                        className="col-span-3 rounded-md border border-border bg-card px-4 py-3"
                    >
                        <div className="mb-4 flex flex-col gap-1">
                            <h5 className="text-base/none text-black">
                                {pollutant.name}
                            </h5>
                            <span className="text-sm/none text-gray-500">
                                {pollutant.description}
                            </span>
                        </div>
                        <p className="text-lg font-semibold text-black">
                            {pollutant.value} {pollutant.unit}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
