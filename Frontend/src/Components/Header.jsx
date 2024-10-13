import { Nav, Dropdown, ButtonGroup } from 'react-bootstrap';
import { FaHeart, FaShoppingCart, FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout ,fetchCategories} from '../features/User/UserSlice.js';
import { useEffect } from 'react';
// import { fetchCategories } from '../features/Category/CategorySlice';

export const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Fetch the user state from Redux store
    const { isAuthenticated } = useSelector((state) => state.auth);

    // Fetch categories from Redux store
    const { categories } = useSelector((state) => state.auth);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            dispatch({ type: 'auth/setAuthenticated', payload: true });
        } else {
            dispatch({ type: 'auth/setAuthenticated', payload: false });
        }

        // Fetch categories when component mounts
        dispatch(fetchCategories());
    }, [dispatch]);

    // Handle logout logic
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <header className="py-3">
            <div className="container-fluid py-1 border-bottom">
                <div className="row align-items-center">
                    {/* Logo Section */}
                    <div className="col-lg d-flex align-items-center">
                        <a className="navbar-brand d-flex align-items-center Title" href="/">
                            <img
                                src="/VirtulCart-logos_transparent.png"
                                alt="Logo"
                                style={{ width: '50px', height: '50px' }}
                            />
                            <p className="ms-2">VirtualCart</p>
                        </a>
                    </div>

                    {/* Search Section */}
                    <div className="col-lg-5">
                        <div className="input-group border border-radius-5">
                            <input
                                type="text"
                                className="form-control border-0 shadow-none"
                                placeholder="Search for items..."
                            />
                            <button className="btn btn-light border-0 shadow-none">
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                    </div>

                    <div className="col-lg-5 d-flex justify-content-end align-items-center flex-nowrap">
                        <span className="me-4 d-flex ">
                            <FaMapMarkerAlt className="custom-icon mx-2" /> Your Location
                        </span>
                        <Nav className="d-flex align-items-center">
                            <Nav.Link href="/wishlist" className="d-flex align-items-center mx-2 custom-nav-link">
                                <FaHeart className="me-1 custom-icon" /> Wishlist
                            </Nav.Link>
                            <Nav.Link href="/cart" className="d-flex align-items-center mx-2 custom-nav-link">
                                <FaShoppingCart className="me-1 custom-icon" /> Cart
                            </Nav.Link>
                            {/* Conditional rendering based on login status */}
                            {isAuthenticated ? (
                                <Dropdown>
                                    <Dropdown.Toggle className="border-0 bg-transparent d-flex align-items-center mx-2 custom-nav-link">
                                        <FaUser className="me-1 custom-icon" />
                                        <span className="icon-list icon-account">Account</span>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="sidebar-left dropdown-menu-light">
                                        <ul className="menu-texts menu-close">
                                            <li><a href="/accounts">My Account</a></li>
                                            {/*<li><a href="/accounts#">Order Tracking</a></li>*/}
                                            <li><a href="/accounts/orders">My Orders</a></li>
                                            <li><a href="/accounts/wishlist">My Wishlist</a></li>
                                            <li><a href="/accounts/settings">Settings</a></li>
                                            <li>
                                                <a className="cursor-pointer" onClick={handleLogout}>
                                                    Logout
                                                </a>
                                            </li>
                                        </ul>
                                    </Dropdown.Menu>
                                </Dropdown>
                            ) : (
                                <Dropdown>
                                    <Dropdown.Toggle className="border-0 bg-transparent d-flex align-items-center mx-2 custom-nav-link">
                                        <FaUser className="me-1 custom-icon" />
                                        <span className="icon-list icon-account">Account</span>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="sidebar-left dropdown-menu-light">
                                        <ul className="menu-texts menu-close">
                                            <li><a href="/login">Login</a></li>
                                            <li><a href="/register">Sign Up</a></li>
                                        </ul>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )}
                        </Nav>
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <div className="d-flex align-items-center py-3 px-5 bg-white shadow-sm">
                <Dropdown as={ButtonGroup} className="d-inline-block">
                    <Dropdown.Toggle variant="outline-secondary" id="dropdownCategory" className=" border-0">
                        <span className=" font-sm-bold color-white">Shop By Categories</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="sidebar-left dropdown-menu-light">
                        <ul className="menu-texts menu-close">
                            {/* Map through categories from Redux store */}
                            {categories && categories.map((category, index) => (
                                <li key={index} className={`has-children`}>
                                    <a href={`shop/category/${category._id}`} className="d-flex align-items-center">
                                        <span className="img-link d-flex p-2">
                                            <img src={`/assets/imgs/template/${category.title.toLowerCase().replace(' ', '-')}.svg`} alt={category.title} style={{ width: '20px', height: '20px' }} />
                                        </span>
                                        <span className="text-link">{category.title}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </Dropdown.Menu>
                </Dropdown>

                <nav>
                    <ul className="nav">
                        <li className="nav-item">
                            <a className="nav-link custom-nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link custom-nav-link" href="/shop">Shop</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link custom-nav-link" href="/blogs">Blog</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link custom-nav-link" href="/contact">Contact</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};
