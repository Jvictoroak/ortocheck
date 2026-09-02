import './Report.css'
import { ChevronRight } from 'lucide-react';


export default function Report(){
    return (
        <section className='report'>
            <div className="content-95">
                <div className="content">
                    <div className="steps">
                        <div className="text t4"><p>01 Enter URL</p></div>
                        <div className="line"></div>
                        <div className="text t4"><p>02 Scan website</p></div>
                        <div className="line"></div>
                        <div className="text t4 current"><p>03 Get report</p></div>
                    </div>
                    <div className="titulo text t10"><p>Spelling Report</p></div>
                    <div className="text t1 page-time"><p>48 pages analyzed · 2 min 34 sec</p></div>
                    <div className="summary">
                        <div className="card">
                            <div className="text t12 error-count"><p>PAGES WITHOUT ERRORS</p></div>
                            <div className="number text t13"><p>42</p></div>
                        </div>
                        <div className="card">
                            <div className="text t12 error-count"><p>PAGES WITH ERRORS</p></div>
                            <div className="number text t13"><p>5</p></div>
                        </div>
                        <div className="card">
                            <div className="text t12 error-count"><p>ERRORS FOUND</p></div>
                            <div className="number text t13"><p>18</p></div>
                        </div>
                    </div>
                    <div className="filters">
                        <div className="filter text t14 current"><p>All Pages</p></div>
                        <div className="filter text t14"><p>With Errors</p></div>
                        <div className="filter text t14"><p>No Errors</p></div>
                    </div>
                    <div className="analysis">
                        <div className="row clean">
                            <div className="state text t15">
                                <p>CLEAN</p>
                            </div>
                            <div className="page text t3"><p>/</p></div>
                            <div className="count">
                                <div className="text t16">
                                    <p>0 Errors</p>
                                </div>
                            </div>
                        </div>
                        <div className="row error">
                            <div className="state text t15"> 
                                <p>ERROR</p>
                            </div>
                            <div className="page text t3"><p>/</p></div>
                            <div className="count">
                                <div className="text t16">
                                    <p>6 Errors</p>
                                </div>
                                <ChevronRight size={18} color="rgba(17,17,17,0.75)" strokeWidth={2} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}