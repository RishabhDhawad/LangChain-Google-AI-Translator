# Business Logic
from app.schemas.request import QueryRequest
from app.schemas.response import MultiLangResponse
from app.langchain_modules.google_ai_chain import get_google_response
from app.langchain_modules.translation_chain import translate_text


def process_query(request: QueryRequest) -> MultiLangResponse:
    original_text = get_google_response(request.query)
    translations = {}
    
    for lang in request.language:
        try:
            translated = translate_text(original_text, lang)
            translations[lang] = translated
        except Exception as e:
            translations[lang] = f"Error translating: {str(e)}"
            
    return MultiLangResponse(
        original=original_text,
        translations=translations
    )
    

# Calls Gemini AI with user query.

# Iterates over languages and translates the result.

# Collects all translations into a dictionary.