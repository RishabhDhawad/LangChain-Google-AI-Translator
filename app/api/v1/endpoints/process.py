from fastapi import APIRouter
from app.schemas.request import QueryRequest
from app.schemas.response import MultiLangResponse
from app.services.processor import process_query as process_query_service
from fastapi import HTTPException

router = APIRouter()

@router.post("/process", response_model=MultiLangResponse)
async def process_query(request: QueryRequest):
    try:
        result = process_query_service(request)
        return result
    except Exception as e:
        # Surface a user-friendly error while keeping logs server-side if needed
        raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")
