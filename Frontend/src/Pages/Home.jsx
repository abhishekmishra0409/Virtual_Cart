import {Container, Row, Col, Button} from 'react-bootstrap';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Pagination, Autoplay} from 'swiper/modules';
import {FeaturedCategories} from "../Components/Homepage/FeaturedCategories.jsx";
import {TopSellingProduct} from "../Components/Homepage/TopSellingProduct.jsx";
import {LatestNews} from "../Components/Homepage/LatestNews.jsx";
import {TrendingThisWeek} from "../Components/Homepage/TrendingThisWeek.jsx";


export const Home = () => {
    return (<>
            <section className="section-box">
                <div className="banner-hero banner-1">
                    <Container>
                        <Row>
                            {/* Swiper Section */}
                            <Col lg={8}>
                                <div className="box-swiper">
                                    <Swiper
                                        className="swiper-group-1"
                                        spaceBetween={30}
                                        pagination={{clickable: true}}
                                        modules={[Pagination, Autoplay]}
                                        autoplay={{delay: 5000, disableOnInteraction: false}}
                                    >
                                        <SwiperSlide>
                                            <div
                                                className="banner-big bg-11"
                                                style={{backgroundImage: "url(/homePage/banner.png)"}}
                                            >
                                                <span className="font-sm text-uppercase">Hot Right Now</span>
                                                <h2 className="mt-10">Sale Up to 50% Off</h2>
                                                <h1>Mobile Devices</h1>
                                                <Row>
                                                    <Col lg={5} md={7} sm={12}>
                                                        <p className="font-sm color-brand-3">
                                                            Curabitur id lectus in felis hendrerit efficitur quis quis
                                                            lectus. Donec
                                                            sollicitudin elit eu ipsum maximus blandit. Curabitur
                                                            blandit
                                                            tempus
                                                            consectetur.
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <div className="mt-30">
                                                    <Button href="/" className="btn btn-brand-2 border-0">
                                                        Shop now
                                                    </Button>
                                                    <Button href="/" variant="link" className="btn btn-link">
                                                        Learn more
                                                    </Button>
                                                </div>
                                            </div>
                                        </SwiperSlide>

                                        <SwiperSlide>
                                            <div
                                                className="banner-big bg-11-2"
                                                style={{backgroundImage: "url(homePage/banner-hero-2.png)"}}
                                            >
                                                <span className="font-sm text-uppercase">Trending Now</span>
                                                <h2 className="mt-10">Big Sale 25%</h2>
                                                <h1>Laptop & PC</h1>
                                                <Row>
                                                    <Col lg={5} md={7} sm={12}>
                                                        <p className="font-sm color-brand-3">
                                                            Curabitur id lectus in felis hendrerit efficitur quis quis
                                                            lectus. Donec
                                                            sollicitudin elit eu ipsum maximus blandit. Curabitur
                                                            blandit
                                                            tempus
                                                            consectetur.
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <div className="mt-30">
                                                    <Button href="/" className="btn btn-brand-2 border-0">
                                                        Shop now
                                                    </Button>
                                                    <Button href="/" variant="link" className="btn btn-link">
                                                        Learn more
                                                    </Button>
                                                </div>
                                            </div>
                                        </SwiperSlide>

                                        <SwiperSlide>
                                            <div
                                                className="banner-big bg-11-3"
                                                style={{backgroundImage: "url(homePage/banner-hero-3.png)"}}
                                            >
                                                <span className="font-sm text-uppercase">Top Sale This Month</span>
                                                <h2 className="mt-10">Hot Collection</h2>
                                                <h1>Virtual glasses</h1>
                                                <Row>
                                                    <Col lg={5} md={7} sm={12}>
                                                        <p className="font-sm color-brand-3">
                                                            Curabitur id lectus in felis hendrerit efficitur quis quis
                                                            lectus. Donec
                                                            sollicitudin elit eu ipsum maximus blandit. Curabitur
                                                            blandit
                                                            tempus
                                                            consectetur.
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <div className="mt-30">
                                                    <Button href="/" className="btn btn-brand-2 border-0">
                                                        Shop now
                                                    </Button>
                                                    <Button href="/" variant="link" className="btn btn-link">
                                                        Learn more
                                                    </Button>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                            </Col>

                            {/* Side Banners Section */}
                            <Col lg={4}>
                                <Row>
                                    <Col lg={12} md={6} sm={12}>
                                        <div className="banner-small banner-small-1 bg-13">
                    <span className="color-danger text-uppercase font-sm-lh32">
                      10% <span className="color-brand-3">Sale Off</span>
                    </span>
                                            <h4 className="mb-10">Apple Watch Serial 7</h4>
                                            <p className="color-brand-3 font-desc">
                                                Don&apos;t miss the last
                                                <br className="d-none d-lg-block"/> opportunity.
                                            </p>
                                            <div className="mt-20">
                                                <Button href="/" className="btn btn-brand-3 btn-arrow-right border-0">
                                                    Shop now
                                                </Button>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col lg={12} md={6} sm={12}>
                                        <div className="banner-small banner-small-2 bg-14">
                    <span className="color-danger text-uppercase font-sm-lh32">
                      LATEST COLLECTION
                    </span>
                                            <h4 className="mb-10">Apple Devices &amp; Software</h4>
                                            <p className="color-brand-3 font-md">
                                                Don&apos;t miss the last
                                                <br className="d-none d-lg-block"/> opportunity.
                                            </p>
                                            <div className="mt-20">
                                                <Button href="/" className="btn btn-brand-2 btn-arrow-right border-0">
                                                    Shop now
                                                </Button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </section>
            <section className="section-box mt-10 mb-30">
                <div className="mx-4">
                    <ul className="list-col-5">
                        <li>
                            <div className="item-list">
                                <div className="icon-left"><img src="/assets/imgs/template/delivery.svg" alt="Ecom"/>
                                </div>
                                <div className="info-right">
                                    <h5 className="font-lg-bold color-gray-900">Free Delivery</h5>
                                    <p className="font-sm color-gray-500">From all orders over $10</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="item-list">
                                <div className="icon-left"><img src="/assets/imgs/template/support.svg" alt="Ecom"/>
                                </div>
                                <div className="info-right">
                                    <h5 className="font-lg-bold color-gray-900">Support 24/7</h5>
                                    <p className="font-sm color-gray-500">Shop with an expert</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="item-list">
                                <div className="icon-left"><img src="/assets/imgs/template/voucher.svg" alt="Ecom"/>
                                </div>
                                <div className="info-right">
                                    <h5 className="font-lg-bold color-gray-900">Gift voucher</h5>
                                    <p className="font-sm color-gray-500">Refer a friend</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="item-list">
                                <div className="icon-left"><img src="/assets/imgs/template/return.svg" alt="Ecom"/>
                                </div>
                                <div className="info-right">
                                    <h5 className="font-lg-bold color-gray-900">Return &amp; Refund</h5>
                                    <p className="font-sm color-gray-500">Free return over $200</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="item-list">
                                <div className="icon-left"><img src="/assets/imgs/template/secure.svg" alt="Ecom"/>
                                </div>
                                <div className="info-right">
                                    <h5 className="font-lg-bold color-gray-900">Secure payment</h5>
                                    <p className="font-sm color-gray-500">100% Protected</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
            <FeaturedCategories/>
            <section className="section-box mt-50">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-4 col-lg-12">
                            <div className="banner-2 bg-xbox"><span
                                className="color-danger text-uppercase">Flat 20% off</span>
                                <h3 className="font-30">Microsoft</h3>
                                <h4 className="font-59">Xbox</h4>
                                <h5 className="font-55 mb-15">Series S</h5><span
                                    className="font-16">From $3500.00</span>
                                <div className="mt-25"><a className="btn btn-brand-2 btn-arrow-right"
                                                          href="shop-fullwidth.html">Shop Now</a></div>
                            </div>
                        </div>
                        <div className="col-xl-8 col-lg-12">
                            <div className="image-gallery">
                                <div className="image-big">
                                    <div className="banner-img-left bg-controller">
                                        <h3 className="font-33 mb-10">Xbox Core Wireless Controller</h3>
                                        <p className="font-18">Aqua Shift Special Edition</p>
                                        <div className="mt-25"><a className="btn btn-info btn-arrow-right"
                                                                  href="shop-fullwidth.html">Shop Now</a></div>
                                    </div>
                                </div>
                                <div className="image-small">
                                    <div className="bg-metaverse">
                                        <h3 className="mb-10 font-32">Metaverse</h3>
                                        <p className="font-16">The Future of<br
                                            className="d-none d-lg-block"/> Creativity</p>
                                        <div className="mt-15"><a className="btn btn-link-brand-2 btn-arrow-brand-2"
                                                                  href="shop-fullwidth.html">learn more</a></div>
                                    </div>
                                </div>
                            </div>
                            <div className="image-gallery">
                                <div className="image-small">
                                    <div className="bg-electronic">
                                        <h3 className="font-32">Electronic</h3>
                                        <p className="font-16 color-brand-3">Hot devices, Latest trending</p>
                                    </div>
                                </div>
                                <div className="image-big">
                                    <div className="bg-phone">
                                        <h3 className="font-33 mb-15">Super discount for your first purchase</h3>
                                        <p className="font-18">Use discount code in checkout page.</p>
                                        <div className="mt-25"><a className="btn btn-brand-2 btn-arrow-right"
                                                                  href="shop-fullwidth.html">Shop Now</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={"section-box "} >
                <TopSellingProduct/>
            </section>
            <TrendingThisWeek/>
            <LatestNews/>
        </>
    )
}

