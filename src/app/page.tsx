import SearchClient from "@/components/SearchClient";
import {Study} from "@/types";

export default async function Page({
                                       searchParams,
                                   }: {
    searchParams?: Promise<{ q?: string }>;
}) {
    const params = await searchParams;
    const query = params?.q || "";

    let initialStudies: Study[] = [];

    if (query) {
        try {
            const res = await fetch(
                `https://clinicaltrials.gov/api/v2/studies?query.cond=${encodeURIComponent(
                    query
                )}&countTotal=true&fields=protocolSection.identificationModule.nctId,protocolSection.identificationModule.briefTitle,protocolSection.conditionsModule.conditions&pageSize=10`,
                {cache: "no-store"}
            );
            const data = await res.json();
            initialStudies = data.studies || [];
        } catch (error) {
            console.error("Failed to fetch studies on server", error);
        }
    }

    return (
        <main className="min-h-screen bg-gray-100 px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
                    🔍 Search Clinical Trials
                </h1>
                <SearchClient initialQuery={query} initialStudies={initialStudies}/>
            </div>
        </main>
    );
}
