"use client";

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import StudyCard from "./StudyCard";
import {Study} from "@/types";

interface Props {
    initialQuery: string;
    initialStudies: Study[];
}

export default function SearchClient({initialQuery, initialStudies}: Props) {
    const [input, setInput] = useState(initialQuery);
    const [studies, setStudies] = useState<Study[]>(initialStudies);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const fetchStudies = async (query: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
                cache: "no-store",
            });
            const data = await res.json();
            setStudies(data.studies || []);
        } catch (e) {
            console.error("Failed to fetch studies", e);
            setStudies([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (input.trim() === initialQuery.trim()) return;
            router.push(`/?q=${encodeURIComponent(input.trim())}`);
            if (input.trim()) fetchStudies(input.trim());
            else setStudies([]);
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [input, initialQuery, router]);

    return (
        <>
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
                        <StudyCard key={idx} study={study}/>
                    ))}
                </ul>
            )}
        </>
    );
}
