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

  const handleLangChange = (e) => {
    const { value, checked } = e.target;
    if (checked) setLanguages((prev) => [...prev, value]);
    else setLanguages((prev) => prev.filter((lang) => lang !== value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query || languages.length === 0) return alert("Fill all fields");

    try {
      setLoading(true);
      const response = await axios
        .post("http://localhost:8000/api/v1/process", {
          query: input,
          target_languages: selectedLanguages,
        })
        .then((res) => setTranslations(res.data.translations))
        .catch((err) => console.error(err));

      onResult(response.data);
    } catch (err) {
      console.error("API Error:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ask a Question</h2>
      <textarea
        rows={4}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type your question here"
      />
      <h3>Select Languages:</h3>
      {languageOptions.map(({ code, label }) => (
        <label key={code}>
          <input type="checkbox" value={code} onChange={handleLangChange} />
          {label}
        </label>
      ))}
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "Processing..." : "Submit"}
      </button>
    </form>
  );
};

export default QueryForm;
