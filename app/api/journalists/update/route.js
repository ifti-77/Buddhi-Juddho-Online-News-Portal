import dbConnect from "@/lib/mongodb";
import journalists from "@/lib/models/journalists";

export async function POST(request) {
    try {
        await dbConnect();
        const { id, currentPassword } = await request.json();
        if (!id || !currentPassword) {
            return new Response(JSON.stringify({ ok: false, error: "ID and current password are required" }), { status: 400, headers: { "Content-Type": "application/json" } })
        }

        const journalist = await journalists.findOne({ _id: id, password: currentPassword });

        if (!journalist) {
            return new Response(JSON.stringify({ ok: false, error: "Invalid ID or password" }), { status: 401, headers: { "Content-Type": "application/json" } })
        }
        return new Response(JSON.stringify({ ok: true, message: "Password verified successfully" }), { status: 200, headers: { "Content-Type": "application/json" } })


    } catch (error) {
        return new Response(JSON.stringify({ ok: false, error: "An error occurred while Verifying the password" }), { status: 500, headers: { "Content-Type": "application/json" } })
    }

}

export async function PUT(request) {
try {
        await dbConnect();
        const { id, newPassword } = await request.json();
        if (!id || !newPassword) {
            return new Response(JSON.stringify({ ok: false, error: "ID and new password are required" }), { status: 400, headers: { "Content-Type": "application/json" } })
        }

        const journalist = await journalists.updateOne({ _id: id }, { $set: { password: newPassword } });

        if (!journalist) {
            return new Response(JSON.stringify({ ok: false, error: "Invalid ID or password" }), { status: 401, headers: { "Content-Type": "application/json" } })
        }
        
        return new Response(JSON.stringify({ ok: true, message: "Password updated successfully" }), { status: 200, headers: { "Content-Type": "application/json" } })


    } catch (error) {
        return new Response(JSON.stringify({ ok: false, error: "An error occurred while updating the password" }), { status: 500, headers: { "Content-Type": "application/json" } })
    }
}