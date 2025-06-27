import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url);
    const query = searchParams.get("q") || "";

    if (!query) {
        return new Response(JSON.stringify({studies: []}), {
            status: 200,
            headers: {"Content-Type": "application/json"},
        });
    }

    const res = await fetch(
        `https://clinicaltrials.gov/api/v2/studies?query.cond=${encodeURIComponent(
            query
        )}&countTotal=true&fields=protocolSection.identificationModule.nctId,protocolSection.identificationModule.briefTitle,protocolSection.conditionsModule.conditions&pageSize=10`
    );

    if (!res.ok) {
        console.error("Failed to fetch external API");
        return new Response(JSON.stringify({error: "Failed to fetch external API"}), {
            status: 500,
            headers: {"Content-Type": "application/json"},
        });
    }

    try {
        const data = await res.json();
        return new Response(JSON.stringify({studies: data.studies || []}), {
            status: 200,
            headers: {"Content-Type": "application/json"},
        });
    } catch (error) {
        console.error("API error parsing JSON:", error);
        return new Response(JSON.stringify({error: "Failed to parse response"}), {
            status: 500,
            headers: {"Content-Type": "application/json"},
        });
    }
}
