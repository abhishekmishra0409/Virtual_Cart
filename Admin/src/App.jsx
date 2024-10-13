import "./App.css";
import { BrowserRouter as Router, Routes, Route , Navigate} from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Resetpassword from "./pages/Resetpassword.jsx";
import Forgotpassword from "./pages/Forgotpassword.jsx";
import MainLayout from "./components/MainLayout.jsx";
import Enquiries from "./pages/Enquiries.jsx";
import Bloglist from "./pages/Bloglist.jsx";
import Blogcatlist from "./pages/Blogcatlist.jsx";
import Orders from "./pages/Orders.jsx";
import Customers from "./pages/Customers.jsx";
import Colorlist from "./pages/Colotlist.jsx";
import Categorylist from "./pages/Categorylist.jsx";
import Brandlist from "./pages/Brandlist.jsx";
import Productlist from "./pages/Productlist.jsx";
import Addblog from "./pages/Addblog.jsx";
import Addblogcat from "./pages/Addblogcat.jsx";
import Addcolor from "./pages/Addcolor.jsx";
import Addcat from "./pages/Addcat.jsx";
import Addbrand from "./pages/Addbrand.jsx";
import Addproduct from "./pages/Addproduct.jsx";
import Couponlist from "./pages/Couponlist.jsx";
import AddCoupon from "./pages/AddCoupon.jsx";
import ViewEnq from "./pages/ViewEnq.jsx";
import ViewOrder from "./pages/ViewOrder.jsx";

const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? children : <Navigate to="/" />;
};


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/reset-password" element={<Resetpassword />} />
                <Route path="/forgot-password" element={<Forgotpassword />} />
                <Route path="/admin" element={<ProtectedRoute> <MainLayout /> </ProtectedRoute>}>
                    <Route index element={<Dashboard />} />
                    <Route path="enquiries" element={<Enquiries />} />
                    <Route path="enquiries/:id" element={<ViewEnq />} />
                    <Route path="blog-list" element={<Bloglist />} />
                    <Route path="blog" element={<Addblog />} />
                    <Route path="blog/:id" element={<Addblog />} />
                    <Route path="coupon-list" element={<Couponlist />} />
                    <Route path="coupon" element={<AddCoupon />} />
                    <Route path="coupon/:id" element={<AddCoupon />} />
                    <Route path="blog-category-list" element={<Blogcatlist />} />
                    <Route path="blog-category" element={<Addblogcat />} />
                    <Route path="blog-category/:id" element={<Addblogcat />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="order/:id" element={<ViewOrder />} />
                    <Route path="customers" element={<Customers />} />
                    <Route path="list-color" element={<Colorlist />} />
                    <Route path="color" element={<Addcolor />} />
                    <Route path="color/:id" element={<Addcolor />} />
                    <Route path="list-category" element={<Categorylist />} />
                    <Route path="category" element={<Addcat />} />
                    <Route path="category/:id" element={<Addcat />} />
                    <Route path="list-brand" element={<Brandlist />} />
                    <Route path="brand" element={<Addbrand />} />
                    <Route path="brand/:id" element={<Addbrand />} />
                    <Route path="list-product" element={<Productlist />} />
                    <Route path="product" element={<Addproduct />} />
                    <Route path="product/:id" element={<Addproduct />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
