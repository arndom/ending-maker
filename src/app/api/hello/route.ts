import { NextResponse, type NextRequest } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  let responseText = 'Hello World'

  const messages = [
    { role: "system", content: "You are a friendly assistant" },
    {
      role: "user",
      content: "What is the origin of the phrase Hello, World",
    },
  ];

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-2-7b-chat-fp16`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_AUTH_TOKEN}`,
      },
      body: JSON.stringify({ messages }),
    }
  );

  const data = await response.json();
  
  // @ts-ignore
  return NextResponse.json(data.result.response);

  return new Response(JSON.stringify(response))
}
