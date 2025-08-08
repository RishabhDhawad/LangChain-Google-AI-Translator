from langchain_google_genai import ChatGoogleGenerativeAI
from app.core.config import settings
from langchain.prompts import ChatPromptTemplate
from langchain.chains import LLMChain

llm = ChatGoogleGenerativeAI(
    model="gemini-pro",
    google_api_key=settings.GOOGLE_API_KEY,
    temperature=0.7
)

prompt = ChatPromptTemplate.from_template("Answer the following: {question}")

google_chain = LLMChain(llm=llm, prompt=prompt)

def get_google_response(query: str) -> str:
    result = google_chain.run(question=query)
    return result