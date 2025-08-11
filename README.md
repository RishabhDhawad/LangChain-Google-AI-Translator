  
# 🚀 LangChain + Google AI Multilingual Translator

<p align="left">
  <img alt="Python" src="https://img.shields.io/badge/Python-3.10%2B-blue" />
  <img alt="FastAPI" src="https://img.shields.io/badge/FastAPI-0.111%2B-009688" />
  <img alt="LangChain" src="https://img.shields.io/badge/LangChain-🦜-yellow" />
  <img alt="Gemini" src="https://img.shields.io/badge/Google%20Gemini-API-4285F4" />
</p>

## 📘 Overview

This is a lightweight FastAPI + Jinja app that translates user text into a selected target language using Google's Gemini via LangChain.
It serves a simple single-page UI at `/` and a JSON API at `POST /translate`.
Secrets are managed with a `.env` file containing `GOOGLE_API_KEY`.

## 📑 Table of Contents
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Requirements](#requirements)
- [Setup](#setup)
- [API Documentation](#api-documentation)
- [Frontend](#frontend)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [Useful Commands](#useful-commands)
- [Project Structure](#project-structure)

## ✨ Key Features
- Clean, single-page UI built with Jinja templates + vanilla JS
- FastAPI backend using LangChain `ChatGoogleGenerativeAI`
- One-click translate: enter text, pick a target language, get instant output
- Simple JSON API at `POST /translate`
- .env-based configuration (no keys in code)

## 🧱 Architecture
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

## 🧩 Requirements
- Python 3.10+
- A Google API key with Gemini access in `GOOGLE_API_KEY`
- pip >= 21
- Windows, macOS, or Linux

## 🛠️ Setup
1) Create a virtual environment
   - Windows (PowerShell)
     ```powershell
     python -m venv venv
     .\venv\Scripts\activate
     ```
   - macOS/Linux (bash/zsh)
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

2) Install dependencies
   ```bash
   pip install -r requirements.txt
   ```

3) Configure environment
   Create a `.env` file in the project root with:
   ```env
   GOOGLE_API_KEY=your_gemini_api_key
   ```

4) Run the app
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

   - 🔗 App URL: http://localhost:8000
   - 📚 Swagger docs: http://localhost:8000/docs

## 📡 API Documentation
- Endpoints
  - GET / → renders `templates/index.html`
  - POST /translate → returns translated text

- Request body schema (JSON)
  ```json
  {
    "text": "Hello, world!",
    "target_language": "Spanish"
  }
  ```

- Response schema (JSON)
  ```json
  {
    "translated_text": "Hola, mundo!"
  }
  ```

- cURL example
  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"text":"Good morning","target_language":"French"}' \
    http://localhost:8000/translate
  ```

  HTTPie
  ```bash
  http POST :8000/translate text="Good morning" target_language="French"
  ```

## 🧠 Model Chains
- In `main.py`: `ChatPromptTemplate` + `ChatGoogleGenerativeAI` (gemini-1.5-flash, temperature=0)
- Prompt enforces: "Only return the final translated text and nothing else."
- `langchain_module.py` showcases a direct `google.generativeai` usage for multi-language mapping.

## 🌐 Frontend
Rendered with server-side templates (`Jinja2Templates`) and enhanced with a tiny JS script (`static/script.js`). No Node/React required.

## 🔒 Security
- Never commit your `.env` with `GOOGLE_API_KEY`.
- Rate limiting and auth are out-of-scope for this demo; add per your deployment needs.

## 🧰 Troubleshooting
- Missing GOOGLE_API_KEY
  - Ensure `.env` exists and contains a valid key.

- Import/module errors
  - Recreate venv and reinstall requirements.

- API returns 500
  - Check console logs; ensure the key has access to Gemini APIs.
  - Double-check that your `requirements.txt` is installed in the active venv.

## 📎 Useful Commands
- Run server (dev):
  ```bash
  uvicorn main:app --reload
  ```
- Freeze deps:
  ```bash
  pip freeze > requirements.txt
  ```

## 📦 Project Structure
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

## 📝 Notes

- The app is synchronous at the API level; long inputs depend on upstream model latency.
- Consider adding caching, auth, and rate limiting for production.

## 🙏 Acknowledgements
- Built with FastAPI, LangChain, and Google Gemini.


## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Author

Made with 💖 by Rishabh Dhawad

