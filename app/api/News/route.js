import dbConnect from '@/lib/mongodb';
import newscollection from '@/lib/models/newsCollection';


export async function GET() {
  await dbConnect();
  try {
    const newsItems = await newscollection.find({requested: "approved"}).sort({ publishedAt: -1 });
    return new Response(JSON.stringify(newsItems), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch news items' }), { status: 500 });
  }
}

export async function POST(request) {
  if (request.method === 'POST') {
    try {
      await dbConnect();

      const { title, content, category, author, authorID, isFeatured, thumbnailPath } = await request.json();

      const newNews = new newscollection({
        title,
        content,
        author: author, 
        authorID: authorID, 
        category,
        thumbnailPath,
        requested: "pending", // Default requested status
        featured: isFeatured ?? false, // Default featured status
      });

      const savedNews = await newNews.save();

      return new Response(JSON.stringify({ success: true, data: savedNews }), { status: 201 });
    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
  } else {
    return new Response(JSON.stringify({ error: `Method ${request.method} Not Allowed` }), { status: 405 });
  }
}

export async function PUT(request) {
  try {
    await dbConnect();

    const { _id, title, content, category, featured, thumbnailPath } = await request.json();

    const result = await newscollection.updateOne(
      { _id },
      {
        $set: {
          title,
          content,
          category,
          thumbnailPath,
          featured: featured ?? false,
        },
      },
      { runValidators: true }
    );

    return new Response(JSON.stringify({ success: true, data: result }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();

    const { _id } = await request.json();

    const result = await newscollection.deleteOne({ _id });

    return new Response(JSON.stringify({ success: true, data: result }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}