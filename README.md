Securing AI Chatbot Applications Against Prompt Injection Attacks

A full-stack AI chatbot built as a research platform for studying prompt injection and indirect (document-based) injection attacks against LLM-powered applications — and the defenses that mitigate them.

This is my MSCS master's project at Northeastern Illinois University. The goal is not just to build a chatbot, but to use it as a realistic target: demonstrate how these attacks work, then design and measure a defense layer that reduces their success rate.

Overview

Companies are deploying LLM-powered chatbots faster than they can secure them. Two of the least-solved threats are:

Prompt injection — a user hides instructions in their input to override the application's intended behavior.
Indirect injection (RAG poisoning) — malicious instructions hidden inside documents the chatbot retrieves, so the attack fires without the user doing anything directly.

This project builds a working "HR Assistant" chatbot that answers employee questions from a company knowledge base, then studies both attack classes against it and evaluates a guardrail defense.

Tech Stack
Layer	Technology
Frontend	React (Vite)
Backend	FastAPI (Python)
LLM	Anthropic Claude API
Database	PostgreSQL
Retrieval	Keyword-based document retrieval (RAG)
Architecture
React chat UI  ->  FastAPI backend  ->  Document retrieval (PostgreSQL)
                          |
                          v
                   Anthropic Claude API
                          |
                          v
            (planned) Security / guardrail layer

The backend receives a user message, retrieves the most relevant HR policy documents from PostgreSQL, injects them into the prompt as context, and asks Claude to answer using only that content.

Features
Full-stack chat application with a polished React interface
FastAPI backend connected to the Anthropic Claude API
PostgreSQL knowledge base of HR policy documents
Retrieval-Augmented Generation (RAG): answers grounded in real documents
(In progress) Security testing suite: direct and indirect prompt-injection attacks
(Planned) Guardrail / detection layer with before/after effectiveness measurement
Project Status
[x] Backend API (FastAPI + Claude)
[x] React chat frontend
[x] PostgreSQL database and document store
[x] RAG retrieval layer
[ ] Attack suite (direct + indirect injection)
[ ] Defense / guardrail layer
[ ] Evaluation and results
Getting Started
Prerequisites
Python 3.12+
Node.js 20+
PostgreSQL 18+
An Anthropic API key
Setup

1. Clone the repository

bash
git clone https://github.com/hassamrahman8850-source/Full-stack-AI-chatbot-for-prompt-injection-security-research.git
cd Full-stack-AI-chatbot-for-prompt-injection-security-research

2. Configure environment variables

Create a .env file in the project root (this file is gitignored and never committed):

ANTHROPIC_API_KEY=your_anthropic_api_key
DB_PASSWORD=your_postgres_password

3. Set up the database

Create a PostgreSQL database named hr_knowledge, then load the sample documents:

bash
pip install -r requirements.txt
python setup_db.py

4. Run the backend

bash
python -m uvicorn main:app --reload

The backend runs at http://127.0.0.1:8000 (interactive docs at /docs).

5. Run the frontend

bash
cd frontend
npm install
npm run dev

The frontend runs at http://localhost:5173.

Security Research (Upcoming)

The core research phase will:

Catalog prompt-injection attack techniques against the chatbot, mapped to the OWASP Top 10 for LLM Applications.
Demonstrate indirect injection by poisoning a document in the knowledge base.
Implement a guardrail layer (input/output inspection, instruction–data separation, retrieved-content sanitization).
Measure the reduction in successful attacks with the defense enabled vs. disabled.
Author

Hassamul Mohammed — MSCS, Northeastern Illinois University

Disclaimer

This project is for educational and research purposes. All attack demonstrations are performed against the author's own controlled application.