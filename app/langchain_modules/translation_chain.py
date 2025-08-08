from langchain_google_genai import ChatGoogleGenerativeAI
from app.core.config import settings
from langchain.prompts import ChatPromptTemplate
from langchain.chains import LLMChain

llm = ChatGoogleGenerativeAI(
    model="gemini-pro",
    google_api_key=settings.GOOGLE_API_KEY,
    temperature=0.3
)

prompt = ChatPromptTemplate.from_template(
    "Translate the following text to {language}:\n\n{text}"
)

translation_chain = LLMChain(llm=llm, prompt=prompt)

def translate_text(text: str, language: str) -> str:
    result = translation_chain.run(language=language, text=text)
    return result