from pydantic import BaseModel
from typing import List


class CodeResponse(BaseModel):
    explanations: List[str]