import React, { useEffect, useState } from 'react';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { BlogCard } from "../Components/Common/BlogCard.jsx";
import { BlogSideBar } from "../Components/BlogPage/BlogSidebar.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../features/blog/BlogSlice.js';

export const Blog = () => {
    const dispatch = useDispatch();
    const { blogs, isLoading } = useSelector((state) => state.blogs);

    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage, setBlogsPerPage] = useState(30);

    useEffect(() => {
        dispatch(getAllBlogs());
    }, [dispatch]);

    // Pagination logic
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const totalPages = Math.ceil(blogs.length / blogsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleBlogsPerPageChange = (newCount) => {
        setBlogsPerPage(newCount);
        setCurrentPage(1);
    };

    return (
        <>
            <div className="section-box shop-template mt-30">
                <div className="mx-4">
                    <div className="row">
                        <div className="col-lg-9 order-first order-lg-last">
                            <div className="box-filters mt-0 border-bottom">
                                <div className="row">
                                    <div className="col-xl-2 col-lg-3 mb-0 text-lg-start text-center">
                                        <h5 className="color-brand-3 text-uppercase">NEWS &amp; BLOGS</h5>
                                    </div>
                                    <div
                                        className="col-xl-10 col-lg-9 mb-10 text-lg-end d-flex justify-content-end align-items-center">
                                        <span className="font-sm color-gray-900 font-medium me-3">
                                            Showing {indexOfFirstBlog + 1}–{Math.min(indexOfLastBlog, blogs.length)} of {blogs.length} results
                                        </span>
                                        <div className="d-inline-block dropdown dropdown-sort border-1-right">
                                            <span className="font-sm color-gray-500 font-medium me-2">Sort by:</span>
                                            <Dropdown as={ButtonGroup}>
                                                <Dropdown.Toggle
                                                    className="btn font-sm color-gray-900 font-medium border-0 bg-transparent"
                                                    id="dropdownSort"
                                                >
                                                    <span className="font-sm color-gray-900 font-medium me-2">Latest blogs</span>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/action-1" active>Latest blogs</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2">Oldest blogs</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">Most popular blogs</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                        <div className="d-inline-block dropdown dropdown-sort border-1-right ms-3">
                                            <span className="font-sm color-gray-500 font-medium me-2">Show:</span>
                                            <Dropdown as={ButtonGroup}>
                                                <Dropdown.Toggle
                                                    className="btn font-sm color-gray-900 font-medium border-0 bg-transparent"
                                                    id="dropdownShow"
                                                >
                                                    <span
                                                        className="font-sm color-gray-900 font-medium me-2">{blogsPerPage} items</span>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => handleBlogsPerPageChange(30)}
                                                                   active={blogsPerPage === 30}>30 items</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleBlogsPerPageChange(50)}
                                                                   active={blogsPerPage === 50}>50 items</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-20">
                                {isLoading ? (
                                    <div className="loader">
                                    <p>Loading...</p>
                                    </div>

                                ) : currentBlogs.length > 0 ? (
                                    currentBlogs.map((blog) => (
                                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-4" key={blog._id}>
                                            <BlogCard blog={blog}/>
                                        </div>
                                    ))
                                ) : (
                                    <div>No blogs available.</div>
                                )}
                            </div>
                            <nav>
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                                        <button className="page-link page-prev"
                                                onClick={() => handlePageChange(currentPage - 1)}>
                                        </button>
                                    </li>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <li className={`page-item ${currentPage === i + 1 ? "active" : ""}`} key={i}>
                                            <button
                                                className={`bg-amber w-8 h-9 rounded border text-blue-950 hover:bg-amber-600 ${currentPage === i + 1 ? "bg-amber-600" : ""}`}
                                                onClick={() => handlePageChange(i + 1)}
                                            >
                                                {i + 1}
                                            </button>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
                                        <button className="page-link page-next"
                                                onClick={() => handlePageChange(currentPage + 1)}>

                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-3 order-last order-lg-first">
                            <BlogSideBar />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
