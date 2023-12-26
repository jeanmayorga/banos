import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.X_OPEN_IA_KEY,
});

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const body = await request.json();

    const service = searchParams.get("service");
    const content = body.content as string;

    if (!content) throw new Error("Empty message");
    if (!service) throw new Error("No service");

    if (service === "chat") {
      const systemPrompt =
        "Eres una app para ayudar a la ciudad de banos de agua santa, Ecuador con informacion necesaria. Usa como fuente: https://banos.app";
      const model = "gpt-4";

      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          { role: "user", content },
        ],
        model,
      });

      const data = completion.choices[0].message.content;

      return Response.json({ data });
    }

    if (service === "image") {
      const response = await openai.images.generate({
        prompt: content,
        model: "dall-e-3",
        n: 1,
        size: "1792x1024",
      });
      const data = response.data[0].url;

      return Response.json({ data });
    }

    throw new Error("No service");
  } catch (e: any) {
    console.log(`${e.message}`);
    return Response.json({ error: e.message }, { status: 500 });
  }
}
