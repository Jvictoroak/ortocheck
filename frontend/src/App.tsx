import './reset.css'
import Home from "./components/Home";
import Header from './components/Header';
import Loading from './components/Loading';

export default function App() {
    return(
        <>
            <Header/>
            {/* <Home/> */}
            <Loading/>
        </>
    )
}