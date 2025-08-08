 
🚀 LangChain + Google AI Multilingual Translator

📘 Overview
This is a lightweight FastAPI + Jinja app that translates user text into a selected target language using Google's Gemini via LangChain.
It serves a simple single-page UI at `/` and a JSON API at `POST /translate`.
Secrets are managed with a `.env` file containing `GOOGLE_API_KEY`.

✨ Key Features
- Clean, single-page UI built with Jinja templates + vanilla JS
- FastAPI backend using LangChain `ChatGoogleGenerativeAI`
- One-click translate: enter text, pick a target language, get instant output
- Simple JSON API at `POST /translate`
- .env-based configuration (no keys in code)

🧱 Architecture
- Backend: `main.py`
  - Serves HTML at `GET /` via `templates/index.html`
  - JSON translation API: `POST /translate`
  - LangChain pipeline: `ChatPromptTemplate` → `ChatGoogleGenerativeAI`
- Templates & Static
  - Templates: `templates/index.html`
  - Static assets: `static/style.css`, `static/script.js`
- Optional utility: `langchain_module.py`
  - Standalone helper using `google.generativeai` for multi-language mapping
- Schemas: `schemas.py` (Pydantic models that can be reused)

🧩 Requirements
- Python 3.10+

🛠️ Setup
1) Create a virtual environment (Windows PowerShell)
   python -m venv venv
   venv\Scripts\activate

2) Install dependencies
   pip install -r requirements.txt

3) Configure environment
   Create `.env` in project root:
   GOOGLE_API_KEY=your_gemini_api_key

4) Run the app
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload

   - 🔗 App URL: http://localhost:8000
   - 📚 Interactive docs (auto): http://localhost:8000/docs

📡 API Documentation
- Endpoints
  - GET / → renders `templates/index.html`
  - POST /translate → returns translated text

- Request body (JSON)
  {
    "text": "Hello, world!",
    "target_language": "Spanish"
  }

- Response (JSON)
  {
    "translated_text": "Hola, mundo!"
  }

- cURL example
  curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"text":"Good morning","target_language":"French"}' \
    http://localhost:8000/translate

🧠 Model Chains
- In `main.py`: `ChatPromptTemplate` + `ChatGoogleGenerativeAI` (gemini-1.5-flash, temperature=0)
- Prompt enforces: "Only return the final translated text and nothing else."
- `langchain_module.py` showcases a direct `google.generativeai` usage for multi-language mapping.

🌐 Frontend
Rendered with server-side templates (`Jinja2Templates`) and enhanced with a tiny JS script (`static/script.js`). No Node/React required.

🔒 Security
- Never commit your `.env` with `GOOGLE_API_KEY`.
- Rate limiting and auth are out-of-scope for this demo; add per your deployment needs.

🧰 Troubleshooting
- Missing GOOGLE_API_KEY
  - Ensure `.env` exists and contains a valid key.

- Import/module errors
  - Recreate venv and reinstall requirements.

- API returns 500
  - Check console logs; ensure the key has access to Gemini APIs.

📎 Useful Commands
- Run server (dev):
  uvicorn main:app --reload
- Freeze deps:
  pip freeze > requirements.txt

📦 Project Structure
```
  main.py
  langchain_module.py
  schemas.py
  templates/
    index.html
  static/
    style.css
    script.js
  requirements.txt
  .env (created by you)
```
