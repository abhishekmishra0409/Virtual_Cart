import React, { useEffect, useState } from 'react';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { FiltersModal } from "../Components/Common/FiltersModal.jsx";
import { SideBar } from "../Components/ShopPage/SideBar.jsx";
import { ProductCard } from "../Components/Common/ProductCard.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByColor} from "../features/Product/ProductSlice.js";
import {useParams} from "react-router-dom";

export const ProductByColor = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { productsByColor, isLoading, isError } = useSelector((state) => state.products);
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(30);

    useEffect(() => {
        dispatch(fetchProductsByColor(id));
    }, [dispatch]);

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    if (isLoading) return (<div className="loader">
        <p>Loading...</p>
    </div>);
    if (isError) return <div>Error fetching products By Color</div>;

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productsByColor.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(productsByColor.length / productsPerPage);
    // console.log(productsByColor)
    return (
        <>
            <div className="section-box shop-template mt-30">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 order-first order-lg-last">
                            <div className="banner-ads-top mb-30">
                                <a href="/"><img src="/assets/imgs/page/shop/banner.png" alt="Ecom" /></a>
                            </div>
                            <div className="box-filters mt-0 pb-5 border-bottom">
                                <div className="row">
                                    <div className="col-xl-2 col-lg-3 mb-10 text-lg-start text-center">
                                        {/*<button*/}
                                        {/*    onClick={() => setShowFilters(true)}*/}
                                        {/*    className="btn btn-filter font-sm color-brand-3 font-medium"*/}
                                        {/*>*/}
                                        {/*    All Filters*/}
                                        {/*</button>*/}
                                    </div>
                                    <div className="col-xl-10 col-lg-9 mb-10 text-lg-end text-center d-flex justify-content-end align-items-center">
                                        <span className="font-sm color-gray-900 font-medium me-3">
                                            Showing {indexOfFirstProduct + 1}–{Math.min(indexOfLastProduct, productsByColor.length)} of {productsByColor.length} results
                                        </span>
                                        {/*<div className="d-inline-block dropdown dropdown-sort border-1-right">*/}
                                        {/*    <span className="font-sm color-gray-500 font-medium me-2">Sort by:</span>*/}
                                        {/*    <Dropdown as={ButtonGroup}>*/}
                                        {/*        <Dropdown.Toggle*/}
                                        {/*            className="btn font-sm color-gray-900 font-medium border-0 bg-transparent"*/}
                                        {/*            id="dropdownSort"*/}
                                        {/*        >*/}
                                        {/*            <span className="font-sm color-gray-900 font-medium me-2">Latest productsByColor</span>*/}
                                        {/*        </Dropdown.Toggle>*/}
                                        {/*        <Dropdown.Menu>*/}
                                        {/*            <Dropdown.Item href="#/action-1" active>Latest productsByColor</Dropdown.Item>*/}
                                        {/*            <Dropdown.Item href="#/action-2">Oldest productsByColor</Dropdown.Item>*/}
                                        {/*            <Dropdown.Item href="#/action-3">Top-rated productsByColor</Dropdown.Item>*/}
                                        {/*        </Dropdown.Menu>*/}
                                        {/*    </Dropdown>*/}
                                        {/*</div>*/}
                                        <div className="d-inline-block dropdown dropdown-sort border-1-right ms-3">
                                            <span className="font-sm color-gray-500 font-medium me-2">Show:</span>
                                            <Dropdown as={ButtonGroup}>
                                                <Dropdown.Toggle
                                                    className="btn font-sm color-gray-900 font-medium border-0 bg-transparent"
                                                    id="dropdownShow"
                                                >
                                                    <span className="font-sm color-gray-900 font-medium me-2">{productsPerPage} items</span>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => setProductsPerPage(30)} active={productsPerPage === 30}>30 items</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => setProductsPerPage(50)} active={productsPerPage === 50}>50 items</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-20">
                                {currentProducts.map((product, index) => (
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12" key={index}>
                                        <ProductCard product={product} /> {/* Pass the product data here */}
                                    </div>
                                ))}
                            </div>
                            <nav>
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                                        <button className="page-link page-prev" onClick={() => handlePageChange(currentPage - 1)}>
                                        </button>
                                    </li>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <li className={`page-item ${currentPage === i + 1 ? "active" : ""}`} key={i}>
                                            <button
                                                className={`bg-amber-0 w-8 h-9 rounded border text-blue-950 hover:bg-amber-500 ${currentPage === i + 1 ? "bg-amber-500" : ""}`}
                                                onClick={() => handlePageChange(i + 1)}
                                            >
                                                {i + 1}
                                            </button>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
                                        <button className="page-link page-next" onClick={() => handlePageChange(currentPage + 1)}>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-3 order-last order-lg-first">
                            <SideBar />
                        </div>
                    </div>
                </div>
            </div>
            <FiltersModal show={showFilters} handleClose={() => setShowFilters(false)} />
        </>
    );
};
