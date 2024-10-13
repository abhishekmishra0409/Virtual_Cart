import React, { useEffect } from 'react';
import { ProductCard } from "../Common/ProductCard.jsx";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendingProducts } from '../../features/Product/ProductSlice.js';

export const TrendingThisWeek = () => {
    const dispatch = useDispatch();

    // Get products from the Redux store
    const { trendingProducts, isLoading, isError } = useSelector((state) => state.products);

    // Fetch trending products when the component is mounted
    useEffect(() => {
        dispatch(fetchTrendingProducts());
    }, [dispatch]);

    if (isLoading) {
           return (
            <div className="loader">
                <p>Loading...</p>
            </div>
        );
    }

    if (isError) {
        return <div>Error loading products</div>;
    }

    return (
        <>
            <section className="section-box mt-30 pt-3" style={{ backgroundColor: "#F0F3F8" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="head-main mb-5">
                                <h3>Top Selling Products</h3>
                                <p className="font-base text-gray-500">Special products this month.</p>
                                <div className="box-button-slider">
                                    <div className="swiper-button-next swiper-button-next-group-2"></div>
                                    <div className="swiper-button-prev swiper-button-prev-group-2"></div>
                                </div>
                            </div>
                            <div className="box-swiper">
                                <Swiper
                                    modules={[Navigation, Pagination, Autoplay]}
                                    slidesPerView={5}
                                    spaceBetween={10}
                                    loop={true}
                                    navigation={{
                                        nextEl: '.swiper-button-next-group-2',
                                        prevEl: '.swiper-button-prev-group-2'
                                    }}
                                    autoplay={{ delay: 7500, disableOnInteraction: false }}
                                    pagination={false}
                                    style={{ height: '100%', width: "100%" }}
                                >
                                    {trendingProducts.length > 0 ? (
                                        trendingProducts.map((product) => (
                                            <SwiperSlide key={product._id}>
                                                <ProductCard product={product} />
                                            </SwiperSlide>
                                        ))
                                    ) : (
                                        <div>No trending products available.</div>
                                    )}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
