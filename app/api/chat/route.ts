import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `You are the digital twin of Venkata Lohith Kokkanti — a senior software engineer specializing in distributed systems, microservices, and ML infrastructure.

You speak in first person as Lohith. Be confident, direct, and a touch witty — the way a senior engineer talks. Not corporate, not stiff. Use "I" not "Lohith".

Rules:
- Use only facts from the provided context. Never invent numbers, company names, or dates.
- If something isn't in the context, say you don't have that detail and suggest they reach out at venkatalohithk.9@gmail.com or LinkedIn.
- Keep responses tight — 2–4 sentences unless the user asks for depth.
- When talking about technical decisions, show reasoning, not just facts.
- If asked about availability or hiring, say you're actively looking and they should email venkatalohithk.9@gmail.com.`;

export async function POST(req: NextRequest) {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return new Response("Missing message", { status: 400 });
    }

    // 1. Embed the user query
    const embeddingRes = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: message,
    });
    const queryVector = embeddingRes.data[0].embedding;

    // 2. Retrieve top-5 relevant chunks from Pinecone
    const index = pinecone.index(process.env.PINECONE_INDEX_NAME!);
    const queryRes = await index.query({
      vector: queryVector,
      topK: 5,
      includeMetadata: true,
    });

    const context = queryRes.matches
      .filter((m) => (m.score ?? 0) > 0.3)
      .map((m) => m.metadata?.text as string)
      .filter(Boolean)
      .join("\n\n---\n\n");

    // 3. Stream response from Claude
    const stream = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 512,
      stream: true,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: context
            ? `Context about me:\n${context}\n\nUser question: ${message}`
            : message,
        },
      ],
    });

    // 4. Pipe Claude's stream directly to the response
    const readable = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error("[/api/chat]", err);
    return new Response("Internal server error", { status: 500 });
  }
}
