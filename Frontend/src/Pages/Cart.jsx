import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { getCart, deleteCartProduct, addToCart ,applyCoupon } from "../features/Cart/CartSlice.js";
import { useNavigate } from "react-router-dom";
import {Col, Row} from "react-bootstrap";

export const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart, cartTotal ,totalAfterDiscount , coupon , isLoading } = useSelector((state) => state.cart);
    const [localCart, setLocalCart] = useState(cart || []);
    const [loading, setLoading] = useState(false);
    const [newCoupon, setNewCoupon] = useState("");


    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    useEffect(() => {
        setLocalCart(cart);
    }, [cart]);

    const increaseQuantity = async (productId) => {
        setLoading(true); // Start loading
        setLocalCart((prevItems) => {
            const updatedCart = prevItems.map((item) => {
                // Check if productId exists and is valid
                if (item.productId && item.productId._id === productId) {
                    const newQuantity = item.quantity + 1;
                    // Dispatch the addToCart action with the updated quantity
                    dispatch(addToCart({ productId, quantity: newQuantity }));
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
            return updatedCart;
        });

        // console.log(coupon)

        // Wait for a brief moment to simulate loading
        await new Promise((resolve) => setTimeout(resolve, 500));
        setLoading(false); // Stop loading
        window.location.reload(); // Reload the page
    };

    const decreaseQuantity = async (productId) => {
        setLoading(true); // Start loading
        setLocalCart((prevItems) => {
            const updatedCart = prevItems.map((item) => {
                // Check if productId exists and is valid
                if (item.productId && item.productId._id === productId && item.quantity > 1) {
                    const newQuantity = item.quantity - 1;
                    // Dispatch the addToCart action with the updated quantity
                    dispatch(addToCart({ productId, quantity: newQuantity }));
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
            return updatedCart;
        });

        // Wait for a brief moment to simulate loading
        await new Promise((resolve) => setTimeout(resolve, 500));
        setLoading(false); // Stop loading
        window.location.reload(); // Reload the page
    };

    const handleQuantityChange = async (productId, value) => {
        const quantity = parseInt(value, 10);
        if (!isNaN(quantity) && quantity > 0) {
            setLoading(true); // Start loading
            setLocalCart((prevItems) => {
                const updatedCart = prevItems.map((item) => {
                    // Check if productId exists and is valid
                    if (item.productId && item.productId._id === productId) {
                        // Dispatch the addToCart action with the updated quantity
                        dispatch(addToCart({ productId, quantity }));
                        return { ...item, quantity };
                    }
                    return item;
                });
                return updatedCart;
            });

            // Wait for a brief moment to simulate loading
            await new Promise((resolve) => setTimeout(resolve, 500));
            setLoading(false); // Stop loading
            window.location.reload(); // Reload the page
        }
    };

    if (isLoading) {
        return (
            <div className="loader">
                <p>Loading...</p>
            </div>
        );
    }

    const handleDeleteProduct = (productId) => {
        dispatch(deleteCartProduct(productId)).then(() => {
            dispatch(getCart());
        });
    };

    const handleCheckout = () => {
        navigate("/checkout");
    };

    const handleApplyCoupon = () => {
        // console.log(coupon)
        if (newCoupon.trim() !== "") {
            dispatch(applyCoupon(newCoupon));
            setNewCoupon("");

        }
    };

    return (
        <section className="section-box shop-template">
            <div className="container">
                <div className="row">
                    <div className="col-lg-9">
                        <div className="box-carts">
                            <div className="head-wishlist">
                                <div className="item-wishlist">
                                    <div className="wishlist-product">
                                        <span className="font-md-bold color-brand-3">Product</span>
                                    </div>
                                    <div className="wishlist-price">
                                        <span className="font-md-bold color-brand-3">Unit Price</span>
                                    </div>
                                    <div className="wishlist-status">
                                        <span className="font-md-bold color-brand-3">Quantity</span>
                                    </div>
                                    <div className="wishlist-action">
                                        <span className="font-md-bold color-brand-3">Subtotal</span>
                                    </div>
                                    <div className="wishlist-remove">
                                        <span className="font-md-bold color-brand-3">Remove</span>
                                    </div>
                                </div>
                            </div>
                            <div className="content-wishlist mb-20">
                                {localCart.length > 0 ? (
                                    localCart.map((item) => (
                                        <div key={item.productId?._id || Math.random()} className="item-wishlist">
                                            {item.productId ? (
                                                <>
                                                    <div className="wishlist-product">
                                                        <div className="product-wishlist">
                                                            <div className="product-image">
                                                                <a href={`/product/${item.productId._id}`} className="no-underline">
                                                                    <img
                                                                        src={
                                                                            item.productId.images && item.productId.images.length > 0
                                                                                ? item.productId.images[0].url
                                                                                : "/default-image-url.jpg"
                                                                        }
                                                                        alt={item.productId.title}
                                                                    />
                                                                </a>
                                                            </div>
                                                            <div className="product-info">
                                                                <a href={`/product/${item.productId._id}`} className="no-underline">
                                                                    <h6 className="color-brand-3">{item.productId.title}</h6>
                                                                </a>
                                                                <div className="rating mt-1 d-flex align-items-center">
                                                                    <ReactStars
                                                                        count={5}
                                                                        value={item.productId.totalrating || 0}
                                                                        size={16}
                                                                        activeColor="#ffd700"
                                                                        edit={false}
                                                                        isHalf={true}
                                                                    />
                                                                    <span className="font-xs color-gray-500">
                                                                        ({item.productId.ratings?.length || 0})
                                                                     </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="wishlist-price">
                                                        <h5 className="color-brand-3">
                                                            &#8377;{Number(item.productId.price).toLocaleString("en-IN")}
                                                        </h5>
                                                    </div>
                                                    <div className="wishlist-status">
                                                        <div className="box-quantity">
                                                            <div className="input-quantity">
                                                                <button
                                                                    className="minus-cart"
                                                                    onClick={() => decreaseQuantity(item.productId._id)}
                                                                ></button>
                                                                <input
                                                                    className="font-xl color-brand-3"
                                                                    type="text"
                                                                    value={item.quantity}
                                                                    onChange={(e) =>
                                                                        handleQuantityChange(item.productId._id, e.target.value)
                                                                    }
                                                                />
                                                                <button
                                                                    className="plus-cart"
                                                                    onClick={() => increaseQuantity(item.productId._id)}
                                                                ></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="wishlist-action">
                                                        <h5 className="color-brand-3">
                                                            &#8377;
                                                            {(item.quantity * item.productId.price).toLocaleString("en-IN")}
                                                        </h5>
                                                    </div>
                                                    <div className="wishlist-remove">
                                                        <button
                                                            className="btn btn-delete"
                                                            onClick={() => handleDeleteProduct(item.productId._id)}
                                                        ></button>
                                                    </div>
                                                </>
                                            ) : (
                                                <div>Loading product details...</div> // Fallback UI while waiting for product data
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div>Your cart is empty</div> // Handle empty cart case
                                )}

                            </div>
                            <div className="row mb-40">
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <a className="btn btn-buy w-auto arrow-back mb-10" href="/shop">Continue
                                        shopping</a>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 text-md-end">
                                    <button className="btn btn-buy w-auto update-cart mb-10"
                                            onClick={() => dispatch(getCart())}>Update cart
                                    </button>
                                </div>
                            </div>
                            <div className="row mb-50">
                                <div className="col-lg-6 col-md-6">
                                    <div className="box-cart-right p-20">
                                        <h5 className="font-md-bold mb-10">Apply Coupon</h5>
                                        <span className="font-sm-bold mb-5 d-inline-block color-gray-500">Using A Promo Code?</span>
                                        <div className="form-group d-flex">
                                            <input
                                                className="form-control mr-15"
                                                placeholder="Enter Your Coupon"
                                                value={newCoupon}
                                                onChange={(e) => setNewCoupon(e.target.value)}
                                            />
                                            <button className="btn btn-buy w-auto" onClick={handleApplyCoupon}>Apply
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3">
                        <div className="box-cart-right p-20">
                            <h5 className="font-md-bold">Cart Total</h5>
                            <div className="border-bottom mb-10">
                                <div className="row">
                                    <div className="col-6">
                                        <span className="font-md-bold color-gray-500">Subtotal:</span>
                                    </div>
                                    <div className="col-6 text-end">
                                        <h5 className="color-brand-3">
                                            &#8377;{cartTotal.toLocaleString('en-IN')}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="border-bottom mb-10">
                                <div className="row">
                                    <div className="col-6">
                                        <span className="font-md-bold color-gray-500">Shipping:</span>
                                    </div>
                                    <div className="col-6 text-end">
                                        <span className="color-gray-500">Free Shipping</span>
                                    </div>
                                </div>
                            </div>
                            {totalAfterDiscount > 0 && totalAfterDiscount < cartTotal && (
                                <div className="border-bottom mb-10">
                                    <div className="row">
                                        <div className="col-6">
                                            <span className="font-md-bold color-gray-500">Coupon:</span>
                                        </div>
                                        <div className="col-6 text-end">
                                            <span className="font-md-bold color-brand-3">{coupon}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="border-bottom mb-20">
                                <div className="row">
                                    <div className="col-6">
                                        <span className="font-md-bold color-gray-500">Total:</span>
                                    </div>
                                    <div className="col-6 text-end">
                                        <h5 className="color-brand-3">
                                            &#8377;{Number(totalAfterDiscount > 0 ? totalAfterDiscount : cartTotal).toLocaleString('en-IN')}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-30">
                                <button className="btn btn-buy w-100" onClick={handleCheckout}>
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </section>
    );
};
