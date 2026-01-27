

export async function GET() {
    try {
        const dbConnect = await import('../../lib/mongodb');
        const News = await import('../../lib/models/newsCollection');
        await dbConnect.default();
        const newsItems = await News.default.find({}).sort({ publishedAt: -1 });
        return new Response(JSON.stringify(newsItems), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch news items' }), { status: 500 });
    }
}