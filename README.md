# PDF Chatbot

A full-stack PDF question-answering app with a FastAPI backend and a Next.js frontend.

## Overview

This project lets users upload PDF documents, build a local vector database from the PDF text, and ask questions against the uploaded content. The backend processes PDF uploads, creates embeddings, and serves a chat endpoint. The frontend provides a polished UI to upload files and chat with the document.

## Architecture

- `backend/` - FastAPI service for PDF upload, text chunking, vector store creation, and retrieval-augmented generation (RAG).
- `frontend/` - Next.js + Tailwind web app for file upload and chat interaction.

---

## Backend

### Tech stack

- Python 3.x
- FastAPI
- Uvicorn
- LangChain
- ChromaDB
- HuggingFace embeddings
- Ollama LLM integration
- PyPDF for PDF loading

### Key files

- `backend/requirements.txt` - Python dependencies.
- `backend/app/main.py` - FastAPI application entrypoint.
- `backend/app/api/routes/upload.py` - PDF upload endpoint.
- `backend/app/api/routes/chat.py` - chat endpoint.
- `backend/app/services/rag.py` - vector store creation and answer generation.
- `backend/app/utils/pdf_loader.py` - PDF loading logic.
- `backend/app/utils/chunking.py` - text splitting logic.

### Local setup

1. Create and activate a Python virtual environment.

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
```

2. Install dependencies.

```bash
python -m pip install -r requirements.txt
```

3. Start the backend server.

```bash
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### API endpoints

- `POST /upload` - Upload a PDF file. This saves the file, extracts text, splits it into chunks, and creates a local Chroma vector store.
- `POST /chat` - Send a user question and receive an answer based on the uploaded PDF context.

### Notes

- Uploaded PDFs are saved under `backend/app/uploads`.
- The Chroma database persists in `backend/app/db/chroma`.
- The app currently allows all origins via CORS for local frontend development.

---

## Frontend

### Tech stack

- Next.js 16
- React 19
- Tailwind CSS
- TypeScript
- Lucide icons

### Key files

- `frontend/package.json` - frontend dependencies and scripts.
- `frontend/app/page.tsx` - landing page.
- `frontend/components/Upload/FileUpload.tsx` - PDF upload component.
- `frontend/components/Chat/ChatContainer.tsx` - chat UI.
- `frontend/lib/api.ts` - frontend API client.

### Local setup

1. Install frontend dependencies.

```bash
cd frontend
npm install
```

2. Start the frontend app.

```bash
npm run dev
```

3. Open the app in your browser at:

```text
http://localhost:3000
```

### Usage

- Upload a PDF on the upload page.
- Ask questions in the chat interface.
- The frontend sends requests to the backend at `http://127.0.0.1:8000`.

---

## Running the full app

1. Start the backend service.
2. Start the frontend app.
3. Visit `http://localhost:3000` and use the UI to upload PDFs and chat.

## Troubleshooting

- If chat replies show `No PDF uploaded yet.`, upload a PDF first.
- Make sure the backend is running on `http://127.0.0.1:8000`.
- Confirm the local Ollama model (`phi3`) is available if using the Ollama integration.

## License

This project is provided as-is for experimentation and local development.
