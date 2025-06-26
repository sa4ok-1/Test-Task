"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStudies = async () => {
    setLoading(true);
    const url = `https://clinicaltrials.gov/api/v2/studies?query.cond=${query}&countTotal=true&fields=protocolSection.identificationModule.nctId,protocolSection.identificationModule.briefTitle,protocolSection.conditionsModule.conditions&pageSize=10`;
    const res = await fetch(url);
    const data = await res.json();
    setResults(data.studies || []);
    setLoading(false);
  };

  useEffect(() => {
    if (query) fetchStudies();
  }, [query]);

  return (
    <main className="p-4 max-w-xl mx-auto">
      <input
        className="w-full mb-4 p-2 border border-gray-300 rounded"
        placeholder="Search by condition..."
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      <ul>
        {results.map((study, index) => (
          <li key={index} className="bg-white p-4 mb-4 rounded shadow">
            <h2 className="text-lg font-bold">
              {study.protocolSection.identificationModule.briefTitle}
            </h2>
            <p className="text-sm text-gray-600">
              Conditions:{" "}
              {study.protocolSection.conditionsModule.conditions?.join(", ")}
            </p>
            <p className="text-xs text-gray-400">
              NCT: {study.protocolSection.identificationModule.nctId}
            </p>
            <Link
              href={`/apply/${study.protocolSection.identificationModule.nctId}`}
              className="inline-block mt-2 text-blue-500"
            >
              Apply To Trial
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
