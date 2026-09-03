import { useState } from "react";
import  "./reset.css";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Report from "./pages/Report";
import type { CheckResponse, ProgressEvent, Screen } from "./types";
import Header from "./components/Header";

const API_URL = "http://localhost:3001/check";



function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [url, setUrl] = useState("");
  const [language, setLanguage] = useState("pt-BR");
  const [progress, setProgress] = useState<ProgressEvent | null>(null);
  const [result, setResult] = useState<CheckResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  function runAnalysis(targetUrl: string, targetLanguage: string) {
    setUrl(targetUrl);
    setLanguage(targetLanguage);
    setError(null);
    setResult(null);
    setProgress(null);
    setScreen("loading");

    const eventSource = new EventSource(
      `${API_URL}?url=${encodeURIComponent(targetUrl)}&language=${encodeURIComponent(targetLanguage)}`
    );

    eventSource.addEventListener("progress", (e) => {
      const data: ProgressEvent = JSON.parse(e.data);
      setProgress(data);
    });

    eventSource.addEventListener("done", (e) => {
      const data: CheckResponse = JSON.parse(e.data);
      setResult(data);
      setScreen("report");
      eventSource.close();
    });

    eventSource.addEventListener("error", (e: MessageEvent) => {
      eventSource.close();
      setScreen("home");

      if (e.data) {
        try {
          const data = JSON.parse(e.data);
          setError(data.message);
        } catch {
          setError("Failed to verify the site.");
        }
      } else {
        setError("Unable to connect to the server. Please try again.");
      }
    });
  }

  function handleAnalyze(inputUrl: string, inputLanguage: string) {
    runAnalysis(inputUrl, inputLanguage);
  }

  function handleReanalyze() {
    runAnalysis(url, language);
  }

  function handleGoHome() {
    setScreen("home");
    setResult(null);
    setProgress(null);
    setError(null);
  }

  return (
    <>
      <Header />

      {screen === "loading" && (
        <Loading url={url} progress={progress} />
      )}

      {screen === "report" && result && (
        <Report result={result} onReanalyze={handleReanalyze} onGoHome={handleGoHome} />
      )}

      {screen === "home" && (
        <Home onAnalyze={handleAnalyze} error={error} />
      )}
    </>
  );
}

export default App;