import dbConnect from "@/lib/mongodb";
import newsCollection from "@/lib/models/newsCollection";


export async function GET(request) {
  
    const { searchParams } =  new URL(request.url);
    const category =  searchParams.get('category');
    await dbConnect();
  try {
    const newsItems = await newsCollection.find({category: decodeURIComponent(category)}).sort({ publishedAt: -1 });
    return new Response(JSON.stringify(newsItems), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch news items' }), { status: 500 });
  }
}