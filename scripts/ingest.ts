/**
 * One-time ingestion script.
 * Chunks knowledge/*.md files, embeds them with OpenAI, and upserts into Pinecone.
 *
 * Run:  npx tsx scripts/ingest.ts
 */

import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

const INDEX_NAME = process.env.PINECONE_INDEX_NAME!;
const CHUNK_SIZE = 450;
const CHUNK_OVERLAP = 60;

function chunkText(text: string): string[] {
  const sentences = text.split(/(?<=[.!?\n])\s+/).filter((s) => s.trim().length > 20);
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if (current.length + sentence.length > CHUNK_SIZE && current) {
      chunks.push(current.trim());
      // Keep last part for overlap
      const words = current.split(" ");
      current = words.slice(-CHUNK_OVERLAP / 6).join(" ") + " " + sentence;
    } else {
      current += (current ? " " : "") + sentence;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

async function embedBatch(texts: string[]): Promise<number[][]> {
  const res = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: texts,
  });
  return res.data.map((d) => d.embedding);
}

async function ingest() {
  const knowledgeDir = path.join(process.cwd(), "knowledge");

  if (!fs.existsSync(knowledgeDir)) {
    console.error("knowledge/ directory not found");
    process.exit(1);
  }

  const files = fs.readdirSync(knowledgeDir).filter((f) => f.endsWith(".md"));
  console.log(`Found ${files.length} knowledge files: ${files.join(", ")}\n`);

  const index = pinecone.index(INDEX_NAME);

  for (const file of files) {
    const content = fs.readFileSync(path.join(knowledgeDir, file), "utf-8");
    const chunks = chunkText(content);
    console.log(`[${file}] ${chunks.length} chunks`);

    // Embed in batches of 20 (OpenAI limit is 2048 per request)
    const batchSize = 20;
    for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize);
      const embeddings = await embedBatch(batch);

      const vectors = batch.map((text, j) => ({
        id: `${file.replace(".md", "")}-${i + j}`,
        values: embeddings[j],
        metadata: { text, source: file },
      }));

      await index.upsert({ records: vectors } as Parameters<typeof index.upsert>[0]);
      process.stdout.write(`  upserted ${i + batch.length}/${chunks.length}\r`);
    }

    console.log(`  ✓ ${file} done`);
  }

  console.log("\n✅ Ingestion complete. Pinecone is ready.");
}

ingest().catch((err) => {
  console.error("Ingestion failed:", err.message);
  process.exit(1);
});
