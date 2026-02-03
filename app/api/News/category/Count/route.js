
import dbConnect from "@/lib/mongodb";
import newsCollection from "@/lib/models/newsCollection";

export async function GET(request)
{
    try
    {
        await dbConnect();
        const newsCount = await newsCollection.countDocuments();
        return new Response(JSON.stringify({count: newsCount}), {status: 200});

    }catch (error)
    {
        new Response("Internal Server Error", {status: 500});
    }
}