import os
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

app = FastAPI(
    # title="Basic Translation API",
    # description="A simple API to translate text using LangChain and Gemini."
)

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

class TranslationRequest(BaseModel):
    text: str
    target_language: str

prompt = ChatPromptTemplate.from_template(
    "Translate the following text into {target_language}. "
    "Only return the final translated text and nothing else.\n"
    "Text: {text}"
)

model = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0)

chain = prompt | model

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/translate")
async def translate_text(request: TranslationRequest):
    result = chain.invoke({
        "text": request.text,
        "target_language": request.target_language
    })
    
    return {"translated_text": result.content}
