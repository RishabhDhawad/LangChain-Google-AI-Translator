from fastapi import APIRouter
from app.schemas.request import QueryRequest
from app.schemas.response import MultiLangResponse

router = APIRouter()

@router.post("/process", response_model=MultiLangResponse)
async def process_query(request: QueryRequest):
    # Dummy return for now
    return {
        "original_query": request.query,
        "translations": {
            lang: f"{request.query} in {lang}" for lang in request.target_languages
        }
    }
