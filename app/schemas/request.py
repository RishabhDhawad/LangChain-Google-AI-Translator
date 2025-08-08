from pydantic import BaseModel
from typing import List

class QueryRequest(BaseModel):
    query: str
    language: List[str]
    
    