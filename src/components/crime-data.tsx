"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Crime } from "@/types/crime";

const CrimeData = () => {
  const [crimeStats, setCrimeStats] = useState<Crime[]>([]);

  useEffect(() => {
    axios.get("/api/crime/common")
      .then((response) => setCrimeStats(response.data))
      .catch((error) => console.error("Error fetching crime data:", error));
  }, []);

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
};

export default CrimeData;
