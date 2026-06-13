from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from app.services.hf_llm import generate_answer

vector_db = None

def create_vector_store(chunks):
    global vector_db

    embeddings = HuggingFaceEmbeddings(
        model_name="BAAI/bge-small-en-v1.5"
    )

    vector_db = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory="app/db/chroma"
    )


def get_answer(query: str):
    global vector_db

    if vector_db is None:
        return "No PDF uploaded yet."

    docs = vector_db.similarity_search(query, k=2)

    context = "\n".join([doc.page_content for doc in docs])


    prompt = f"""
    You are a PDF assistant.

    Use ONLY the provided context.

    If the answer is not present in the context,
    reply with:

    "I could not find this information in the uploaded PDF."

    Context:
    {context}

    Question:
    {query}

    Answer:
    """

    answer = generate_answer(prompt)

    return answer