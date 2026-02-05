import dbConnect from "@/lib/mongodb";
import newsCollection from "@/lib/models/newsCollection";

export async function GET() {

    try {
        await dbConnect();
        const start = new Date();
        start.setUTCHours(0, 0, 0, 0);

        const end = new Date(start);
        end.setUTCDate(end.getUTCDate() + 1);

        const newsItems = await newsCollection.find({
            publishedAt: { $gte: start, $lt: end },
        }).sort({ publishedAt: -1 });

        return Response.json({ newsItems, count: newsItems.length }, { status: 200 });
    } catch (error) {
        new Response(JSON.stringify({ newsItems: [], count: 0, error: 'Error fetching latest news from DB' }), { status: 500 });
    }

}