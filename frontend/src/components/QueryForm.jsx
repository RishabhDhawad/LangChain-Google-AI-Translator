import { useState } from "react";
import axios from "axios";

const languageOptions = [
  { code: "hi", label: "Hindi" },
  { code: "fr", label: "French" },
  { code: "es", label: "Spanish" },
  { code: "de", label: "German" },
  { code: "zh", label: "Chinese" },
];

const QueryForm = ({ onResult }) => {
  const [query, setQuery] = useState("");
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLangChange = (e) => {
    const { value, checked } = e.target;
    if (checked) setLanguages((prev) => [...prev, value]);
    else setLanguages((prev) => prev.filter((lang) => lang !== value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!query.trim()) {
      setError("Please enter a question.");
      return;
    }
    if (languages.length === 0) {
      setError("Please select at least one target language.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/api/v1/process", {
        query,
        target_languages: languages,
      });
      onResult(response.data);
    } catch (err) {
      console.error("API Error:", err);
      setError("Something went wrong while processing your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2 className="section-title">Ask a Question</h2>

      <div className="form-group">
        <label htmlFor="question" className="label">Your question</label>
        <textarea
          id="question"
          className="textarea"
          rows={5}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your question here"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <span className="label">Target languages</span>
        <div className="checkbox-grid">
          {languageOptions.map(({ code, label }) => {
            const checked = languages.includes(code);
            return (
              <label key={code} className={`checkbox-pill ${checked ? "checked" : ""}`}>
                <input
                  type="checkbox"
                  value={code}
                  checked={checked}
                  onChange={handleLangChange}
                  disabled={loading}
                />
                <span>{label}</span>
              </label>
            );
          })}
        </div>
        <div className="helper-text">{languages.length} selected</div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Processing…" : "Get Answer & Translations"}
        </button>
      </div>
    </form>
  );
};

export default QueryForm;
