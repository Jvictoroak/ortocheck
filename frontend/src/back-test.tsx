import { useState } from "react";
import type { CheckResponse } from "./types";
import "./App.css";

const API_URL = "http://localhost:3001/check";

function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CheckResponse | null>(null);

  async function handleCheck() {
    if (!url.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Falha ao verificar o site.");
      }

      const data: CheckResponse = await response.json();
      setResult(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h1>OrtoCheck</h1>
      <p>Verifique a ortografia de todas as páginas de um site.</p>

      <div className="search-bar">
        <input
          type="text"
          placeholder="https://seusite.com.br"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={handleCheck} disabled={loading}>
          {loading ? "Verificando..." : "Verificar"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="results">
          <h2>
            {result.pagesChecked} página(s) verificada(s) em {result.siteUrl}
          </h2>

          {result.results.map((page) => (
            <div key={page.page} className="page-result">
              <h3>{page.page}</h3>

              {page.errors.length === 0 ? (
                <p className="ok">Nenhum erro encontrado ✅</p>
              ) : (
                <ul>
                  {page.errors.map((err, i) => (
                    <li key={i}>
                      <strong>{err.word}</strong> → {err.suggestion}
                      <br />
                      <span className="context">{err.context}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;