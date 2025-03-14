type Props = {
    data:
        | {
              generalPopulation: string;
              elderly: string;
              lungDiseasePopulation: string;
              heartDiseasePopulation: string;
              athletes: string;
              pregnantWomen: string;
              children: string;
          }
        | undefined;
};

type CardProps = {
    title: string;
    children: React.ReactNode;
};

const Card = ({ title, children }: CardProps) => {
    return (
        <div className="space-y-4 rounded-md border border-border bg-card px-4 py-3">
            <h5 className="text-base/none text-black">{title}</h5>
            <p className="text-sm text-gray-500">{children}</p>
        </div>
    );
};

export const AQIAdvisory = ({ data }: Props) => {
    return (
        <section className="px-20">
            <h4 className="mb-4 text-lg font-semibold text-black">Advisory</h4>
            <ul className="space-y-2 pl-6">
                <li className="list-disc">
                    <span className="font-semibold">General Population: </span>
                    <span>{data?.generalPopulation}</span>
                </li>
                <li className="list-disc">
                    <span className="font-semibold">Elderly: </span>
                    <span>{data?.elderly}</span>
                </li>
                <li className="list-disc">
                    <span className="font-semibold">
                        Lung Disease Population:{' '}
                    </span>
                    <span>{data?.lungDiseasePopulation}</span>
                </li>
                <li className="list-disc">
                    <span className="font-semibold">
                        Heart Disease Population:{' '}
                    </span>
                    <span>{data?.heartDiseasePopulation}</span>
                </li>
                <li className="list-disc">
                    <span className="font-semibold">Athletes: </span>
                    <span>{data?.athletes}</span>
                </li>
                <li className="list-disc">
                    <span className="font-semibold">Pregnant Women: </span>
                    <span>{data?.pregnantWomen}</span>
                </li>
                <li className="list-disc">
                    <span className="font-semibold">Children: </span>
                    <span>{data?.children}</span>
                </li>
            </ul>
        </section>
    );
};
