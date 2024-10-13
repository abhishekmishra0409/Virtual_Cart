import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from "./Components/Layout.jsx";
import { Home } from "./Pages/Home.jsx";
import { Contact } from "./Pages/Contact.jsx";
import { About } from "./Pages/About.jsx";
import { Shop } from "./Pages/Shop.jsx";
import { Blog } from "./Pages/Blog.jsx";
import { Wishlist } from "./Pages/Wishlist.jsx";
import { Register } from "./Pages/Register.jsx";
import { Login } from "./Pages/Login.jsx";
import { ForgotPassword } from "./Pages/ForgotPassword.jsx";
import { BlogSingle } from "./Pages/BlogSingle.jsx";
import { Term } from "./Pages/Term.jsx";
import { SingleProduct } from "./Pages/SingleProduct.jsx";
import { Cart } from "./Pages/Cart.jsx";
import { Checkout } from "./Pages/Checkout.jsx";
import { Accounts } from "./Pages/Accounts.jsx";
import { ProductByCategory } from "./Pages/ProductByCategory.jsx";
import { ProductByColor } from "./Pages/ProductByColor.jsx";
import { ProductByPrice } from "./Pages/ProductByPrice.jsx";
import {Notification} from "./Components/Accounts/Notification.jsx";
import {UserSetting} from "./Components/Accounts/UserSetting.jsx";
import {Order} from "./Components/Accounts/Order.jsx";
import {BlogByCategory} from "./Pages/BlogByCategory.jsx";

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="shop" element={<Shop />} />
                        <Route path="shop/category/:id" element={<ProductByCategory />} />
                        <Route path="shop/color/:id" element={<ProductByColor />} />
                        <Route path="shop/price/:gte/:lte" element={<ProductByPrice />} />
                        <Route path="blogs" element={<Blog />} />
                        <Route path="blogs/category/:id" element={<BlogByCategory />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="about" element={<About />} />
                        <Route path="wishlist" element={<Wishlist />} />
                        <Route path="register" element={<Register />} />
                        <Route path="login" element={<Login />} />
                        <Route path="forgot-password" element={<ForgotPassword />} />
                        <Route path="term" element={<Term />} />
                        <Route path="blog/:blogId" element={<BlogSingle />} />
                        <Route path="product/:id" element={<SingleProduct />} />
                        <Route path="cart" element={<Cart />} />
                        <Route path="checkout" element={<Checkout />} />
                        <Route path="accounts" element={<Accounts />}>
                            <Route index element={<Notification />} />
                            <Route path="wishlist" element={<Wishlist />} />
                            <Route path="settings" element={<UserSetting />} />
                            <Route path="orders" element={<Order />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
