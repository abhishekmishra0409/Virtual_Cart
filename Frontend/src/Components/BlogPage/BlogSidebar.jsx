import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';
import { Navigation, Pagination } from 'swiper/modules';
import { getAllBlogCategory, getAllBlogs } from '../../features/Blog/BlogSlice.js';

export const BlogSideBar = () => {
    const dispatch = useDispatch();

    // Select categories and blogs from Redux store
    const blogState = useSelector((state) => state.blogs);
    const { categories = [], blogs = [] } = blogState;


    useEffect(() => {
        if (categories.length === 0) {
            dispatch(getAllBlogCategory());
        }
        if (blogs.length === 0) {
            dispatch(getAllBlogs());
        }
    }, [dispatch, categories.length, blogs.length]);

    // Limit to the first 9 blog posts
    const limitedBlogs = blogs.slice(0, 9);
    const chunkArray = (arr, size) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    };

    const blogSlides = chunkArray(limitedBlogs, 3);

    return (
        <div>
            {/* Sidebar and Blog Categories */}
            <div className="sidebar-border mb-5">
                <div className="sidebar-head">
                    <h6 className="color-gray-900">Blog Categories</h6>
                </div>
                <div className="sidebar-content">
                    <ul className="list-nav-arrow">
                        {categories.length > 0 ? (
                            categories.map((category, index) => (
                                <li key={index}>
                                    <a href={`/blogs/category/${category.title}`} className="no-underline flex justify-between items-center">
                                        {category.title}
                                    </a>
                                </li>
                            ))
                        ) : (
                            <li>
                                <div className="loader">
                                    <p>Loading...</p>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            {/* Blog Slider */}
            <div className="box-slider-item mb-30 mx-4">
            <div className="head-main pb-15 border-brand-2 d-flex">
                    <div>
                        <h5 className="color-gray-900">Trending News</h5>
                    </div>
                    <div className="box-button-slider">
                        <div className="swiper-button-next swiper-button-next-group-1 top-0"></div>
                        <div className="swiper-button-prev swiper-button-prev-group-1 top-0"></div>
                    </div>
                </div>
                <div className="box-swiper">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        slidesPerView={1}
                        spaceBetween={10}
                        loop={true}
                        direction="horizontal"
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev'
                        }}
                        autoplay={{ delay: 10000, disableOnInteraction: false }}
                        pagination={false}
                    >
                        {blogSlides.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <div className="swiper-slide-content">
                                    {slide.map(post => (
                                        <div className="card-grid-style-2 card-none-border min-h-3" key={post._id}>
                                            <div className="image-box mw-84">
                                                <a href={`/blog/${post._id}`}>
                                                    <img src={post.images[0].url} alt={post.title} />
                                                </a>
                                            </div>
                                            <div className="info-right">
                                                <a className="color-brand-3 font-sm no-underline" href={`/blog/${post._id}`}>
                                                    {post.title}
                                                </a>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <span className="color-gray-500 font-xs mr-20">{new Date(post.createdAt).toLocaleDateString()}</span>
                                                        <span className="color-gray-500 font-xs">
                                                            {/*{post.readTime} <span className="color-gray-500 font-xs">Mins read</span>*/}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};
