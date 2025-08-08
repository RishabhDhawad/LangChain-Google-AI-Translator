from pydantic import BaseModel
from typing import Dict

class MultiLangResponse(BaseModel):
    original_query: str
    translations: Dict[str, str]
