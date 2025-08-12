from pydantic import BaseModel
from typing import List, Dict

class TranslateRequest(BaseModel):
    text: str
    languages: List[str]  

class TranslateResponse(BaseModel):
    translations: Dict[str, str] 

