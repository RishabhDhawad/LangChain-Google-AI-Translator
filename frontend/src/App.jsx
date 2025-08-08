import { useState } from "react";
import QueryForm from "./components/QueryForm";
import TranslationOutput from "./components/TranslationOutpur";


function App() {
  const [result, setResult] = useState(null);

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h1>LangChain + Google AI Translator</h1>
      <QueryForm onResult={setResult} />
      <TranslationOutput result={result} />
    </div>
  );
}

export default App;
