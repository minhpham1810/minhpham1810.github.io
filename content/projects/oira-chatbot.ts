const content = `# OIRA Chatbot — AI-Powered Course Catalog Assistant

### Conversational AI for navigating Bucknell University's course catalog.

OIRA Chatbot is a full-stack AI assistant built for Bucknell University's OIRA team. Students and advisors can ask natural language questions about course offerings, requirements, and schedules—and receive cited, contextually accurate answers powered by a RAG pipeline over the university's catalog documents.

> **Status:** Currently under university preview. Expected production deployment: Fall 2026.

## Links
- [GitHub Repository](https://github.com/OIRA-Chatbot-Project/OIRA-Chatbot)

## Demo
![video](oira_chatbot_demo.mp4)

## Key Features
- 🤖 Conversational Search: Natural language queries over the full Bucknell course catalog with cited answers.
- 🔍 RAG Pipeline: Ingests PDFs and Google Docs, embeds content with OpenAI, and retrieves relevant passages via ChromaDB vector search.
- 💬 Session Management: Saves chat history and supports session restoration across visits.
- 👍 User Feedback: Thumbs up/down on responses to track answer quality and support model improvement.
- 🔐 Authentication: Clerk-based user auth with session-specific chat experiences.
- 🖼️ OCR Support: Optional Tesseract OCR for extracting course info from uploaded schedule images.

## Technologies
- Backend: Python, FastAPI, LangChain, ChromaDB, OpenAI API, SQLAlchemy, SQLite
- Frontend: Next.js (App Router), React, Tailwind CSS, Clerk
- Testing: Jest (frontend component tests)
- Deployment: Bucknell University infrastructure (production Fall 2026)

## How It Works
Source documents (PDFs, Google Docs) are ingested and embedded into ChromaDB → user queries are forwarded from the chat UI to the FastAPI backend → relevant catalog passages are retrieved and passed to OpenAI → the model generates a cited answer → users can rate response quality via thumbs up/down feedback.
`;

export default content;
