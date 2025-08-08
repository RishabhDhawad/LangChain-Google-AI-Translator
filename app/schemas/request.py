from pydantic import BaseModel
from typing import List

class QueryRequest(BaseModel):
    query: str
    target_languages: List[str]