const TranslationOutput = ({ result }) => {
  if (!result) return null;

  return (
    <div className="output">
      <div>
        <h2 className="block-title">Original Answer</h2>
        <div className="original-answer">{result.original}</div>
      </div>

      <div>
        <h2 className="block-title">Translations</h2>
        <ul className="translations">
          {Object.entries(result.translations).map(([lang, text]) => (
            <li key={lang} className="translation-item">
              <span className="lang-chip">{lang.toUpperCase()}</span>
              <div>{text}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TranslationOutput;
