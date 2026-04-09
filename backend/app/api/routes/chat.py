from fastapi import APIRouter
from pydantic import BaseModel

from app.services.rag import get_answer

router = APIRouter()

class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
def chat(req: ChatRequest):
    answer = get_answer(req.message)
    return {"reply": answer}