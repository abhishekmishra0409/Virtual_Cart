import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";

export const Accounts = () => {
    const [activeTab, setActiveTab] = useState('notification');
    const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;

    // console.log(user);

    return (
        <section className="section-box shop-template mt-30">
            <div className="container box-account-template">
                <h3>{user ? user.firstname : "Guest"}</h3>
                <p className="font-md color-gray-500">
                    From your account dashboard, you can easily check & view your recent orders,
                    <br className="d-none d-lg-block" />
                    manage your shipping and billing addresses, and edit your password and account details.
                </p>
                <div className="box-tabs mb-100">
                    <ul className="nav nav-tabs nav-tabs-account" role="tablist">
                        <li>
                            <Link
                                to="/accounts"
                                className={`nav-link ${activeTab === 'notification' ? 'active' : ''} px-2`}
                                onClick={() => setActiveTab('notification')}
                            >
                                <span className="text-gray-500">Notification</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/accounts/wishlist"
                                className={`nav-link ${activeTab === 'wishlist' ? 'active' : ''}`}
                                onClick={() => setActiveTab('wishlist')}
                            >
                                <span className="text-gray-500">Wishlist</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/accounts/orders"
                                className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
                                onClick={() => setActiveTab('orders')}
                            >
                                <span className="text-gray-500">Orders</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/accounts/settings"
                                className={`nav-link ${activeTab === 'setting' ? 'active' : ''} px-2`}
                                onClick={() => setActiveTab('setting')}
                            >
                                <span className="text-gray-500">Setting</span>
                            </Link>
                        </li>
                    </ul>
                    <div className="mt-20 mb-40"></div>
                    <div className="tab-content mt-30">
                        <Outlet />
                    </div>
                </div>
            </div>
        </section>
    );
};
