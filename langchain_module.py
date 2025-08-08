import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel("gemini-pro")

def generate_translations(text: str, languages: list) -> dict:
    translations = {}

    for lang in languages:
        prompt = (
            f"Translate the following sentence into '{lang}' language:\n\n"
            f"Original: {text}"
        )

        response = model.generate_content(prompt)

        try:
            translation = response.text.strip()
            translations[lang] = translation
        except Exception as e:
            translations[lang] = f"Error: {str(e)}"

    return translations
