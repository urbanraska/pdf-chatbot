from fastapi import APIRouter, UploadFile, File
import shutil
import os

from app.utils.pdf_loader import load_pdf
from app.utils.chunking import split_text
from app.services.rag import create_vector_store

router = APIRouter()

UPLOAD_DIR = "app/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    file_path = f"{UPLOAD_DIR}/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Load PDF
    docs = load_pdf(file_path)

    # Split into chunks
    chunks = split_text(docs)

    # Create vector DB
    create_vector_store(chunks)

    return {"message": "PDF processed successfully"}