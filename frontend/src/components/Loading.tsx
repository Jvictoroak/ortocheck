import "./Loading.css";
import type { ProgressEvent } from "../types";

interface LoadingProps {
  url: string;
  progress: ProgressEvent | null;
}

export default function Loading({ url, progress }: LoadingProps) {
    const current = progress?.current ?? 0;
    const total = progress?.total ?? 0;
    const percent = total > 0 ? (current / total) * 100 : 0;
    const stageLabel = progress?.stage === "checking" ? "Checking spelling" : "Scanning Content";

    return (
        <section className='loading'>
            <div className="content-95">
                <div className="content">
                    <div className="steps">
                        <div className="text t4"><p>01 Enter URL</p></div>
                        <div className="line"></div>
                        <div className="text t4 current"><p>02 Scan website</p></div>
                        <div className="line"></div>
                        <div className="text t4"><p>03 Get report</p></div>
                    </div>
                    <div className="titulo text t10"><p>Analyzing your website</p></div>
                    <div className="site">
                        <div className="text t4"><p>{url}</p></div>
                    </div>
                    <div className="loader">
                        <div className="texts">
                            <div className="text t11"><p>{stageLabel}</p></div>
                            <div className="text t11"><p>{current}/{total} pages</p></div>
                        </div>
                        <div className="loading-bar" style={{background: `linear-gradient(90deg, var(--color-3) ${percent}%, rgba(17,17,17,0.1) 0)`,}}></div>
                        <div className="current-step">
                            <i></i>
                            <div className="text t12"><p>{progress?.currentUrl || "Iniciando..."}</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}