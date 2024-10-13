import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, resetProductState, addToWishlist } from "../features/Product/ProductSlice.js";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import ReactStars from "react-rating-stars-component";
import { addToCart } from "../features/Cart/CartSlice.js";
import Review from "../Components/Product/Review.jsx";

export const SingleProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const { productDetails, isLoading, isError, message } = useSelector((state) => state.products);
    const [selectedImage, setSelectedImage] = useState("");
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        dispatch(fetchProductDetails(id));
        return () => {
            dispatch(resetProductState());
        };
    }, [dispatch, id]);

    useEffect(() => {
        // Set the default selected image after product details are fetched
        if (productDetails?.images?.length) {
            setSelectedImage(productDetails.images[0].url);
        }
    }, [productDetails]);

    const handleAddToWishlist = (prodId) => (e) => {
        e.preventDefault();
        dispatch(addToWishlist(prodId));
    };

    const handleQuantityChange = (operation) => {
        setQuantity((prevQuantity) =>
            operation === "increment" ? prevQuantity + 1 : Math.max(1, prevQuantity - 1)
        );
    };

    const handleBuyNow = (product) => {
        setLoading(true);

        const productData = {
            productId: product._id,
            quantity: quantity,
            color: product.color[0]._id,
            price: product.price,
        };
        dispatch(addToCart(productData));
        setLoading(false);

        navigate("/cart");
    };

    const handleAddToCart = (product) => (e) => {
        e.preventDefault();
        const productData = {
            productId: product._id,
            quantity: quantity,
            color: product.color[0]._id,
            price: product.price,
        };
        dispatch(addToCart(productData));
    };

    const handleThumbnailClick = (url) => {
        setSelectedImage(url);
    };

    if (isLoading) {
        return (
            <div className="loader">
                <p>Loading...</p>
            </div>
        );
    }

    if (!productDetails || isError) {
        return <div>{isError ? message : "Product not found."}</div>;
    }

    return (
        <>
        <section className="section-box shop-template">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="gallery-image">
                            <div className="galleries">
                                {/* Detail Gallery */}
                                <div className="detail-gallery">
                                    <Zoom>
                                        <img
                                            src={selectedImage}
                                            alt="Selected Product"
                                            style={{ width: "100%", borderRadius: "10px" }}
                                        />
                                    </Zoom>
                                </div>

                                {/* Thumbnail Slider */}
                                <div className="slider-nav-thumbnails">
                                    {productDetails.images.map((img, index) => (
                                        <div
                                            key={index}
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleThumbnailClick(img.url)}
                                        >
                                            <img src={img.url} alt={`Thumbnail ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <h3 className="color-brand-3 mb-2">{productDetails.title}</h3>
                        <div className="rating mt-1 d-flex align-items-center">
                            <ReactStars count={5}
                                        value={productDetails.totalrating || 0}
                                        edit={false}
                                        size={20}
                                        activeColor="#ffd700"
                                        isHalf={true}
                            />
                            <span className="font-xs color-gray-500"> ({productDetails.ratings?.length || 0})</span>
                        </div>
                        <div className="border-bottom pt-10 mb-2"></div>
                        <div className="box-product-price">
                            <h3 className="color-brand-3 price-main d-inline-block mr-10">
                                &#8377;{Number(productDetails.price).toLocaleString('en-IN')}
                            </h3>
                        </div>
                        <ul className="list-features">
                            <p dangerouslySetInnerHTML={{__html: productDetails?.description || "No description available"}}/>
                        </ul>
                        <div className="buy-product mt-20">
                            <p className="font-sm mb-2">Quantity</p>
                            <div className="box-quantity">
                                <div className="input-quantity">
                                    <input
                                        className="font-xl color-brand-3"
                                        type="text"
                                        value={quantity}
                                        readOnly
                                    />
                                    <span className="minus-cart"
                                          onClick={() => handleQuantityChange("decrement")}></span>
                                    <span className="plus-cart"
                                          onClick={() => handleQuantityChange("increment")}></span>
                                </div>
                                <div className="button-buy">
                                    <a className="btn btn-cart" href="#" onClick={handleAddToCart(productDetails)}>
                                        Add to cart
                                    </a>
                                    <a className="btn btn-buy" href="#"
                                       onClick={(e) => {
                                           e.preventDefault();
                                           handleBuyNow(productDetails);
                                       }}>
                                        Buy now
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="border-bottom pt-30 mb-20"></div>
                        <a href="#" className="mr-30 no-underline" onClick={handleAddToWishlist(id)}>
                            <span className="btn btn-wishlist mr-5 opacity-100 transform-none"></span>
                            <span className="font-md color-gray-900">Add to Wishlist</span>
                        </a>
                        <div className="info-product mt-20 font-md color-gray-900">
                            Category: {productDetails.category?.title}<br/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Review productId = {id}/>
        </>
);
};
