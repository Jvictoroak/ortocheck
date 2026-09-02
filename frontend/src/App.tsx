import './reset.css'
import Home from "./components/Home";
import Header from './components/Header';
import Loading from './components/Loading';
import Report from './components/Report';

export default function App() {
    return(
        <>
            <Header/>
            {/* <Home/> */}
            {/* <Loading/> */}
            <Report/>
        </>
    )
}