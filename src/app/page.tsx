"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import StudyCard from "@/components/StudyCard";
import { Study } from "@/types";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get("q") || "";
  const [input, setInput] = useState(queryParam);
  const [studies, setStudies] = useState<Study[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      router.push(`/?q=${encodeURIComponent(input)}`);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [input]);

  useEffect(() => {
    if (!queryParam) return;

    const fetchStudies = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://clinicaltrials.gov/api/v2/studies?query.cond=${queryParam}&countTotal=true&fields=protocolSection.identificationModule.nctId,protocolSection.identificationModule.briefTitle,protocolSection.conditionsModule.conditions&pageSize=10`,
          { cache: "no-store" }
        );
        const data = await res.json();
        setStudies(data.studies || []);
      } catch (e) {
        console.error("Failed to fetch studies", e);
      } finally {
        setLoading(false);
      }
    };

    fetchStudies();
  }, [queryParam]);

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
          🔍 Search Clinical Trials
        </h1>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter condition (e.g. diabetes, cancer)..."
          className="w-full mb-6 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <ul className="space-y-4">
            {studies.map((study, idx) => (
              <StudyCard key={idx} study={study} />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
