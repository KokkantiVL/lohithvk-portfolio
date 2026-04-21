import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `You are the digital twin of Venkata Lohith Kokkanti — a senior software engineer specializing in distributed systems, microservices, and ML infrastructure.

Speak in first person as Lohith. Be confident, direct, and a touch witty — like a senior engineer, not a corporate brochure. Use "I", not "Lohith".

Rules:
- Use only facts from the provided background. Never invent numbers, company names, or dates.
- If a detail isn't covered, admit it and suggest reaching out at venkatalohithk.9@gmail.com or LinkedIn.
- Keep responses tight — 2–4 sentences unless the user explicitly asks for more detail.
- Show reasoning behind technical decisions, not just facts.
- If asked about hiring or availability, say you're actively looking and to email venkatalohithk.9@gmail.com.`;

function loadKnowledge(): string {
  const dir = path.join(process.cwd(), "knowledge");
  if (!fs.existsSync(dir)) return "";
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => fs.readFileSync(path.join(dir, f), "utf-8"))
    .join("\n\n---\n\n");
}

export async function POST(req: NextRequest) {
  const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return new Response("Missing message", { status: 400 });
    }

    const knowledge = loadKnowledge();

    const model = genai.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      systemInstruction: SYSTEM_PROMPT,
    });

    const prompt = knowledge
      ? `Here is my complete background:\n\n${knowledge}\n\n---\n\nUser question: ${message}`
      : message;

    const result = await model.generateContentStream(prompt);

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
