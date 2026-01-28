import journalists from "@/lib/models/journalists";

export async function POST(request) {


  const { name, username, password, role } = await request.json();


  const newJournalist = new journalists({ name, username, password, role, status: 'active' });
  await newJournalist.save();
  
  return new Response(
    JSON.stringify({ ok: true, message: "Journalist added successfully" }),
    { status: 200 }
  );
}
