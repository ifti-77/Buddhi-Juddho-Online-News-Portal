import dbConnect from "@/lib/mongodb";
import newscollection from "@/lib/models/newsCollection";
export async function GET() {

    try {
        await dbConnect();
        const newsItems = await newscollection.find({ requested: "pending" }).sort({ publishedAt: -1 });
        return new Response(JSON.stringify(newsItems), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch requested news items' }), { status: 500 });
    }

}

