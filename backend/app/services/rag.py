import os
import shutil

from langchain_huggingface import HuggingFaceEndpointEmbeddings
from langchain_community.vectorstores import Chroma

from app.services.hf_llm import generate_answer

vector_db = None


def create_vector_store(chunks):
    global vector_db

    db_path = "app/db/chroma"

    # Remove old vector database
    if os.path.exists(db_path):
        shutil.rmtree(db_path)

    embeddings = HuggingFaceEndpointEmbeddings(
        model="sentence-transformers/all-MiniLM-L6-v2",
        huggingfacehub_api_token=os.getenv("HF_TOKEN")
    )

    vector_db = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=db_path
    )

    print("✅ Vector store created successfully")


def get_answer(query: str):
    global vector_db

    if vector_db is None:
        return "No PDF uploaded yet."

    docs = vector_db.similarity_search(query, k=5)

    print("\n========== RETRIEVED DOCS ==========\n")

    for i, doc in enumerate(docs):
        print(f"\n----- Chunk {i + 1} -----\n")
        print(doc.page_content[:1000])

    context = "\n\n".join(
        [doc.page_content for doc in docs]
    )

    prompt = f"""
    You are a PDF assistant.

    Answer ONLY using the information present in the provided context.

    If the answer is not present in the context, reply exactly:

    I could not find this information in the uploaded PDF.

    If the user asks:
    - what the document is about
    - summarize the document
    - explain the document
    - give an overview

    then generate a summary using ONLY the provided context.

    CONTEXT:
    {context}

    QUESTION:
    {query}

    ANSWER:
    """

    answer = generate_answer(prompt)

    return answer