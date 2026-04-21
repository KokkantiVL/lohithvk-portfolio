# Projects

## Mini-Redis — Distributed In-Memory Key-Value Store
- Language: C++17
- GitHub: https://github.com/KokkantiVL/mini-redis

### What it is
A Redis-compatible in-memory key-value store built completely from scratch in C++17. It implements the RESP (Redis Serialization Protocol) wire protocol, which means you can connect to it with the real redis-cli and it just works. It supports TTL-based key expiration, RDB-style snapshot persistence, and lock-free concurrent operations.

### Why I built it
I wanted a deep understanding of how Redis actually works under the hood — the protocol, the memory model, the concurrency primitives. Building it from scratch is the best way to learn.

### Technical details
- RESP protocol: fully compatible so standard Redis clients work against it
- Lock-free concurrency: uses atomic operations and lock-free data structures for concurrent reads/writes
- TTL expiration: background thread handles key expiry
- Snapshot persistence: RDB-style periodic snapshots to disk
- Validated against 100K-key workloads with redis-cli

### Tech
C++17, RESP Protocol, Lock-Free Concurrency, Snapshot Persistence

---

## Taco-DB — Mini Relational DBMS
- Language: C++17
- Repository: Private (academic project)

### What it is
A miniature relational database management system built from scratch in C++17. Implements all the core components you'd find in a real DBMS.

### Technical details
- Buffer pool management: manages pages in memory, handles eviction
- Heap files: unordered page-based file storage for tables
- External merge-sort: sorts datasets larger than memory using disk
- Query operators: select, project, join (nested-loop and hash join)
- B-Tree index: supports point lookups and range queries with bulk loading for fast index creation

### Why I built it
Database Systems coursework at UB. Building a DBMS from scratch teaches you why indexes matter, how query planning works, and why buffer pool management is critical for performance.

### Tech
C++17, B-Tree Index, Buffer Pool Management, External Merge-Sort

---

## Digital Front Desk Bot (UB Recreation Center)
- Type: Production system at UB
- Stack: RAG, LangChain, OpenAI, FastAPI, Pinecone

### What it is
A deployed chatbot (web chat + kiosk) that answers questions for University at Buffalo Recreation Center members. Handles facility hours, membership plans, class sign-up, and policy questions.

### Architecture
- Ingestion: chunked Rec center documents, embedded with OpenAI text-embedding-3
- Vector store: Pinecone
- LLM: GPT-4o / GPT-4o-mini
- Function calling: live database lookups for class schedules and membership status
- Framework: LangChain + FastAPI

---

## Portfolio AI Assistant (this site)
- Type: In progress
- Stack: RAG, Pinecone, OpenAI embeddings, Claude, Next.js API routes

### What it is
A digital twin of Lohith that can answer questions about his work, experience, and projects. Embedded in this portfolio site as a floating chat interface.
