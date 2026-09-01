import './Loading.css'

export default function Loading(){
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
                        <div className="text t4"><p>https://example.com</p></div>
                    </div>
                    <div className="loader">
                        <div className="texts">
                            <div className="text t11"><p>Scanning Content</p></div>
                            <div className="text t11"><p>32/48 pages</p></div>
                        </div>
                        <div className="loading-bar"></div>
                        <div className="current-step">
                            <i></i>
                            <div className="text t12"><p>Parsing /services/enterprise-cloud...</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}