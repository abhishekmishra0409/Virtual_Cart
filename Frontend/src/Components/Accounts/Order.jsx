import React, { useEffect, useState } from 'react';
import { getOrders } from "../../features/User/UserSlice.js";
import { useDispatch, useSelector } from "react-redux";

export const Order = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    // Pagination settings
    const itemsPerPage = 3; // Set how many orders to display per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the total pages and slice the orders for the current page
    const totalPages = Math.ceil(orders.length / itemsPerPage);
    const displayedOrders = orders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="tab-pane fade show active" id="tab-orders" role="tabpanel" aria-labelledby="tab-orders">
            {displayedOrders.map((order) => (
                <div className="box-orders" key={order._id}>
                    <div className="head-orders">
                        <div className="head-left">
                            <h5 className="mr-20">Order ID: {order.paymentIntent.method === 'COD' ? `#${order._id}` : `#${order.paymentIntent.amount}`}</h5>
                            <span className="font-md color-brand-3 mr-20">Date: {new Date(order.createdAt).toLocaleDateString()}</span>
                            <span className={`label-delivery label-${order.orderStatus.toLowerCase().replace(' ', '-')}`}>
                                {order.orderStatus}
                            </span>
                        </div>
                        <div className="head-right">
                            <a className="btn btn-buy font-sm-bold w-auto" href="#">
                                View Order
                            </a>
                        </div>
                    </div>
                    <div className="body-orders">
                        <div className="list-orders">
                            {order.products.map((item) => (
                                <div className="item-orders" key={item._id}>
                                    <div className="image-orders">
                                        <img src={item.product.images[0].url} alt={item.product.title} />
                                    </div>
                                    <div className="info-orders">
                                        <h5>{item.product.title}</h5>
                                    </div>
                                    <div className="quantity-orders">
                                        <h5>Quantity: {item.count < 10 ? `0${item.count}` : item.count}</h5>
                                    </div>
                                    <div className="price-orders">
                                        <h3>{`₹${item.product.price.toLocaleString()}`}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <a
                            className={`page-link page-prev cursor-pointer ${currentPage === 1 ? 'disabled' : ''}`}
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                        </a>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                        <li className="page-item" key={index}>
                            <a
                                className={`page-link cursor-pointer ${currentPage === index + 1 ? 'active' : ''}`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </a>
                        </li>
                    ))}
                    <li className="page-item">
                        <a
                            className={`page-link page-next cursor-pointer ${currentPage === totalPages ? 'disabled' : ''}`}
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
