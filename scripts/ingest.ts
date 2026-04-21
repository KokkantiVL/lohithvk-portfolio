/**
 * One-time ingestion script.
 * Chunks knowledge/*.md files, embeds them with Gemini text-embedding-004,
 * and upserts into Pinecone.
 *
 * Run:  npm run ingest
 *
 * Pinecone index must be created with dimension = 768 (Gemini default).
 */

import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

const INDEX_NAME = process.env.PINECONE_INDEX_NAME!;
const INDEX_HOST = process.env.PINECONE_INDEX_HOST!;
const CHUNK_SIZE = 450;

function chunkText(text: string): string[] {
  const sentences = text.split(/(?<=[.!?\n])\s+/).filter((s) => s.trim().length > 20);
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if (current.length + sentence.length > CHUNK_SIZE && current) {
      chunks.push(current.trim());
      const words = current.split(" ");
      current = words.slice(-8).join(" ") + " " + sentence;
    } else {
      current += (current ? " " : "") + sentence;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

async function embedText(text: string): Promise<number[]> {
  const model = genai.getGenerativeModel({ model: "text-embedding-004" });
  const result = await model.embedContent(text);
  return result.embedding.values;
}

async function ingest() {
  const knowledgeDir = path.join(process.cwd(), "knowledge");

  if (!fs.existsSync(knowledgeDir)) {
    console.error("❌ knowledge/ directory not found");
    process.exit(1);
  }

  const files = fs.readdirSync(knowledgeDir).filter((f) => f.endsWith(".md"));
  console.log(`📚 Found ${files.length} files: ${files.join(", ")}\n`);

  const index = pinecone.index(INDEX_NAME, INDEX_HOST);

  for (const file of files) {
    const content = fs.readFileSync(path.join(knowledgeDir, file), "utf-8");
    const chunks = chunkText(content);
    console.log(`[${file}] → ${chunks.length} chunks`);

    for (let i = 0; i < chunks.length; i++) {
      const values = await embedText(chunks[i]);

      await index.upsert([
        {
          id: `${file.replace(".md", "")}-${i}`,
          values,
          metadata: { text: chunks[i], source: file },
        },
      ]);

      process.stdout.write(`  ${i + 1}/${chunks.length}\r`);

      // Gemini free tier: 1500 req/day, ~1 req/sec safe rate
      await new Promise((r) => setTimeout(r, 700));
    }

    console.log(`  ✓ ${file} done           `);
  }

  console.log("\n✅ Ingestion complete. Pinecone is ready.");
}

ingest().catch((err) => {
  console.error("❌ Ingestion failed:", err.message);
  process.exit(1);
});
