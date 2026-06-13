import { NextResponse } from "next/server";

export async function POST(request) {
  const { bird, region, yardSize } = await request.json();

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Create a Bird Rescue Garden Blueprint for someone who wants to attract and help the ${bird}. They live in the ${region} region of the US and have a ${yardSize} yard.

Format your response with these exact sections:
🌱 TOP 3 NATIVE PLANTS
List 3 native plants with one sentence each explaining how it helps this bird.

🐛 KEY INSECTS THESE PLANTS ATTRACT
List 3 insects and why they matter for this bird.

📅 SEASONAL CALENDAR
One sentence for each season explaining what the garden does for this bird.

⚠️ DANGER AUDIT
List 2-3 things commonly found in yards that harm this bird and how to fix them.

💚 YOUR IMPACT
One inspiring paragraph about how many birds this garden could help.

Keep it practical, specific, and encouraging.`
            }]
          }]
        }),
      }
    );

    const data = await response.json();
    console.log("Gemini response:", JSON.stringify(data));

    if (!data.candidates || !data.candidates[0]) {
      return NextResponse.json({ blueprint: "Error: " + JSON.stringify(data) });
    }

    const blueprint = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ blueprint });

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ blueprint: "Error: " + error.message });
  }
}
