from pydantic import BaseModel
from typing import Dict

class MultiLangResponse(BaseModel):
    original: str
    translations: Dict[str, str]
