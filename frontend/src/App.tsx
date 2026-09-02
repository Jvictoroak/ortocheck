import { useState } from "react";
import  "./reset.css";
import Home from "./components/Home";
import Loading from "./components/Loading";
import Report from "./components/Report";
import type { CheckResponse, ProgressEvent, Screen } from "./types";

const API_URL = "http://localhost:3001/check";

function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState<ProgressEvent | null>(null);
  const [result, setResult] = useState<CheckResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleAnalyze(inputUrl: string) {
    setUrl(inputUrl);
    setError(null);
    setResult(null);
    setProgress(null);
    setScreen("loading");

    const eventSource = new EventSource(
      `${API_URL}?url=${encodeURIComponent(inputUrl)}`
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

    eventSource.addEventListener("error", () => {
      setError("Falha ao verificar o site.");
      setScreen("home");
      eventSource.close();
    });
  }

  if (screen === "loading") {
    return <Loading url={url} progress={progress} />;
  }

  if (screen === "report" && result) {
    return <Report result={result} />;
  }

  return <Home onAnalyze={handleAnalyze} error={error} />;
}

export default App;