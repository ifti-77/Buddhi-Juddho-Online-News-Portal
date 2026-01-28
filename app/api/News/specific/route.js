import dbConnect from "@/lib/mongodb";
import newsCollection from "@/lib/models/newsCollection";

export  async function POST(req)
{
    const { pointerChar } = await req.json();
    await dbConnect();
    try {
        const newsItems = await newsCollection.find({ $or: [ { title: { $regex: pointerChar, $options: 'i' } },
                                                    { category: { $regex: pointerChar, $options: 'i' } } ] }).sort({ publishedAt: -1 });
        return new Response(JSON.stringify(newsItems), { status: 200 });
    } catch (error) {
        console.error('Error fetching specific news:', error);
        return new Response(JSON.stringify({ error: 'Error fetching specific news' }), { status: 500 });
    }
}