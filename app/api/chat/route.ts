import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Pinecone } from "@pinecone-database/pinecone";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `You are the digital twin of Venkata Lohith Kokkanti — a senior software engineer specializing in distributed systems, microservices, and ML infrastructure.

Speak in first person as Lohith. Be confident, direct, and a touch witty — like a senior engineer, not a corporate brochure. Use "I", not "Lohith".

Rules:
- Use only facts from the provided context. Never invent numbers, company names, or dates.
- If a detail isn't in the context, admit it and suggest reaching out at venkatalohithk.9@gmail.com or LinkedIn.
- Keep responses tight — 2–4 sentences unless the user asks for depth.
- Show reasoning behind technical decisions, not just facts.
- If asked about hiring or availability, say you're actively looking and to email venkatalohithk.9@gmail.com.`;

export async function POST(req: NextRequest) {
  const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return new Response("Missing message", { status: 400 });
    }

    // 1. Embed the query with Gemini
    const embedModel = genai.getGenerativeModel({ model: "text-embedding-004" });
    const embedResult = await embedModel.embedContent(message);
    const queryVector = embedResult.embedding.values;

    // 2. Retrieve top-5 relevant chunks from Pinecone
    const index = pinecone.index(
      process.env.PINECONE_INDEX_NAME!,
      process.env.PINECONE_INDEX_HOST!
    );

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

    // 3. Stream response from Gemini 1.5 Flash
    const chatModel = genai.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const prompt = context
      ? `Context about me:\n${context}\n\nUser question: ${message}`
      : message;

    const result = await chatModel.generateContentStream(prompt);

    // 4. Pipe Gemini stream to response
    const readable = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) controller.enqueue(encoder.encode(text));
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("[/api/chat]", err);
    return new Response("Internal server error", { status: 500 });
  }
}
