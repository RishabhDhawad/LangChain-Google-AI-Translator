const TranslationOutput = ({ result }) => {
  if (!result) return null;

  return (
    <div>
      <h2>Original Answer:</h2>
      <p>{result.original}</p>

      <h2>Translations:</h2>
      <ul>
        {Object.entries(result.translations).map(([lang, text]) => (
          <li key={lang}>
            <strong>{lang.toUpperCase()}:</strong> {text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TranslationOutput;
