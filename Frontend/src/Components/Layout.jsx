import {Header} from "./Header.jsx";
import {Footer} from "./Footer.jsx";
import {Outlet} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Layout = () => {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition: Bounce
            />
        </>
    )
}