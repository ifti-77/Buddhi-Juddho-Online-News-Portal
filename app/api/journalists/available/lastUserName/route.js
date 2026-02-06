import dbConnect from "@/lib/mongodb";
import journalists from "@/lib/models/journalists";

export async function GET()
{
    try
    {
        await dbConnect();

        const availableUserName = await journalists.findOne({role: {$in:["reporter","editor"]}})
                                                    .select("username")
                                                    .sort({ createdAt: -1})
        
        if(!availableUserName)
        {
            const newUserName = "journalist@1";
            return new Response(JSON.stringify({ok: true,availableUserName: newUserName}),{status: 200})
        }

        const lastUserName = availableUserName.username;
        const lastUserNameNumber = parseInt(lastUserName.split('@')[1])
        const newUserName = `journalist@${lastUserNameNumber + 1}`;
        return new Response(JSON.stringify({ok: true,availableUserName: newUserName}),{status: 200})
    }catch(error)
    {
        return new Response(JSON.stringify({ok:false, message:`Error while fetching available username:\n${error.message}`}),{status:500})
    }
}