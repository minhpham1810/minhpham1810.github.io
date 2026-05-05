const content = `# Experience

## Software Engineering Micro-Intern — Cybersecurity Risk Platform
**Parker Dewey** | Lewisburg, PA | *Feb 2026 – Present*
- Built and deployed an AI-powered cybersecurity risk assessment platform using Next.js and FastAPI for multi-tenant environments.
- Designed backend services and REST APIs with PostgreSQL/Supabase to process structured data and generate real-time risk analytics.
- Architected an end-to-end data pipeline (form ingestion → processing → scoring → dashboard) enabling automated evaluation.
- Developed a scoring engine producing domain metrics and aggregate risk classifications for decision-making.

## Software Developer — Academic Chatbot
**Bucknell University** | Lewisburg, PA | *Oct 2025 – Present*
- Developed a full-stack academic catalogue chatbot using a Next.js (TypeScript, Tailwind) frontend and FastAPI (RESTful) backend, enabling real-time, citation-based answers for course and program information.
- Implemented secure authentication with Clerk (Google OAuth) to manage user accounts and protect session history, feedback, and analytics features.
- Engineered a Retrieval-Augmented Generation (RAG) pipeline with LangChain, ChromaDB and OpenAI API, ensuring all responses are grounded in official catalogue PDFs and URLs.
- Built a UUID-based session architecture with SQLite for persistent chat history, feedback tracking, and analytics.
- Exposed feedback endpoints and instrumentation hooks to track user sentiment, model fallback cases, and retrieval quality.

## Frontend Developer — KALMUS Movie Barcode Generator
**Bucknell University** | Lewisburg, PA | *Oct 2025 – Present*
- Built a Next.js frontend (React, TypeScript, Tailwind) enabling video upload, configuration, and visualization (Plotly.js) of KALMUS movie color barcodes executed on the university's HPC cluster.
- Implemented job monitoring with queueing, submitting, status states, and error handling by integrating with internal API endpoints connected to SLURM.
- Created reusable components (upload, config panel, barcode display) and added client-side validation and loading states for a smooth long-running workflow.

## Full Stack Developer (Contractor)
**Daylily Software Inc.** | Remote | *Aug 2025 – Nov 2025*
- Built 3 Shopify storefronts using Liquid (HTML/CSS), JavaScript/TypeScript, and Storefront/Admin APIs.
- Delivered custom theme features including dynamic product filtering, cart logic, and storefront customization scoped directly with clients.
- Tested and iterated on each module based on client feedback in a fast-paced contract environment.

## Undergraduate Researcher
**Bucknell University** | Lewisburg, PA | *Oct 2024 – May 2025*
- Engineered a surface electromyography (sEMG) controller prototype for amputees using Myoware sensors and Arduino to control a virtual limb in AR.
- Trained a real-time hand gesture classifier in PyTorch, applying time-domain feature extraction for embedded deployment.
- Conducted validation experiments evaluating sensor placement, gesture accuracy, and latency for real-time prosthetic control.

## Computer Science Teaching Assistant
**Bucknell University** | Lewisburg, PA | *Jan 2024 – Present*
- Supported CSCI203 (Intro to CS) and CSCI204 (Data Structures), helping 20+ students with Python and core data structures.
- Led weekly study groups and drop-in help sessions, focusing on OOP concepts and algorithmic problem solving.
- Assisted instructors in grading programming assignments and delivering detailed feedback to support student learning.`;

export default content;
