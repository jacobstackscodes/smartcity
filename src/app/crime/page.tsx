import { Crime } from "@/types/crime";

const getCrimeData = async (): Promise<Crime[]> => {
  const res = await fetch("http://localhost:3000/api/crime/common");
  return res.json();
};

export default async function CrimePage() {
  const crimeStats = await getCrimeData();

  return (
    <div>
      <h2>Most Common Crimes</h2>
      <ul>
        {crimeStats.map((crime, index) => (
          <li key={index}>{crime._id}: {crime.count}</li>
        ))}
      </ul>
    </div>
  );
}
