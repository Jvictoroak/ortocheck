import './Header.css'
import logo from '../assets/logo.png'

export default function Header() {
    return (
        <header className='header'>
            <div className="content-95">
                <div className="content">
                    <div className="logo">
                        <img src={logo} alt="" className='icone' />
                        <div className="text t2"><p>OrtoCheck</p></div>
                    </div>
                    <div className="links">
                        <a href='https://github.com/Jvictoroak/ortocheck' target='_blank' className="text t3"><p>Documentation</p></a>
                    </div>
                </div>
            </div>
        </header>
    )
}