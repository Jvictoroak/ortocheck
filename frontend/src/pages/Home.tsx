import { useState } from "react";
import "./Home.css";
import { Globe } from "lucide-react";
import LanguageSelect from "../components/LanguageSelect";
import { isValidUrl } from "../utils/validation";

interface HomeProps {
onAnalyze: (url: string, language: string) => void;
error?: string | null;
}

export default function Home({ onAnalyze, error }: HomeProps) {
    const [inputUrl, setInputUrl] = useState("");
    const [language, setLanguage] = useState("en-US");
    const [validationError, setValidationError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);


    function handleSubmit() {
        if (isSubmitting) return; 

        const trimmedUrl = inputUrl.trim();

        if (!trimmedUrl) {
        setValidationError("Please enter a URL.");
        return;
        }

        if (!isValidUrl(trimmedUrl)) {
        setValidationError("Invalid URL. Make sure to include 'https://' at the start.");
        return;
        }

        setValidationError(null);
        setIsSubmitting(true);
        onAnalyze(trimmedUrl, language);
    }

    const displayError = validationError || error;

    return (
        <section className='home'>
            <div className="content-95">
                <div className="content">
                    <div className="steps">
                        <div className="text t4 current"><p>01 Enter URL</p></div>
                        <div className="line"></div>
                        <div className="text t4"><p>02 Scan website</p></div>
                        <div className="line"></div>
                        <div className="text t4"><p>03 Get report</p></div>
                    </div>
                    <div className="titulo text t5"><p>OrtoCheck</p></div>
                    <div className="text t1 description"><p>Enter your domain to automatically crawl all pages, scan content, and generate a precise developer-grade spelling audit in minutes.</p></div>
                    <div className="inputs">
                        <LanguageSelect value={language} onChange={setLanguage} />
                        <div className="input-container">
                        <Globe size={18} />
                        <input
                            className="input"
                            type="text"
                            placeholder="https://yourwebsite.com"
                            value={inputUrl}
                            onChange={(e) => setInputUrl(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                            disabled={isSubmitting}
                        />
                        <button
                            className="button text t4"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "..." : "ANALYZE"}
                        </button>
                        </div>
                    </div>

                    {displayError && <p className="text t14 error-message">{displayError}</p>}

                    <div className="text t7 instruction-title"><p>HOW IT WORKS</p></div>
                    <div className="instructions">
                        <div className="instruction">
                            <div className="number text t8"><p>01</p></div>    
                            <div className="text t9"><p>Enter your URL</p></div>    
                            <div className="text t4 instruction-description"><p>Paste your website URL. OrtoCheck acts as a standard compliance crawler.</p></div>    
                        </div>     
                        <div className="instruction">
                            <div className="number text t8"><p>02</p></div>    
                            <div className="text t9"><p>Wait a few minutes</p></div>    
                            <div className="text t4 instruction-description"><p>Our engine systematically traverses your pages and parses the copy.</p></div>    
                        </div>     
                        <div className="instruction">
                            <div className="number text t8"><p>03</p></div>    
                            <div className="text t9"><p>Get your report</p></div>    
                            <div className="text t4 instruction-description"><p>Identify exact pages containing mistakes with targeted typo suggestions.</p></div>    
                        </div>     
                    </div>
                </div>
            </div>
        </section>
    )
}


