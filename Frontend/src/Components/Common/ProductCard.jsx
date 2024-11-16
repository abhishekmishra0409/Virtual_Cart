import React from 'react';
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../../features/Product/ProductSlice.js";
import { addToCart } from "../../features/Cart/CartSlice.js";

export const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const productId = product._id;
    const productImage = product?.images?.[0]?.url || "default-image-url";
    const productSlug = product?.slug || "#";
    const productTitle = product?.title || "Unknown Product";
    const productPrice = product?.price || 0;
    const productBrand = product?.brand || "Unknown Brand";
    const productRating = product?.totalrating || 0;
    const productColor = product?.color[0]._id;
    const totalRating = product?.ratings?.length || 0;

    // console.log(productRating)

    const handleAddToWishlist = (prodId) => (e) => {
        e.preventDefault();
        dispatch(addToWishlist(prodId));
    };

    const handleAddToCart = (prodId) => (e) => {
        e.preventDefault();
        const productData = {
            productId: prodId,
            quantity: 1,
            color: productColor,
            price: productPrice,
        }
        // console.log(productData);
        dispatch(addToCart(productData));
    };

    return (
        <div className="card-grid-style-3 pt-1">
            <div className="card-grid-inner">
                <div className="tools">
                    <a
                        className="btn btn-wishlist btn-tooltip mb-10"
                        href="#"
                        aria-label="Add To Wishlist"
                        onClick={handleAddToWishlist(productId)}
                    >
                    </a>
                </div>

                <div className="image-box">
                    <span className="label bg-brand-2">-17%</span>
                    <a href={`/product/${productId}`}>
                        <img
                            src={productImage}
                            alt={productTitle}
                        />
                    </a>
                </div>

                <div className="info-right">
                    <a
                        className="font-xs color-gray-500 no-underline"
                    >
                        {productBrand.title}
                    </a>
                    <br/>
                    <a
                        className="color-brand-3 font-sm-bold no-underline"
                        href={`/product/${productId}`}
                    >
                        {productTitle}
                    </a>

                    <div className="rating d-flex align-items-center">
                        <ReactStars
                            count={5}
                            size={16}
                            activeColor="#ffd700"
                            value={productRating}
                            edit={false}
                            isHalf={true}
                        />
                        <span className="font-xs color-gray-500 ">({totalRating})</span>
                    </div>

                    <div className="price-info">
                        <strong className="font-lg-bold color-brand-3 price-main">
                            &#8377;{Number(productPrice).toLocaleString('en-IN')}
                        </strong>
                    </div>

                    <div className="mt-20 box-btn-cart">
                        <a
                            className="btn btn-cart"
                            href="#"
                            onClick={handleAddToCart(productId)}
                        >
                            Add To Cart
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
