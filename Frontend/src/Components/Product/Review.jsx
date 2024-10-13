import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { addProductReview } from "../../features/Product/ProductSlice.js";

function Review({ productId }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();
    const { productDetails, isLoading } = useSelector((state) => state.products);

    // Assuming productDetails contains the product data
    const reviews = productDetails?.ratings || [];
    const totalRating = productDetails?.totalrating || 0;

    const ratingChanged = (newRating) => {
        setRating(newRating);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating && comment) {
            const reviewData = {
                prodId: productId,
                star: rating,
                comment,
            };
            try {
                await dispatch(addProductReview(reviewData));
                setRating(0);
                setComment("");
            } catch (error) {
                console.error("Failed to submit review:", error);
            }
        }
    };

    return (
        <div>
            <section className="section-box mt-50">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="head-main mb-2">
                                <h3>Reviews</h3>
                            </div>
                            <div>
                                <Form onSubmit={handleSubmit}>
                                    <ReactStars
                                        count={5}
                                        onChange={ratingChanged}
                                        size={24}
                                        activeColor="#ffd700"
                                        value={rating}
                                    />
                                    <Form.Group controlId="formComment" className="mb-3">
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Comment"
                                            rows={5}
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button className="btn-buy" type="submit" disabled={isLoading}>
                                            {isLoading ? 'Sending...' : 'Send Review'}
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </div>
                            <div className="box-review mt-5">
                                <div className="row">
                                    <div className="col-lg-8">
                                        <div className="rating d-flex align-items-center mb-3">
                                            <ReactStars
                                                count={5}
                                                size={20}
                                                activeColor="#ffd700"
                                                value={totalRating}
                                                edit={false}
                                                isHalf={true}
                                            />
                                            <span className="font-x color-gray-500 ">({reviews.length})</span>
                                        </div>
                                        {reviews.length > 0 ? (
                                            reviews.map((review, index) => (
                                                <div key={index} className="box-review-content">
                                                    <div className={"rating d-flex align-items-center"}>
                                                    <span style={{ fontSize: '1.25rem', margin: '0', marginRight:'10px' }}>{review.postedby.firstname} {review.postedby.lastname}</span>
                                                    <div className="d-flex align-items-center">
                                                        <ReactStars
                                                            count={5}
                                                            size={20}
                                                            value={Number(review.star)}
                                                            edit={false}
                                                            activeColor="#ffd700"
                                                            half={true}
                                                        />
                                                    </div>
                                                    </div>
                                                    <p>{review.comment}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No reviews yet.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Review;
