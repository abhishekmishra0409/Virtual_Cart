import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

export const FeaturedCategories = () => {
    return (
        <section className="section-box">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5">
                        <h3>Featured Categories</h3>
                        <p className="font-base">Choose your necessary products from these feature categories.</p>
                    </div>
                    <div className="col-lg-7">
                        <div className="list-brands">
                            <div className="box-swiper">
                                <Swiper
                                    modules={[Autoplay]}
                                    slidesPerView={6}
                                    spaceBetween={5}
                                    loop={true}
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }}

                                    className="swiper-group-7"
                                >
                                    {['acer.svg', 'nokia.svg', 'assus.svg', 'casio.svg', 'dell.svg', 'panasonic.svg', 'vaio.svg','acer.svg', 'nokia.svg', 'assus.svg', 'casio.svg', 'dell.svg', 'panasonic.svg', 'vaio.svg'].map((logo, index) => (
                                        <SwiperSlide key={index}>
                                            <a href="/" className="text-decoration-none">
                                                <img src={`assets/imgs/slider/logo/${logo}`} alt="Ecom" />
                                            </a>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-50">
                    <div className="row">
                        {categories.map((category, index) => (
                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12" key={index}>
                                <div className="card-grid-style-2 card-grid-style-2-small hover-up">
                                    <div className="image-box">
                                        <a href="/" className="text-decoration-none">
                                            <img src={`assets/imgs/page/homepage1/${category.image}`} alt={category.title} />
                                        </a>
                                    </div>
                                    <div className="info-right">
                                        <a className="color-brand-3 font-sm-bold text-decoration-none" href="/">
                                            <h6>{category.title}</h6>
                                        </a>
                                        <ul className="list-links-disc">
                                            {category.items.map((item, i) => (
                                                <li key={i}>
                                                    <a className="font-sm text-decoration-none" href="/">{item}</a>
                                                </li>
                                            ))}
                                        </ul>
                                        <a className="btn btn-gray-abs" href="/">View all</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const categories = [
    {
        title: 'Smart Phone',
        image: 'smartphone.png',
        items: ['Phone Accessories', 'Phone Cases', 'Postpaid Phones', 'Refurbished Phones'],
    },
    {
        title: 'Television',
        image: 'television.png',
        items: ['HD DVD Players', 'Projection Screens', 'Television Accessories', 'TV-DVD Combos'],
    },
    {
        title: 'Computers',
        image: 'computer.png',
        items: ['Computer Components', 'Computer Accessories', 'Desktops', 'Monitors'],
    },
    {
        title: 'Electronics',
        image: 'electric.png',
        items: ['Office Electronics', 'Portable Audio & Video', 'Washing Machine', 'Accessories & Supplies'],
    },
    {
        title: 'Laptop & Tablet',
        image: 'laptop.png',
        items: ['Office laptop', 'Gaming laptop', 'Laptop accessories', 'Tablet'],
    },
    {
        title: 'Smartwatches',
        image: 'smartwatches.png',
        items: ['Sport Watches', 'Chronograph Watches', 'Kids Watches', 'Luxury Watches'],
    },
    {
        title: 'Gaming',
        image: 'gaming.png',
        items: ['Game Controllers', 'Gaming Keyboards', 'PC Gaming Mice', 'PC Game Headsets'],
    },
    {
        title: 'Outdoor Camera',
        image: 'outdoor.png',
        items: ['Security & Surveillance', 'Surveillance DVR Kits', 'Surveillance NVR Kits', 'Smart Outdoor Lighting'],
    },
];
