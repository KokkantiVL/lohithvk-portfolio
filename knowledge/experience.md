# Work Experience

## Research Engineer — University at Buffalo
- Period: Feb 2026 – Present
- Location: Buffalo, NY
- Type: Research

### What I do
Building R and Python packages for NORSP, a network-based sparse perturbation-selection method (network propagation + forward subset selection) for steady-state control in biological networks. Implementing the full algorithm pipeline — sensitivity matrix construction, subset-selection search, and model-selection criteria via BIC and adjusted R² — along with a test suite (testthat, pytest) and CI/CD via GitHub Actions. Targeting CRAN release upon publication.

### Tech used
R, Python, C++17, GitHub Actions, CRAN, testthat, pytest

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

## Graduate Research Assistant — University at Buffalo
- Period: Feb 2025 – Dec 2025
- Location: Buffalo, NY
- Type: Research / Applied AI

### What I did
Built backend and AI components for a student-facing conversational assistant (web + kiosk), later integrated into a live system serving 31,000+ students across facilities, membership, and class registration workflows. Developed a RAG pipeline using OpenAI text-embedding-3 embeddings and Pinecone, and a GPT-4o function-calling agent (LangChain, FastAPI) that routes between semantic retrieval and live API lookups to ground responses in real-time institutional data.

### Tech used
RAG, LangChain, OpenAI, GPT-4o, GPT-4o-mini, FastAPI, Pinecone, Python, text-embedding-3

---

## Software Engineer — Accenture
- Period: Jun 2021 – Jul 2024
- Location: Bengaluru, India
- Clients: Retail Healthcare (50M+ consumers, UK & EU); Enterprise Security SaaS
- Type: Industry

### What I did

**Checkout performance:**
Built a checkout precompute layer in Java/Spring Boot that replaced synchronous fan-out to downstream services with a Redis cache-aside (consistent-hash sharding, stampede protection). Cut p95 from 1.8s to 600ms and downstream calls by 60% for 50M+ consumers across EU markets.

**ML inference microservice:**
Decoupled a Java-invoked Python inference path into a FastAPI microservice on Kubernetes, integrated with upstream Java services. Reduced p95 latency 40% and enabled independent scaling for real-time chatbot traffic.

**Fraud detection:**
Shipped real-time fraud scoring APIs (FastAPI + XGBoost, Databricks feature pipeline) at 50ms p95 with PSD2/SCA compliance. Deployed in shadow mode against live traffic with zero regressions before cutover.

**Data migration:**
Engineered Kafka + Flink pipelines for zero-downtime migration of 150M+ MongoDB records with exactly-once delivery via Flink checkpointing. Observability through Prometheus/Grafana dashboards.

**Query optimization:**
Cut MongoDB query latency from 5 min to 400ms across 20M+ records by replacing expensive string scans with write-time tokenization and B-tree indexed prefix lookups.

**Payments migration:**
Implemented a PSP adapter layer (Java) in a legacy-to-adapter payments migration, authoring a unified contract with contract-test gates in CI. Cut new PSP onboarding from 6 weeks to 1 week.

**Certificate Authority simulator:**
Engineered a multi-threaded Java CA simulator for large-scale load testing of millions of concurrent SOAP, REST, and gRPC API requests. Eliminated third-party dependencies and saved $1M annually in licensing costs.

**APIs and testing:**
Designed Spring Boot REST/GraphQL APIs with OAuth 2.0/JWT. Drove test coverage from 0% to 85% (JUnit, Mockito). Authored design docs and served as on-call DRI.

### Key metrics
- p95 latency: 1.8s → 600ms (checkout), downstream calls reduced by 60%
- ML inference p95 latency reduced 40%
- Fraud API: 50ms p95
- 150M+ records migrated with zero data loss
- MongoDB query latency: 5min → 400ms across 20M+ records
- PSP onboarding: 6 weeks → 1 week
- $1M/year saved in licensing costs
- Test coverage: 0% → 85%

### Tech used
Java, Spring Boot, FastAPI, Python, Kafka, Flink, Redis, MongoDB, XGBoost, Databricks, Kubernetes, Prometheus, Grafana, gRPC
