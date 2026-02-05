import dbConnect from "@/lib/mongodb";
import journalists from "@/lib/models/journalists";

export async function GET() {
  try {
    await dbConnect(); 

    const availableJournalists = await journalists.find({
        role: { $in: ["reporter", "editor"] },
      }).select("-password -__v");

    return Response.json(availableJournalists, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: `Failed to fetch available journalists\n${error.message}` },
      { status: 500 }
    );
  }
}
