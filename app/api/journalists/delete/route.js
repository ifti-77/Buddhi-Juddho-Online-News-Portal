import dbConnect from "@/lib/mongodb";
import journalists from "@/lib/models/journalists";

export async function DELETE(request) {
  try {
    await dbConnect();

    const { _id } = await request.json();

    const result = await journalists.deleteOne({ _id });

    return new Response(JSON.stringify({ success: true, data: result }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}