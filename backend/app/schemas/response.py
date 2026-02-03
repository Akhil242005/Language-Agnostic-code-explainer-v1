from pydantic import BaseModel
from typing import List

class ExplanationStep(BaseModel):
    step: int
    node_type: str
    explanation: str

class ExplainResponse(BaseModel):
    status: str
    steps: List[ExplanationStep]
