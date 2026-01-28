import dbConnect from "@/lib/mongodb";
import newscollection from "@/lib/models/newsCollection";

export async function PUT(request) {
    try {
        await dbConnect();

        const { _id, requested } = await request.json();

        const result = await newscollection.updateOne(
            { _id },
            {
                $set: {
                    requested,
                },
            },
            { runValidators: true }
        );

        return new Response(JSON.stringify({ success: true, data: result }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}