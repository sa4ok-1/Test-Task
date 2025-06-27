import {NextResponse} from "next/server";
import {MongoClient} from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        await client.connect();
        const db = client.db("clinical_trials");
        const collection = db.collection("applications");
        await collection.insertOne(body);
        return NextResponse.json(
            {message: "Application submitted"},
            {status: 200}
        );
    } catch (error) {
        console.error("Error in API /api/apply:", error);
        return NextResponse.json(
            {error: "Internal Server Error"},
            {status: 500}
        );
    } finally {
        await client.close();
    }
}
