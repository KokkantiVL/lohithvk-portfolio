export const personalInfo = {
  name: "Venkata Lohith Kokkanti",
  initials: "VLK",
  title: "Software Engineer",
  subtitle: "Distributed Systems · Microservices · ML Infrastructure",
  tagline:
    "I build systems that handle 50M+ users, survive 3am incidents, and occasionally make me proud.",
  github: "https://github.com/KokkantiVL",
  linkedin: "https://www.linkedin.com/in/venkata-lohith-kokkanti/",
  resume: null as string | null,
  location: "Buffalo, NY",
  education: [
    {
      degree: "M.S. Data Science & Applications",
      school: "University at Buffalo, SUNY",
      gpa: "3.80 / 4.00",
      period: "Aug 2024 – Dec 2025",
    },
    {
      degree: "B.Tech Computer Science & Engineering",
      school: "Presidency University",
      gpa: null as string | null,
      period: "Aug 2017 – Jun 2021",
    },
  ],
};

export const aboutParagraphs = [
  "Senior engineer with 3+ years building high-throughput backend systems and ML pipelines in production. At Accenture I cut checkout p95 latency from 1.8s to 600ms for 50M+ European consumers, shipped fraud-detection APIs at 50ms p95, and designed event-driven architectures that absorbed 3× seasonal traffic spikes without blinking.",
  "My sweet spot sits at the intersection of distributed systems engineering and applied ML — where reliability, performance, and intelligence converge. I've designed Redis key-sharding strategies to kill hot-key contention, built Kafka pipelines with idempotency guarantees, and productionized Document AI + LLM pipelines that replace human data-entry at scale.",
  "M.S. in Data Science from UB, done. Currently doing research on high-performance numerical computing across C++, R, and Python ecosystems. On-call experience has taught me one thing above all: systems that can't be understood at 2am shouldn't be deployed.",
];

export const skills: Record<string, string[]> = {
  Languages: ["Java", "Python", "Go", "C++", "TypeScript", "JavaScript", "SQL"],
  "Backend & Systems": [
    "Spring Boot",
    "FastAPI",
    "gRPC",
    "Protobuf",
    "Kafka",
    "WebSockets",
    "Microservices",
    "REST",
    "GraphQL",
  ],
  "Cloud & Infra": [
    "GCP",
    "AWS",
    "Azure",
    "Docker",
    "Kubernetes",
    "Terraform",
    "CI/CD",
  ],
  "Data & Storage": [
    "PostgreSQL",
    "Redis",
    "MongoDB",
    "Elasticsearch",
    "Pinecone",
    "DynamoDB",
    "BigQuery",
  ],
  "ML & GenAI": [
    "PyTorch",
    "TensorFlow",
    "XGBoost",
    "LightGBM",
    "CatBoost",
    "LangChain",
    "RAG",
    "Gemini",
    "GPT",
    "Hugging Face",
    "QLoRA",
  ],
};

export type ExperienceType = {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  badge: string;
  client?: string;
  highlights: string[];
  tech: string[];
};

export const experiences: ExperienceType[] = [
  {
    id: 1,
    role: "Research Associate",
    company: "University at Buffalo",
    location: "Buffalo, NY",
    period: "Feb 2026 – Present",
    badge: "Research",
    highlights: [
      "Building a high-performance C++/Eigen numerical engine with Rcpp (R) and Python bindings for cross-ecosystem access.",
      "Replacing slower reference implementations to deliver order-of-magnitude speedups; packaging for CRAN distribution.",
    ],
    tech: ["C++17", "Eigen", "Rcpp", "Python", "R", "CRAN"],
  },
  {
    id: 2,
    role: "ML Engineer Intern",
    company: "Baillie Lumber",
    location: "Buffalo, NY",
    period: "May 2025 – Aug 2025",
    badge: "Industry",
    highlights: [
      "Shipped a production Document AI + Gemini 1.5 Flash pipeline on GCP parsing 300+ supplier PDFs/day into SAP — saving 4 hrs/day per planner.",
      "Built a human-in-the-loop review platform (Angular, FastAPI, GCP App Engine) with RBAC, SAP validation, and extraction-accuracy telemetry.",
      "Replaced legacy Excel forecasting with a BigQuery pipeline; benchmarked XGBoost / LightGBM / CatBoost and deployed CatBoost at 17% MAPE.",
      "Owned end-to-end CI/CD deployment, monitoring, and SAP write-back with a human-in-the-loop correction path for AI-extracted fields.",
    ],
    tech: [
      "GCP",
      "Document AI",
      "Gemini 1.5",
      "BigQuery",
      "FastAPI",
      "Angular",
      "CatBoost",
      "SAP",
    ],
  },
  {
    id: 3,
    role: "Student Assistant (AI/Backend)",
    company: "University at Buffalo",
    location: "Buffalo, NY",
    period: "Jan 2025 – Dec 2025",
    badge: "Research",
    highlights: [
      "Built the AI and backend layer of a Digital Front Desk Bot (web chat + kiosk) answering facility, membership, class sign-up, and policy questions.",
      "Designed the RAG ingestion pipeline — document chunking + OpenAI text-embedding-3 over Rec documentation into Pinecone.",
      "Wired up retrieval and function-calling tools behind an LLM agent (GPT-4o/4o-mini, LangChain, FastAPI) for live database lookups.",
    ],
    tech: ["RAG", "LangChain", "OpenAI", "GPT-4o", "FastAPI", "Pinecone", "Python"],
  },
  {
    id: 4,
    role: "Software Engineer",
    company: "Accenture",
    location: "Bengaluru, India",
    period: "Jun 2021 – Jul 2024",
    badge: "Industry",
    client: "Top 10 European Retailer",
    highlights: [
      "Implemented the checkout precompute layer (Java / Spring Boot, Redis cache-aside with key sharding) for 50M+ consumers across 5 EU markets — cut p95 from 1.8s → 600ms, downstream calls by 60%.",
      "Developed Kafka producers and consumers handling 1M+ events/day with idempotency keys, retry policies, and DLQ replay; system absorbed 3× seasonal traffic spikes with zero duplicate processing.",
      "Designed a checkout A/B testing framework (Vue.js / TypeScript) with country/cohort targeting and GDPR bucketing; enabled 12+ experiments/quarter with auto-rollback.",
      "Shipped real-time fraud scoring APIs (FastAPI + XGBoost, Databricks) at 50ms p95 with full PSD2/SCA compliance; deployed shadow-mode with zero regressions.",
      "Implemented the PSP adapter layer within a legacy-to-adapter payments migration using a unified contract with contract-test gates — cut new PSP launch from 6 weeks → 1 week.",
      "Instrumented Azure Monitor / App Insights dashboards with SLO alerting; reduced MTTD from 12min → 3min and MTTR by 40% across checkout.",
    ],
    tech: [
      "Java",
      "Spring Boot",
      "Redis",
      "Kafka",
      "FastAPI",
      "XGBoost",
      "Vue.js",
      "TypeScript",
      "Azure",
      "Databricks",
    ],
  },
];

export type ProjectType = {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  tech: string[];
  github: string | null;
  highlights: string[];
};

export const projects: ProjectType[] = [
  {
    id: 1,
    name: "Mini-Redis",
    subtitle: "Distributed In-Memory Key-Value Store",
    description:
      "A Redis-compatible store built from scratch. Implements the RESP wire protocol, TTL-based key expiration, RDB-style snapshot persistence, and lock-free concurrent operations — validated with redis-cli against 100K-key workloads.",
    tech: ["C++17", "RESP Protocol", "Lock-Free Concurrency", "Snapshot Persistence"],
    github: "https://github.com/KokkantiVL/mini-redis",
    highlights: [
      "Full RESP protocol compatibility",
      "Lock-free concurrent operations",
      "TTL expiration + snapshot persistence",
      "Validated against 100K-key workloads",
    ],
  },
  {
    id: 2,
    name: "Taco-DB",
    subtitle: "Relational DBMS from Scratch",
    description:
      "A miniature relational database engine featuring buffer pool management, heap file storage, external merge-sort, full query operators (select, project, join), and a B-Tree index with bulk loading for efficient range queries.",
    tech: ["C++17", "B-Tree Index", "Buffer Pool", "External Merge-Sort"],
    github: null,
    highlights: [
      "B-Tree index with bulk loading",
      "External merge-sort for large datasets",
      "Buffer pool management",
      "Full relational query operators",
    ],
  },
];
