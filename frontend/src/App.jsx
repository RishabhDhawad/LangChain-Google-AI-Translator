import { useState } from "react";
import QueryForm from "./components/QueryForm";
import TranslationOutput from "./components/TranslationOutpur";


function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="app-title">LangChain + Google AI Translator</h1>
        <p className="app-subtitle">Ask in any language, get multilingual answers.</p>
        <QueryForm onResult={setResult} />
      </div>

      <div className="card" style={{ marginTop: "1rem" }}>
        <TranslationOutput result={result} />
      </div>
    </div>
  );
}

export default App;
