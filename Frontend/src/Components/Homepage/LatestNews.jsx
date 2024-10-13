import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBlogs } from '../../features/Blog/BlogSlice'; // Import the getAllBlogs action
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import { BlogCard } from '../Common/BlogCard.jsx';

export const LatestNews = () => {
    const dispatch = useDispatch();

    // Fetch blogs from the Redux store
    const { blogs, isLoading, isError } = useSelector((state) => state.blogs);  // Ensure you're using the right state key (in this case 'blogs')

    useEffect(() => {
        dispatch(getAllBlogs());  // Fetch the blogs when the component mounts
    }, [dispatch]);

    if (isLoading)   return (
        <div className="loader">
            <p>Loading...</p>
        </div>
    );
    if (isError) return <p>Error loading blogs.</p>;

    // Limit the blogs to only the latest 10
    const latestBlogs = blogs.slice(0, 10);

    return (
        <>
            <section className="section-box mt-50 width-100">
                <div className="container">
                    <div className="head-main">
                        <h3 className="mb-2">Latest News &amp; Events</h3>
                        <p className="font-base color-gray-500">From our blog</p>
                        <div className="box-button-slider">
                            <div className="swiper-button-next swiper-button-next-group-4"></div>
                            <div className="swiper-button-prev swiper-button-prev-group-4"></div>
                        </div>
                    </div>
                </div>
                <div className="container mt-10">
                    <div className="box-swiper">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            loop={true}
                            slidesPerView={4}
                            spaceBetween={20}
                            navigation={{
                                nextEl: '.swiper-button-next-group-4',
                                prevEl: '.swiper-button-prev-group-4',
                            }}
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            pagination={false}
                            breakpoints={{
                                320: { slidesPerView: 1, spaceBetween: 10 },
                                768: { slidesPerView: 2, spaceBetween: 15 },
                                1024: { slidesPerView: 3, spaceBetween: 20 },
                            }}
                        >
                            {latestBlogs.map((blog) => (
                                <SwiperSlide key={blog._id}>
                                    <BlogCard blog={blog} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>
        </>
    );
};
