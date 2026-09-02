import "./Report.css";
import { ChevronRight } from "lucide-react";
import type { CheckResponse } from "../types";

interface ReportProps {
  result: CheckResponse;
}

export default function Report({ result }: ReportProps) {
  const pagesWithErrors = result.results.filter((p) => p.errors.length > 0);
  const pagesWithoutErrors = result.results.filter(
    (p) => p.errors.length === 0,
  );
  const totalErrors = result.results.reduce(
    (sum, p) => sum + p.errors.length,
    0,
  );

  return (
    <section className="report">
      <div className="content-95">
        <div className="content">
          <div className="steps">
            <div className="text t4">
              <p>01 Enter URL</p>
            </div>
            <div className="line"></div>
            <div className="text t4">
              <p>02 Scan website</p>
            </div>
            <div className="line"></div>
            <div className="text t4 current">
              <p>03 Get report</p>
            </div>
          </div>
          <div className="titulo text t10">
            <p>Spelling Report</p>
          </div>
          <div className="text t1 page-time">
            <p>{result.pagesChecked} pages analyzed · 2 min 34 sec</p>
          </div>
          <div className="summary">
            <div className="card">
              <div className="text t12 error-count">
                <p>PAGES WITHOUT ERRORS</p>
              </div>
              <div className="number text t13">
                <p>{pagesWithoutErrors.length}</p>
              </div>
            </div>
            <div className="card">
              <div className="text t12 error-count">
                <p>PAGES WITH ERRORS</p>
              </div>
              <div className="number text t13">
                <p>{pagesWithErrors.length}</p>
              </div>
            </div>
            <div className="card">
              <div className="text t12 error-count">
                <p>ERRORS FOUND</p>
              </div>
              <div className="number text t13">
                <p>{totalErrors}</p>
              </div>
            </div>
          </div>
          <div className="filters">
            <div className="filter text t14 current">
              <p>All Pages</p>
            </div>
            <div className="filter text t14">
              <p>With Errors</p>
            </div>
            <div className="filter text t14">
              <p>No Errors</p>
            </div>
          </div>
          <div className="analysis">
            {result.results.map((page) => (
              <div
                key={page.page}
                className={`row ${page.errors.length > 0 ? "error" : "clean"}`}
              >
                <div className="state text t15">
                  <p>{page.errors.length > 0 ? "ERROR" : "CLEAN"}</p>
                </div>
                <div className="page text t3">
                  <p>{new URL(page.page).pathname || "/"}</p>
                </div>
                <div className="count">
                  <div className="text t16">
                    <p>{page.errors.length} Errors</p>
                  </div>
                  {page.errors.length > 0 && (
                    <ChevronRight
                      size={18}
                      color="rgba(17,17,17,0.75)"
                      strokeWidth={2}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
