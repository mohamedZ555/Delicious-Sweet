// app/api/contact/route.js
export const dynamic = 'force-dynamic'; // 👈 Required for dynamic API routes

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    console.log("Received:", { name, email, message });

    return new Response(JSON.stringify({ message: "Message sent!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
