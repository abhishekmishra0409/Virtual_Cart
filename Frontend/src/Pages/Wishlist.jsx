import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWishlist } from '../features/User/UserSlice.js';
import { removeToWishlist } from "../features/Product/ProductSlice.js";
import Rating from 'react-rating-stars-component';
import { addToCart } from "../features/Cart/CartSlice.js"; // Import the addToCart action

export const Wishlist = () => {
    const dispatch = useDispatch();
    const { wishlist: storeWishlist, isLoading, isError, message } = useSelector((state) => state.auth);

    // Local state to manage wishlist
    const [wishlist, setWishlist] = useState([]);

    // Fetch wishlist on component mount
    useEffect(() => {
        dispatch(getWishlist());
    }, [dispatch]);

    // Sync store wishlist with local state
    useEffect(() => {
        if (storeWishlist) {
            setWishlist(storeWishlist);
        }
    }, [storeWishlist]);

    // Function to handle adding to cart
    const handleAddToCart = (product) => () => {
        const cartItem = {
            productId: product._id,
            color: product.color[0]._id,
            price: product.price,
            quantity: 1,
        };

        dispatch(addToCart(cartItem));
    };

    const handleRemoveToWishlist = (prodId) => () => {
        dispatch(removeToWishlist(prodId)).then(() => {
            // Update local state after removal
            setWishlist((prevWishlist) => prevWishlist.filter(item => item._id !== prodId));
        });
    };

    if (isLoading) {
        return (
            <div className="loader">
                <p>Loading...</p>
            </div>
        );
    }

    if (isError) {
        return <div>Error: {message}</div>;
    }

    return (
        <div className="box-wishlist">
            <div className="head-wishlist">
                <div className="item-wishlist">
                    <div className="wishlist-product">
                        <span className="font-md-bold color-brand-3">Product</span>
                    </div>
                    <div className="wishlist-price">
                        <span className="font-md-bold color-brand-3">Price</span>
                    </div>
                    <div className="wishlist-status">
                        <span className="font-md-bold color-brand-3">Stock status</span>
                    </div>
                    <div className="wishlist-action">
                        <span className="font-md-bold color-brand-3">Action</span>
                    </div>
                    <div className="wishlist-remove">
                        <span className="font-md-bold color-brand-3">Remove</span>
                    </div>
                </div>
            </div>
            <div className="content-wishlist">
                {wishlist.length === 0 ? (
                    <p>Your wishlist is empty.</p>
                ) : (
                    wishlist.map(item => (
                        <div key={item._id} className="item-wishlist">
                            <div className="wishlist-product">
                                <div className="product-wishlist">
                                    <div className="product-image">
                                        <a href={`/shop-single-product/${item._id}`}>
                                            <img src={item.images[0]?.url} alt={item.title} />
                                        </a>
                                    </div>
                                    <div className="product-info">
                                        <a href={`/shop-single-product/${item._id}`} className={"no-underline"}>
                                            <h6 className="color-brand-3">{item.title}</h6>
                                        </a>
                                        <div className="rating d-flex align-items-center">
                                            <Rating
                                                count={5}
                                                value={item.totalrating || 0}
                                                edit={false}
                                                size={20}
                                                activeColor="#ffd700"
                                                isHalf={true}
                                            />
                                            <span className="font-xs color-gray-500"> ({item.totalrating || 0})</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wishlist-price">
                                <h4 className="color-brand-3">&#8377;{Number(item.price).toLocaleString('en-IN')}</h4>
                            </div>
                            <div className="wishlist-status">
                                <span className="btn btn-gray font-md-bold color-brand-3">
                                    {item.quantity > 0 ? "In Stock" : "Out of Stock"}
                                </span>
                            </div>
                            <div className="wishlist-action">
                                {item.quantity > 0 ? (
                                    <button
                                        className="btn btn-cart font-sm-bold"
                                        onClick={handleAddToCart(item)}
                                    >
                                        Add to Cart
                                    </button>
                                ) : (
                                    <span className="font-sm-bold color-brand-3">Out of Stock</span>
                                )}
                            </div>
                            <div className="wishlist-remove">
                                <button
                                    className="btn btn-delete"
                                    aria-label="Remove From Wishlist"
                                    onClick={handleRemoveToWishlist(item._id)}
                                >
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
