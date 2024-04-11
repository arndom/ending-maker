import { extractAlternateEndings, processAlternateEndingsArray } from "@/utils";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // @ts-ignore
    const { prompt } = body;

    const messages = [
      {
        role: "system",
        content:
          "You are a fictional writer. Your job is to write 5 short alternate endings for a tv show, movie, cartoon etc. Be creative with your responses but be based in the actual world of show; understand the themes, plot points, character motivations. Indicate each alternate ending by Title. The input you'll expect is the shows name.",
      },
      {
        role: "user",
        content: prompt,
      },
    ];

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-2-7b-chat-int8`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_AUTH_TOKEN}`,
        },
        body: JSON.stringify({ messages, max_tokens: 900 }),
      }
    );

    const data = await response.json();

    // @ts-ignore
    if (!data.success) {
      // @ts-ignore
      console.log("An error occurred:", data.errors);
      return new NextResponse("Service unavailable", { status: 503 })
    }

    // @ts-ignore
    const result = data.result.response;
    const formattedResult = extractAlternateEndings(result)
    const resultWithImages = await processAlternateEndingsArray(prompt, formattedResult)
    return NextResponse.json(resultWithImages);
  } catch (error) {
    console.log("An error occurred:", error);
		return new NextResponse("Internal Error", { status: 500 });
  }
}
