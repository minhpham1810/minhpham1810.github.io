const content = `# OIRA course catalog assistant

### A citation-based retrieval product for navigating Bucknell's academic catalog.

> **Status:** University preview, with production deployment planned for Fall 2026.

## Context

Course and program information lives across long catalog documents. Students and advisors need direct answers, but those answers must remain grounded in official university sources.

## My role

I developed the full-stack application: a Next.js interface, FastAPI services, authentication, persistent sessions, retrieval, and feedback instrumentation.

## System

Source PDFs and Google Docs are ingested, split, embedded, and stored in ChromaDB. A query moves through the FastAPI backend to the retrieval layer, which selects relevant passages for OpenAI. The generated response returns with citations to the source material.

SQLite and UUID-based sessions preserve chat history. Clerk protects user-specific history and feedback. Response ratings and fallback instrumentation create a path for evaluating retrieval quality rather than treating generation as a black box.

Query classification, conversation summarization, and user-context extraction improve retrieval and response quality across multi-turn conversations.

## Engineering decisions

- Ground every answer in retrieved university material and expose citations in the interface.
- Keep retrieval and generation behind a FastAPI boundary so the client remains independent of model orchestration.
- Persist session and feedback data separately from the vector store.
- Include OCR as an optional path for extracting information from schedule images.

## Demo

![video](oira_chatbot_demo.mp4)

## Stack

Python, FastAPI, LangChain, ChromaDB, OpenAI API, SQLAlchemy, SQLite, Next.js, React, Tailwind CSS, Clerk, and Jest.

## Repository

[View the OIRA Chatbot source](https://github.com/OIRA-Chatbot-Project/OIRA-Chatbot)`;

export default content;
