# Work Experience

## Research Associate — University at Buffalo
- Period: Feb 2026 – Present
- Location: Buffalo, NY
- Type: Research

### What I do
Building a high-performance C++/Eigen numerical engine with Rcpp (R) and Python bindings for cross-ecosystem access. Replacing slower reference implementations to deliver order-of-magnitude speedups. Packaging for CRAN distribution so R users can install it directly.

### Tech used
C++17, Eigen, Rcpp, Python, R, CRAN

---

## ML Engineer Intern — Baillie Lumber
- Period: May 2025 – Aug 2025
- Location: Buffalo, NY
- Type: Industry

### What I did
Shipped a production Document AI + Gemini 1.5 Flash pipeline on GCP that parses 300+ supplier PDFs per day into SAP, saving 4 hours per day per planner. Built a human-in-the-loop review platform using Angular, FastAPI, and GCP App Engine with RBAC, SAP validation, and extraction-accuracy telemetry. Replaced legacy Excel forecasting with a BigQuery pipeline. Benchmarked XGBoost, LightGBM, and CatBoost — deployed CatBoost at 17% MAPE for demand forecasting. Owned end-to-end CI/CD deployment, monitoring, and SAP write-back with a correction path for AI-extracted fields.

### Key achievements
- 300+ PDFs/day automated into SAP
- 4 hrs/day saved per planner
- 17% MAPE on demand forecasting with CatBoost
- Full CI/CD pipeline with human-in-the-loop corrections

### Tech used
GCP, Document AI, Gemini 1.5 Flash, BigQuery, FastAPI, Angular, CatBoost, XGBoost, LightGBM, SAP, App Engine

---

## Student Assistant (AI/Backend) — University at Buffalo
- Period: Jan 2025 – Dec 2025
- Location: Buffalo, NY
- Type: Research / Applied AI

### What I did
Built the AI and backend layer of a Digital Front Desk Bot for web chat and kiosk. The bot answers facility, membership, class sign-up, and policy questions for Recreation center members. Designed the RAG ingestion pipeline using document chunking and OpenAI text-embedding-3 over Rec center documentation into Pinecone. Wired up retrieval and function-calling tools behind an LLM agent using GPT-4o, GPT-4o-mini, LangChain, and FastAPI for live database lookups.

### Tech used
RAG, LangChain, OpenAI, GPT-4o, GPT-4o-mini, FastAPI, Pinecone, Python, text-embedding-3

---

## Software Engineer — Accenture
- Period: Jun 2021 – Jul 2024
- Location: Bengaluru, India
- Client: Top 10 European Retailer (name confidential)
- Type: Industry

### What I did

**Checkout performance:**
Implemented the checkout precompute layer using Java, Spring Boot, and Redis cache-aside with key sharding for 50M+ consumers across 5 EU markets. Cut p95 latency from 1.8s to 600ms and reduced downstream service calls by 60%. The key sharding strategy solved hot-key contention that was causing Redis bottlenecks during peak traffic.

**Kafka event processing:**
Developed Kafka producers and consumers handling 1M+ events per day with idempotency keys, retry policies, and dead-letter queue (DLQ) replay. The system absorbed 3x seasonal traffic spikes with zero duplicate processing.

**A/B testing framework:**
Designed a checkout A/B testing framework using Vue.js and TypeScript with country and cohort targeting plus GDPR-compliant bucketing. Enabled 12+ experiments per quarter with auto-rollback on regression.

**Fraud detection:**
Shipped real-time fraud scoring APIs using FastAPI, XGBoost, and Databricks at 50ms p95 with full PSD2/SCA compliance. Deployed in shadow mode first with zero regressions before going live.

**Payments migration:**
Implemented the PSP (Payment Service Provider) adapter layer within a legacy-to-adapter payments migration using a unified contract with contract-test gates. Cut new PSP onboarding time from 6 weeks to 1 week.

**Observability:**
Instrumented Azure Monitor and App Insights dashboards with SLO alerting. Reduced MTTD (mean time to detect) from 12 minutes to 3 minutes and MTTR (mean time to resolve) by 40% across checkout.

**Mentorship:**
Mentored 2–3 junior engineers on payment reliability patterns. Guided CronJob-based retry logic that reduced failed checkout transactions by ~25%.

### Key metrics
- p95 latency: 1.8s → 600ms (checkout)
- Downstream calls reduced by 60%
- 1M+ Kafka events/day with zero duplicates
- 3x seasonal traffic spikes absorbed
- Fraud API: 50ms p95
- PSP onboarding: 6 weeks → 1 week
- MTTD: 12min → 3min
- MTTR reduced by 40%
- Failed transactions reduced ~25%

### Tech used
Java, Spring Boot, Redis, Kafka, FastAPI, XGBoost, Vue.js, TypeScript, Azure Monitor, App Insights, Databricks, Python
