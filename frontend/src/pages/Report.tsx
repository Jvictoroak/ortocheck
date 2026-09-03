import { useState } from "react";
import "./Report.css";
import { ChevronRight, ChevronDown, ArrowRight } from "lucide-react";
import type { CheckResponse } from "../types";

interface ReportProps {
  result: CheckResponse;
  onReanalyze: () => void;
  onGoHome: () => void;
}

type FilterType = "all" | "errors" | "clean";

export default function Report({ result, onReanalyze, onGoHome}: ReportProps) {
  const [expandedPages, setExpandedPages] = useState<string[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");

  const pagesWithErrors = result.results.filter((p) => p.errors.length > 0);
  const pagesWithoutErrors = result.results.filter((p) => p.errors.length === 0);
  const totalErrors = result.results.reduce((sum, p) => sum + p.errors.length, 0);

  const filteredResults = result.results.filter((page) => {
    if (filter === "errors") return page.errors.length > 0;
    if (filter === "clean") return page.errors.length === 0;
    return true;
  });

  function toggleExpanded(pageUrl: string) {
    setExpandedPages((current) =>
      current.includes(pageUrl)
        ? current.filter((url) => url !== pageUrl)
        : [...current, pageUrl]
    );
  }

  return (
    <section className="report">
      <div className="content-95">
        <div className="content">
          <div className="steps">
            <div className="text t4 current"><p>01 Enter URL</p></div>
            <div className="line"></div>
            <div className="text t4 current"><p>02 Scan website</p></div>
            <div className="line"></div>
            <div className="text t4 current"><p>03 Get report</p></div>
          </div>

          <div className="titulo text t10"><p>Spelling Report</p></div>
          <div className="text t1 page-time"><p>{result.pagesChecked} pages analyzed</p></div>

          <div className="summary">
            <div className="card">
              <div className="text t12 error-count"><p>PAGES WITHOUT ERRORS</p></div>
              <div className="number text t13"><p>{pagesWithoutErrors.length}</p></div>
            </div>
            <div className="card">
              <div className="text t12 error-count"><p>PAGES WITH ERRORS</p></div>
              <div className="number text t13"><p>{pagesWithErrors.length}</p></div>
            </div>
            <div className="card">
              <div className="text t12 error-count"><p>ERRORS FOUND</p></div>
              <div className="number text t13"><p>{totalErrors}</p></div>
            </div>
          </div>

          <div className="buttons">
            <div className="filters">
              <div
                className={`filter text t14 ${filter === "all" ? "current" : ""}`}
                onClick={() => setFilter("all")}
              >
                <p>All Pages</p>
              </div>
              <div
                className={`filter text t14 ${filter === "errors" ? "current" : ""}`}
                onClick={() => setFilter("errors")}
              >
                <p>With Errors</p>
              </div>
              <div
                className={`filter text t14 ${filter === "clean" ? "current" : ""}`}
                onClick={() => setFilter("clean")}
              >
                <p>No Errors</p>
              </div>
            </div>
            <button className="reanalyze-button button" onClick={onReanalyze}>
              REANALYZE
            </button>
          </div>

          <div className="analysis">
            {filteredResults.length === 0 ? (
              <p className="text t4 empty-state">No pages match this filter.</p>
            ) : (
              filteredResults.map((page) => {
                const hasErrors = page.errors.length > 0;
                const isExpanded = expandedPages.includes(page.page);
                return (
                  <div key={page.page} className="analysis-item">
                    <div
                      className={`row ${hasErrors ? "error" : "clean"} ${hasErrors ? "clickable" : ""}`}
                      onClick={() => hasErrors && toggleExpanded(page.page)}
                    >
                      <div className="state text t15">
                        <p>{hasErrors ? "ERROR" : "CLEAN"}</p>
                      </div>
                      <div className="page text t3">
                        <p>{new URL(page.page).pathname || "/"}</p>
                      </div>
                      <div className="count">
                        <div className="text t16">
                          <p>{page.errors.length} Errors</p>
                        </div>
                        {hasErrors &&
                          (isExpanded ? (
                            <ChevronDown size={18} color="rgba(17,17,17,0.75)" strokeWidth={2} />
                          ) : (
                            <ChevronRight size={18} color="rgba(17,17,17,0.75)" strokeWidth={2} />
                          ))}
                      </div>
                    </div>
                    {hasErrors && isExpanded && (
                      <div className="error-details">
                        {page.errors.map((error, i) => (
                          <div key={i} className="error-item">
                            <div className="error-words">
                              <div className="text t11 word-wrong word"><p>{error.word}</p></div>
                              <ArrowRight size={14} color="rgba(17,17,17,0.75)" />
                              <div className="text t11 word-right word"><p>{error.suggestion}</p></div>
                            </div>
                            <div className="text t4 error-context">
                              <p>{error.context}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
          <button className="back-button button" onClick={onGoHome}>
            <span>BACK TO SEARCH</span>
          </button>
        </div>
      </div>
    </section>
  );
}