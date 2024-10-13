import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogById, resetState } from '../features/Blog/BlogSlice.js';
import { BlogSideBar } from '../Components/BlogPage/BlogSidebar.jsx';

export const BlogSingle = () => {
    const { blogId } = useParams();
    const dispatch = useDispatch();

    // Get blog details from Redux store
    const { blogDetails, isLoading, isError, message } = useSelector((state) => state.blogs);

    useEffect(() => {
        if (blogId) {
            dispatch(getBlogById(blogId));
        }

        return () => {
            dispatch(resetState());
        };
    }, [dispatch, blogId]);

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
        <>
            <div className="section-box shop-template mt-30">
                <div className="mx-4">
                    <div className="row">
                        {/* Main content */}
                        <div className="col-lg-9 order-first order-lg-last">
                            {blogDetails ? (
                                <div className="blog-detail-content">
                                    <div className="image-box mb-4">
                                        <img
                                            src={blogDetails.images[0]?.url || 'assets/imgs/page/blog/default.jpg'}
                                            alt={blogDetails.title}
                                            className="img-fluid"
                                        />
                                    </div>
                                    <h1 className="color-brand-1 mb-4">{blogDetails.title}</h1>
                                    <p className="font-sm color-gray-700 mb-4">
                                        Published on {new Date(blogDetails.createdAt).toLocaleDateString()}
                                    </p>
                                    <div
                                        className="blog-description"
                                        dangerouslySetInnerHTML={{ __html: blogDetails.description }}
                                    ></div>
                                </div>
                            ) : (
                                <p>No blog details available.</p>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-3 order-last order-lg-first">
                            <BlogSideBar />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
