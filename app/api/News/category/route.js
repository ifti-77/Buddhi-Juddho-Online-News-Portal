import dbConnect from "@/lib/mongodb";
import newsCollection from "@/lib/models/newsCollection";

export async function GET(request) {
  try {
    await dbConnect();

    const category = request.nextUrl.searchParams.get("category");
    if (!category) {
      return Response.json({ error: "category is required" }, { status: 400 });
    }

    const count = await newsCollection.countDocuments({ category });
    const newsItems = await newsCollection
      .find({ category })
      .sort({ publishedAt: -1 });

    return Response.json({ newsItems, count }, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: `Failed to fetch news items ${error.message}` },
      { status: 500 }
    );
  }
}
