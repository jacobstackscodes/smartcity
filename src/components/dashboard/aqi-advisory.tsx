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
            <div className="grid grid-cols-2 gap-2">
                <Card title="General Population">
                    {data?.generalPopulation}
                </Card>
                <Card title="Elderly">{data?.elderly}</Card>
                <Card title="Lung Disease Population">
                    {data?.lungDiseasePopulation}
                </Card>
                <Card title="Heart Disease Population">
                    {data?.heartDiseasePopulation}
                </Card>
                <Card title="Athletes">{data?.athletes}</Card>
                <Card title="Pregnant Women">{data?.pregnantWomen}</Card>
                <Card title="Children">{data?.children}</Card>
            </div>
        </section>
    );
};
