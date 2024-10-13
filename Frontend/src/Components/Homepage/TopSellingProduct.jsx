import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopSellingProducts } from '../../features/Product/ProductSlice.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';
import { Navigation, Pagination, Autoplay, Grid } from 'swiper/modules';
import { SmallProductCard } from "../Common/SmallProductCard.jsx";

export const TopSellingProduct = () => {
    const dispatch = useDispatch();
    const { topSellingProducts, isLoading, isError } = useSelector((state) => state.products);
    const [swiperInstance, setSwiperInstance] = useState(null);

    useEffect(() => {
        dispatch(fetchTopSellingProducts());
    }, [dispatch]);

    useEffect(() => {
        if (swiperInstance) {
            swiperInstance.params.navigation.enabled = true;
            swiperInstance.navigation.update();
        }
    }, [swiperInstance]);

    if (isLoading)   return (
        <div className="loader">
            <p>Loading...</p>
        </div>
    );
    if (isError) return <div>Error loading products</div>;

    return (
        <section className="section-box mt-50">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="head-main mb-5">
                            <h3>Top Selling Products</h3>
                            <p className="font-base text-gray-500">Special products this month.</p>
                            <div className="box-button-slider">
                                {/* Swiper navigation buttons */}
                                <div className="swiper-button-next swiper-button-next-group-1"></div>
                                <div className="swiper-button-prev swiper-button-prev-group-1"></div>
                            </div>
                        </div>
                        <div className="box-swiper">
                            {topSellingProducts?.length > 0 ? (
                                <Swiper
                                    modules={[Navigation, Pagination, Autoplay, Grid]}
                                    slidesPerView={3}
                                    grid={{ rows: 2, fill: 'row' }}
                                    spaceBetween={10}
                                    loop={true}
                                    autoplay={{ delay: 7500, disableOnInteraction: false }}
                                    pagination={false}
                                    navigation={{
                                        nextEl: '.swiper-button-next-group-1',
                                        prevEl: '.swiper-button-prev-group-1',
                                    }}
                                    onSwiper={(swiper) => setSwiperInstance(swiper)}
                                    breakpoints={{
                                        640: { slidesPerView: 1 },
                                        768: { slidesPerView: 2 },
                                        1024: { slidesPerView: 3 },
                                    }}
                                >
                                    {topSellingProducts.map((product) => (
                                        <SwiperSlide key={product._id}>
                                            <SmallProductCard product={product} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : (
                                <div>No top-selling products available.</div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
