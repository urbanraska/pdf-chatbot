from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_ollama import OllamaLLM
from langchain_community.vectorstores import Chroma

vector_db = None

def create_vector_store(chunks):
    global vector_db

    embeddings = HuggingFaceEmbeddings(
        model_name="all-MiniLM-L6-v2"
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

    llm = OllamaLLM(
    model="phi3",
    num_predict=200
    )

    prompt = f"""
    Answer ONLY using the context below:

    {context}

    Question: {query}
    """

    response = llm.invoke(prompt)

    answer = response

    return answer