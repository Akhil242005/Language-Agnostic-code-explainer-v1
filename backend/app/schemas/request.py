from pydantic import BaseModel, Field

class ExplainRequest(BaseModel):
    language: str = Field(..., example="python")
    code: str = Field(..., example="x = a + 2")
