import React, { useEffect, useState } from 'react';
import { Form, FormGroup, FormControl, FormCheck, Button, Col, Row } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";
import { useSelector, useDispatch } from "react-redux";
import { applyCoupon, getCart, createOrder } from "../features/Cart/CartSlice.js";

export const Checkout = () => {
    const { cart, cartTotal, totalAfterDiscount, coupon } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [newCoupon, setNewCoupon] = useState("");
    const [userInfo, setUserInfo] = useState({
        firstname: "",
        lastname: "",
        email: "",
        mobile: "",
        address: {
            street: "",
            city: "",
            state: "",
            country: "",
            pincode: ""
        }
    });
    const [COD, setCOD] = useState(true);

    useEffect(() => {
        dispatch(getCart());
        const storedUser = JSON.parse(localStorage.getItem("user")) || null;

        if (storedUser) {
            setUserInfo({
                firstname: storedUser.firstname,
                lastname: storedUser.lastname,
                email: storedUser.email,
                mobile: storedUser.mobile,
                address: storedUser.address || {
                    street: "",
                    city: "",
                    state: "",
                    country: "",
                    pincode: ""
                }
            });
        }
    }, [dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            address: {
                ...prevState.address,
                [name]: value,
            },
        }));
    };

    const handleApplyCoupon = () => {
        if (newCoupon) {
            dispatch(applyCoupon(newCoupon));
            setNewCoupon("");
        }
    };

    // New function to handle order creation
    const handlePlaceOrder = () => {
        // Create order payload, adjust as necessary
        const orderPayload = {
            COD,
            couponApplied: coupon,
        };
        dispatch(createOrder(orderPayload));
    };

    return (
        <section className="section-box shop-template">
            <div className="container">
                <div className="row">
                    <Col lg={6}>
                        <div className="box-border">
                            <Form>
                                <Row>
                                    <Col lg={12} className="mb-3">
                                        <FormGroup>
                                            <FormControl
                                                type="email"
                                                name="email"
                                                value={userInfo.email}
                                                onChange={handleInputChange}
                                                placeholder="Email*"
                                                className="font-sm"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={12} className="mb-3">
                                        <FormGroup>
                                            <FormCheck
                                                type="checkbox"
                                                id="checkboxOffers"
                                                label="Keep me up to date on news and exclusive offers"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={12} className="mb-3">
                                        <h5 className="font-md-bold color-brand-3 mt-15 mb-20">Shipping address</h5>
                                    </Col>
                                    <Col lg={6} className="mb-3">
                                        <FormGroup>
                                            <FormControl
                                                type="text"
                                                name="firstname"
                                                value={userInfo.firstname}
                                                onChange={handleInputChange}
                                                placeholder="First name*"
                                                className="font-sm"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6} className="mb-3">
                                        <FormGroup>
                                            <FormControl
                                                type="text"
                                                name="lastname"
                                                value={userInfo.lastname}
                                                onChange={handleInputChange}
                                                placeholder="Last name*"
                                                className="font-sm"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={12} className="mb-3">
                                        <FormGroup>
                                            <FormControl
                                                type="text"
                                                name="street"
                                                value={userInfo.address.street}
                                                onChange={handleAddressChange}
                                                placeholder="Address 1*"
                                                className="font-sm"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6} className="mb-3">
                                        <FormGroup>
                                            <FormControl
                                                type="text"
                                                name="city"
                                                value={userInfo.address.city}
                                                onChange={handleAddressChange}
                                                placeholder="City*"
                                                className="font-sm"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6} className="mb-3">
                                        <FormGroup>
                                            <FormControl
                                                type="text"
                                                name="state"
                                                value={userInfo.address.state}
                                                onChange={handleAddressChange}
                                                placeholder="State*"
                                                className="font-sm"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6} className="mb-3">
                                        <FormGroup>
                                            <FormControl
                                                type="text"
                                                name="country"
                                                value={userInfo.address.country}
                                                onChange={handleAddressChange}
                                                placeholder="Country*"
                                                className="font-sm"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6} className="mb-3">
                                        <FormGroup>
                                            <FormControl
                                                type="text"
                                                name="pincode"
                                                value={userInfo.address.pincode}
                                                onChange={handleAddressChange}
                                                placeholder="PostCode / ZIP*"
                                                className="font-sm"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                            <Row className="mt-20">
                                <Col lg={6} className="col-5 mb-20">
                                    <a className="btn font-sm-bold color-brand-1 arrow-back-1" href="/cart">  &nbsp; Return to Cart</a>
                                </Col>
                                <Col lg={6} className="col-7 mb-20 text-end">
                                    <button
                                        className="btn btn-buy w-auto arrow-next"
                                        onClick={handlePlaceOrder} // Trigger order creation
                                    >
                                        Place an Order
                                    </button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="box-border">
                            <h5 className="font-md-bold mb-20">Your Order</h5>
                            <div className="listCheckout">
                                {cart.length > 0 ? (
                                    cart.map(product => (
                                        <div key={product.productId} className="item-wishlist">
                                            <div className="wishlist-product">
                                                <div className="product-wishlist">
                                                    <div className="product-image">
                                                        <a href={`/product/${product.productId}`}>
                                                            <img src={product.productId.images[0].url} alt="Ecom" />
                                                        </a>
                                                    </div>
                                                    <div className="product-info">
                                                        <a href={`/product/${product.productId}`} className={"no-underline"}>
                                                            <h6 className="color-brand-3">{product.title}</h6>
                                                        </a>
                                                        <div className="rating mt-1 d-flex align-items-center">
                                                            <ReactStars
                                                                count={5}
                                                                size={16}
                                                                value={product.productId.totalrating}
                                                                edit={false}
                                                                activeColor="#ffd700"
                                                                isHalf={true}
                                                            />
                                                            <span className="font-xs color-gray-500"> ({product.productId.ratings.length})</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <h5 className="text-gray-500 mr-4">x{product.quantity}</h5>
                                                <h4 className="text-brand-3 font-bold text-lg text-right">
                                                    &#8377;{(product.price * product.quantity).toLocaleString('en-IN')}
                                                </h4>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No products in the cart.</p>
                                )}
                            </div>
                            <FormGroup className="d-flex mt-3 mb-2">
                                <FormControl
                                    type="text"
                                    placeholder="Enter Your Coupon"
                                    className="mr-3"
                                    value={newCoupon}
                                    onChange={(e) => setNewCoupon(e.target.value)}
                                />
                                <button className="btn btn-buy w-auto" onClick={handleApplyCoupon}>Apply</button>
                            </FormGroup>
                            <div className="form-group mb-0">
                                <Row className="mb-1">
                                    <Col lg={6}>
                                        <h6 className="color-gray-500">Total Price</h6>
                                    </Col>
                                    <Col lg={6} className="text-end">
                                        <h6 className="color-gray-500">&#8377;{cartTotal.toLocaleString('en-IN')}</h6>
                                    </Col>
                                </Row>
                                {totalAfterDiscount > 0 && (
                                    <Row>
                                        <Col lg={6}>
                                            <h6 className="color-gray-500">Discount Price</h6>
                                        </Col>
                                        <Col lg={6} className="text-end">
                                            <h6 className="color-gray-500">&#8377;{(cartTotal - totalAfterDiscount).toLocaleString('en-IN')}</h6>
                                        </Col>
                                    </Row>
                                )}
                                <Row>
                                    <Col lg={6}>
                                        <h6 className="color-gray-500">Total Amount</h6>
                                    </Col>
                                    <Col lg={6} className="text-end">
                                        <h4 className="color-brand-3 font-bold">
                                            &#8377;{Number(totalAfterDiscount > 0 ? totalAfterDiscount : cartTotal).toLocaleString('en-IN')}
                                        </h4>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </div>
            </div>
        </section>
    );
};
