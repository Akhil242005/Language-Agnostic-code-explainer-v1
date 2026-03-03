from fastapi import APIRouter
from pydantic import BaseModel
from app.dispatcher import dispatch_explanation

router = APIRouter()


class CodeRequest(BaseModel):
    code: str
    language: str


@router.post("/explain")
def explain_code(request: CodeRequest):
    explanations = dispatch_explanation(
        request.code,
        request.language
    )

    return {
        "explanations": explanations
    }